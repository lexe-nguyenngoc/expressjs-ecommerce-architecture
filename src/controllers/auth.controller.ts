import { NextFunction, Request, Response } from "express";

import { OK } from "@/core/success.response";
import keyTokenService from "@/services/keyToken.service";
import shopService from "@/services/shop.service";
import {
  TokenPayload,
  generateRSAKeyPair,
  pickFields,
  signTokenPair,
} from "@/utils";

interface SignUpRequestBody {
  name: string;
  email: string;
  password: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

class AuthController {
  signup = async (
    req: Request<{}, {}, SignUpRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, password } = req.body;
    const newShop = await shopService.createShop(name, email, password);

    const tokens = await this.generateToken(newShop.id, newShop.email);

    return new OK(
      {
        data: pickFields(newShop, ["id", "email", "name"]),
        tokens,
      },
      "Signup success"
    ).send(res);
  };

  login = async (
    req: Request<{}, {}, LoginRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;
    const existingShop = await shopService.findShopWithEmailPassword(
      email,
      password
    );

    const tokens = await this.generateToken(
      existingShop.id,
      existingShop.email
    );

    return new OK(
      {
        data: pickFields(existingShop, ["id", "email", "name"]),
        tokens,
      },
      "Login success"
    ).send(res);
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    const keyTokenUpdated = await keyTokenService.disableKeyTokenById(
      req.keyToken._id
    );

    return new OK({ data: keyTokenUpdated }, "Logout success").send(res);
  };

  private generateToken = async (id: string, email: string) => {
    const { privateKey, publicKey } = generateRSAKeyPair();
    const tokenPayload: TokenPayload = {
      id,
      email,
    };

    const [accessToken, refreshToken] = signTokenPair(
      { payload: tokenPayload, secret: privateKey },
      { payload: tokenPayload, secret: privateKey, expiresIn: "7 days" }
    );

    await keyTokenService.createKeyToken(id, publicKey, refreshToken);

    return { accessToken, refreshToken };
  };
}

export default new AuthController();
