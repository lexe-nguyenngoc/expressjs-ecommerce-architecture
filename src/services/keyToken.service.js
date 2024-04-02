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
    return await keyTokenModel.findOne({ user: userId });
  };

  static removeKeyById = async (_id) => {
    return await keyTokenModel.deleteOne({ _id }).lean();
  };

  static findByRefreshTokensUsed = async (refreshToken) => {
    return await keyTokenModel.findOne({ refreshTokensUsed: refreshToken });
  };

  static findByRefreshToken = async (refreshToken) => {
    return await keyTokenModel.findOne({ refreshToken });
  };

  static deleteKeyByUserId = async (userId) => {
    return await keyTokenModel.findOneAndDelete({ user: userId });
  };
}

module.exports = KeyTokenService;
