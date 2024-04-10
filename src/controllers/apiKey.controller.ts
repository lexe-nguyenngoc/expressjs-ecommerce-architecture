import { Request, Response } from "express";
import apiKeyService from "../services/apiKey.service";

class ApiKeyController {
  createApiKey = async (req: Request, res: Response) => {
    const { key, status, permissions } = req.body;

    res.status(201).json({
      status: "Created",
      metadata: await apiKeyService.createApiKey(key, status, permissions),
    });
  };
}

export default new ApiKeyController();
