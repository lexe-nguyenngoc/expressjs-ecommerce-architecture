import { BadRequestError } from "@/core/error.response";
import KeyTokenModel from "@/models/keyToken.model";
import { createPrivateKey } from "crypto";
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

  disableKeyTokenById = async (keyTokenId: string) => {
    const keyTokenFound = await KeyTokenModel.findById(keyTokenId);
    if (!keyTokenFound) throw new BadRequestError("Error: Token is invalid!");

    keyTokenFound.refreshTokensUsed.push(keyTokenFound.refreshToken);
    keyTokenFound.publicKey = "";
    keyTokenFound.refreshToken = "";
    await keyTokenFound.save();

    return createPrivateKey;
  };

  findKeyTokenByUserId = async (userId: string) => {
    return await KeyTokenModel.findOne({ user: userId }).lean();
  };
}

export default new KeyTokenService();
