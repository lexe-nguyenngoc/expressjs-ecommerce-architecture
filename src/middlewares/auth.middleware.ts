import { NextFunction, Request, Response } from "express";

import { Headers } from "@/constants";
import { ForbiddenError, UnauthorizedError } from "@/core/error.response";
import { TokenPayload, asyncHandler, verifyToken } from "@/utils";

import apiKeyService from "@/services/apiKey.service";
import keyTokenService from "@/services/keyToken.service";
import shopService from "@/services/shop.service";

export const apiKey = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers[Headers.CLIENT_ID];
    if (!userId || typeof userId !== "string")
      throw new UnauthorizedError("Error: Forbidden Request!");

    const keyToken = await keyTokenService.findKeyTokenByUserId(userId);
    if (!keyToken || !keyToken.publicKey || !keyToken.refreshToken)
      throw new UnauthorizedError("Error: Forbidden Request!");

    const refreshToken = req.headers[Headers.REFRESH_TOKEN];
    const accessToken = req.headers[Headers.AUTHORIZATION];

    if (
      refreshToken &&
      typeof refreshToken === "string" &&
      keyToken.refreshToken !== refreshToken &&
      keyToken.refreshTokensUsed.includes(refreshToken)
    )
      throw new UnauthorizedError("Error: Forbidden Request!");

    const token = refreshToken ?? accessToken;

    if (!token || typeof token !== "string" || !token.startsWith("Bearer "))
      throw new UnauthorizedError("Error: Forbidden Request!");
    let decodedPayload: TokenPayload;
    try {
      decodedPayload = verifyToken(
        token.replace("Bearer ", ""),
        keyToken.publicKey
      );
    } catch (error) {
      throw new UnauthorizedError("Error: Forbidden Request!");
    }

    if (userId !== decodedPayload.id)
      throw new UnauthorizedError("Error: The token is invalid");

    const user = await shopService.findShopByEmailId(
      decodedPayload.email,
      decodedPayload.id
    );
    if (!user) throw new UnauthorizedError("Error: The token is invalid");

    req.keyToken = keyToken;
    req.user = user;

    next();
  }
);
