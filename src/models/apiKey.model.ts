import { Schema, model } from "mongoose";

import { ApiKeyPermission } from "@/constants";

export interface IApiKey {
  key: string;
  status: boolean;
  permissions: ApiKeyPermission[];

  createdAt: NativeDate;
  updatedAt: NativeDate;
}

const apiKeySchema = new Schema<IApiKey>(
  {
    key: { type: String, required: true, unique: true },
    status: { type: Boolean, default: true },
    permissions: [
      { type: String, required: true, enum: Object.values(ApiKeyPermission) }
    ]
  },
  { timestamps: true, collection: "api_keys" }
);

const ApiKeyModel = model<IApiKey>("ApiKey", apiKeySchema);
export default ApiKeyModel;
