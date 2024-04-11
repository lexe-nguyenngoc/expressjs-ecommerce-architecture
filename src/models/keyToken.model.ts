import { Document, Schema, Types, model } from "mongoose";
import { Shop, DOCUMENT_NAME as userRef } from "./shop.model";

export interface KeyToken extends Document {
  user: Types.ObjectId | Shop;
  publicKey: string;
  refreshTokensUsed: string[];
  refreshToken: string;
}

const keyTokenSchema = new Schema<KeyToken>(
  {
    user: { type: Schema.Types.ObjectId, ref: userRef, required: true },
    publicKey: { type: String, required: true },
    refreshTokensUsed: { type: [String], default: [] },
    refreshToken: { type: String, required: true },
  },
  { timestamps: true }
);
const KeyTokenModel = model("KeyToken", keyTokenSchema);
export default KeyTokenModel;
