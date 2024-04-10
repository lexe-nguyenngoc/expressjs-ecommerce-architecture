import { ApiKeyPermission } from "../constants";
import ApiKeyModel from "../models/apiKey.model";

class ApiKeyService {
  createApiKey = async (
    key: string,
    status: boolean = true,
    permissions: ApiKeyPermission[] = [ApiKeyPermission.DEFAULT]
  ) => {
    const newApiKey = await ApiKeyModel.create({
      key,
      status,
      permissions,
    });
    return newApiKey;
  };
}

export default new ApiKeyService();
