import { Schema, model } from "mongoose";
import { ApiKeyPermission } from "@/constants";

interface ApiKey {
  key: string;
  status: boolean;
  permissions: ApiKeyPermission[];
}

const apiKeySchema = new Schema<ApiKey>({
  key: { type: String, required: true, unique: true },
  status: { type: Boolean, default: true },
  permissions: [
    { type: String, required: true, enum: Object.values(ApiKeyPermission) },
  ],
});

const ApiKeyModel = model<ApiKey>("ApiKey", apiKeySchema);
export default ApiKeyModel;
