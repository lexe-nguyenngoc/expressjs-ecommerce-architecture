import { OK } from "@/core/success.response";
import keyTokenService from "@/services/keyToken.service";
import shopService from "@/services/shop.service";
import { generateRSAKeyPair, pickFields, signTokenPair } from "@/utils";
import { NextFunction, Request, Response } from "express";

class AuthController {
  signup = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    const newShop = await shopService.createShop(name, email, password);

    const { privateKey, publicKey } = generateRSAKeyPair();
    const tokenPayload = {
      id: newShop.id,
      email: newShop.email,
    };

    const [accessToken, refreshToken] = signTokenPair(
      { payload: tokenPayload, secret: privateKey },
      { payload: tokenPayload, secret: privateKey, expiresIn: "7 days" }
    );

    await keyTokenService.createKeyToken(newShop.id, publicKey, refreshToken);

    return new OK(
      {
        data: pickFields(newShop, ["id", "email", "name"]),
        tokens: { accessToken, refreshToken },
      },
      "Signup success"
    ).send(res);
  };
}

export default new AuthController();
