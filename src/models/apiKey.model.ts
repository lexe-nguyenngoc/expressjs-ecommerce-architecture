import { Document, Schema, model } from "mongoose";

import { ApiKeyPermission } from "@/constants";

export interface ApiKey extends Document {
  key: string;
  status: boolean;
  permissions: ApiKeyPermission[];
}

const apiKeySchema = new Schema<ApiKey>(
  {
    key: { type: String, required: true, unique: true },
    status: { type: Boolean, default: true },
    permissions: [
      { type: String, required: true, enum: Object.values(ApiKeyPermission) },
    ],
  },
  { timestamps: true, collection: "api_keys" }
);

const ApiKeyModel = model<ApiKey>("ApiKey", apiKeySchema);
export default ApiKeyModel;
