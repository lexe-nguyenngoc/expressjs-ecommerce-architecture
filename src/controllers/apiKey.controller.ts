import { Request, Response } from "express";
import apiKeyService from "@/services/apiKey.service";
import { CREATED } from "@/core/success.response";

class ApiKeyController {
  createApiKey = async (req: Request, res: Response) => {
    const { key, status, permissions } = req.body;

    new CREATED(
      {
        data: await apiKeyService.createApiKey(key, status, permissions),
      },
      "Success to created api key"
    ).send(res);
  };
}

export default new ApiKeyController();
