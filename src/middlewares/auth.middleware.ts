import { NextFunction, Request, Response } from "express";

import { Headers } from "@/constants";
import { ForbiddenError, UnauthorizedError } from "@/core/error.response";
import { asyncHandler, verifyToken } from "@/utils";
import { ApiKeyRequest, AuthenticationRequest } from "@/utils/types";

import apiKeyService from "@/services/apiKey.service";
import keyTokenService from "@/services/keyToken.service";
import shopService from "@/services/shop.service";

export const apiKey = asyncHandler(
  async (req: ApiKeyRequest & Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers[Headers.API_KEY];

    const forbiddenError = new ForbiddenError(
      "You do not have permission to access this resource"
    );
    if (!apiKey || Array.isArray(apiKey)) throw forbiddenError;

    const apiKeyDocument = await apiKeyService.findApiKeyByKey(apiKey);
    if (!apiKeyDocument) throw forbiddenError;

    req.apiKey = apiKeyDocument;
    next();
  }
);

export const authentication = asyncHandler(
  async (
    req: AuthenticationRequest & Request,
    res: Response,
    next: NextFunction
  ) => {
    /**
     * 1 - Check userId, accessToken headers
     * 2 - Find key token by userId to get publicKey to decode the access token
     * 3 - Verify access token
     * 4 - Check user Id has equal id in decoded token and find it to check if it exists in database.
     * 5 - Attach the keyToken and valid user to req for later reuse.
     */

    const userId = req.headers[Headers.CLIENT_ID];
    const accessToken = req.headers[Headers.AUTHORIZATION];
    if (
      !userId ||
      typeof userId !== "string" ||
      !accessToken ||
      !accessToken.startsWith("Bearer ")
    )
      throw new UnauthorizedError("Error: Invalid Request");

    const keyToken = await keyTokenService.findKeyTokenByUserId(userId);
    if (!keyToken || !keyToken.publicKey || !keyToken.refreshToken)
      throw new UnauthorizedError("Error: You are not logged in!");

    const decodedToken = verifyToken(
      accessToken.replace("Bearer ", ""),
      keyToken.publicKey
    );

    if (userId !== decodedToken.id)
      throw new UnauthorizedError("Error: The token is invalid");

    const user = await shopService.findShopByEmailId(
      decodedToken.email,
      decodedToken.id
    );

    if (!user) throw new UnauthorizedError("Error: The token is invalid");

    req.keyToken = keyToken;
    req.user = user;
    next();
  }
);
