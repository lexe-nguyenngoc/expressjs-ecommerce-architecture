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
    publicKey: { type: String },
    refreshTokensUsed: { type: [String], default: [] },
    refreshToken: { type: String },
  },
  { timestamps: true }
);
const KeyTokenModel = model<KeyToken>("KeyToken", keyTokenSchema);
export default KeyTokenModel;
