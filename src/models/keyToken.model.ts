import { Schema, Types, model } from "mongoose";
import { IUser, DOCUMENT_NAME as userRef } from "./user.model";

export interface IKeyToken {
  user: Types.ObjectId | IUser;
  publicKey: string;
  refreshTokensUsed: string[];
  refreshToken: string;

  createdAt: NativeDate;
  updatedAt: NativeDate;
}

const keyTokenSchema = new Schema<IKeyToken>(
  {
    user: { type: Schema.Types.ObjectId, ref: userRef, required: true },
    publicKey: { type: String },
    refreshTokensUsed: { type: [String], default: [] },
    refreshToken: { type: String }
  },
  { timestamps: true, collection: "key_tokens" }
);
const KeyTokenModel = model<IKeyToken>("KeyToken", keyTokenSchema);
export default KeyTokenModel;
