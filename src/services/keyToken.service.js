const { Types } = require("mongoose");
const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
  static createToken = async ({ userId, publicKey, refreshToken }) => {
    try {
      const filter = { user: userId };
      const update = {
        publicKey,
        refreshTokensUsed: [],
        refreshToken,
      };
      const options = { upsert: true, new: true };

      const tokens = await keyTokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );

      return tokens?.publicKey || null;
    } catch (error) {
      return error;
    }
  };

  static findByUserId = async (userId) => {
    return await keyTokenModel.findOne({ user: userId }).lean();
  };

  static removeKeyById = async (_id) => {
    return await keyTokenModel.deleteOne({ _id });
  };
}

module.exports = KeyTokenService;
