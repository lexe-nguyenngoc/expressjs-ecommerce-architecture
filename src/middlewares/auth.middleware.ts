import { NextFunction, Request, Response } from "express";
import { Headers, StatusCode } from "@/constants";
import apiKeyService from "@/services/apiKey.service";

export const apiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers[Headers.API_KEY];
  if (!apiKey || Array.isArray(apiKey)) {
    res.status(StatusCode.FORBIDDEN).json({
      message: "You do not have permission to access this resource",
    });
    return;
  }

  const apiKeyDocument = await apiKeyService.findApiKeyByKey(apiKey);
  if (!apiKeyDocument) {
    res.status(StatusCode.FORBIDDEN).json({
      message: "You do not have permission to access this resource",
    });
    return;
  }

  next();
};
