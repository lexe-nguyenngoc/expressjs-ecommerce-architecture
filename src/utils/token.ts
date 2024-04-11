import JWT from "jsonwebtoken";

export interface TokenPayload {
  id: string;
  email: string;
}

export const signToken = (
  payload: TokenPayload,
  secret: string,
  expiresIn: string = "2 days"
): string => {
  const token = JWT.sign(payload, secret, {
    algorithm: "RS256",
    expiresIn,
  });

  return token;
};

export const signTokenPair = (
  ...dataKeys: {
    payload: TokenPayload;
    secret: string;
    expiresIn?: string;
  }[]
): string[] => {
  const tokens = dataKeys.map(({ payload, secret, expiresIn }) =>
    signToken(payload, secret, expiresIn)
  );

  return tokens;
};

export const verifyToken = (token: string, secret: string) =>
  JWT.verify(token, secret) as TokenPayload;
