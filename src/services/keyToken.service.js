const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
  static createToken = async ({ userId, publicKey }) => {
    try {
      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey,
      });

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
}

module.exports = KeyTokenService;
