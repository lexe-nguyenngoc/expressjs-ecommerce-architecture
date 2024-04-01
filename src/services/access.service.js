const bcrypt = require("bcrypt");

const shopModel = require("../models/shop.model");
const KeyTokenService = require("./keyToken.service");
const { findByEmail } = require("./shop.service");

const { BadRequestError, AuthFailureError } = require("../core/error.response");
const { RoleShop } = require("../constants");

const { createTokenPair } = require("../utils/auth.util");
const { pickFields } = require("../utils");
const { generateKeyPair } = require("../utils/generateKeyPair.util");

class AccessService {
  static logout = async (keyStore) => {
    console.log({ keyStore });
    const delKey = await KeyTokenService.removeKeyById(keyStore._id);
    console.log({ delKey });

    return delKey;
  };

  static login = async ({ email, password, refreshToken }) => {
    const foundShop = await findByEmail(email);
    if (!foundShop) throw new BadRequestError("Shop does not registered");

    const match = bcrypt.compare(password, foundShop.password);
    if (!match) throw new AuthFailureError("Authentication error");

    const { privateKey, publicKey } = generateKeyPair();
    const { _id: userId } = foundShop;
    const tokens = await createTokenPair(
      { userId, email },
      publicKey,
      privateKey
    );

    await KeyTokenService.createToken({
      userId,
      publicKey,
      refreshToken: tokens.refreshToken,
    });

    console.log(foundShop);

    return {
      data: pickFields({
        fields: ["_id", "email", "name"],
        object: foundShop,
      }),
      tokens,
    };
  };

  static signup = async ({ name, email, password }) => {
    // Check email exists?
    const holderShop = await findByEmail({ email }).lean();
    if (holderShop) {
      throw new BadRequestError("Error: Shop already registered!");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [RoleShop.SHOP],
    });
    if (!newShop) {
      throw new BadRequestError();
    }

    const { privateKey, publicKey } = generateKeyPair();
    const { _id: userId } = newShop;
    const tokens = await createTokenPair(
      { userId, email },
      publicKey,
      privateKey
    );

    // Save publicKey to db
    const publicKeyString = await KeyTokenService.createToken({
      userId,
      publicKey,
      refreshToken: tokens.refreshToken,
    });

    if (!publicKeyString) {
      throw new BadRequestError("Error: publicKeyString error!");
    }

    return {
      data: pickFields({
        fields: ["_id", "email", "name"],
        object: newShop,
      }),
      tokens,
    };
  };
}

module.exports = AccessService;
