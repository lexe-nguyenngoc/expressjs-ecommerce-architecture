import KeyTokenModel from "@/models/keyToken.model";
import { Types } from "mongoose";

class KeyTokenService {
  createKeyToken = async (
    userId: string | Types.ObjectId,
    publicKey: string,
    refreshToken: string
  ) => {
    const existingKeyToken = await KeyTokenModel.findOne({ user: userId });
    if (existingKeyToken) {
      existingKeyToken.refreshTokensUsed.push(existingKeyToken.refreshToken);
      existingKeyToken.publicKey = publicKey;
      existingKeyToken.refreshToken = refreshToken;

      await existingKeyToken.save();
      return existingKeyToken;
    }

    const newKeyToken = await KeyTokenModel.create({
      user: userId,
      publicKey,
      refreshToken,
    });
    return newKeyToken;
  };
}

export default new KeyTokenService();
