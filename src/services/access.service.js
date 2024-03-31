const bcrypt = require("bcrypt");
const crypto = require("crypto");

const shopModel = require("../models/shop.model");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../utils/auth.util");
const { pickFields } = require("../utils");
const { RoleShop } = require("../constants");
const { BadRequestError } = require("../core/error.response");

class AccessService {
  static signup = async ({ name, email, password }) => {
    // Check email exists?
    const holderShop = await shopModel.findOne({ email }).lean();
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

    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });
    // Save publicKey to db
    const publicKeyString = await KeyTokenService.createToken({
      userId: newShop._id,
      publicKey,
    });

    if (!publicKeyString) {
      throw new BadRequestError("Error: publicKeyString error!");
    }

    // create token pair (accessToken and refreshToken)
    const tokens = await createTokenPair(
      { userId: newShop._id, email },
      publicKey,
      privateKey
    );

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
