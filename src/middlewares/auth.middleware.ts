import { NextFunction, Request, Response } from "express";
import { Headers } from "@/constants";
import apiKeyService from "@/services/apiKey.service";
import { ForbiddenError } from "@/core/error.response";

export const apiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers[Headers.API_KEY];

  const forbiddenError = new ForbiddenError(
    "You do not have permission to access this resource"
  );
  if (!apiKey || Array.isArray(apiKey)) return next(forbiddenError);

  const apiKeyDocument = await apiKeyService.findApiKeyByKey(apiKey);
  if (!apiKeyDocument) return next(forbiddenError);

  next();
};

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
