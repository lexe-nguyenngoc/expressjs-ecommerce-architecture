import JWT from "jsonwebtoken";

export const signToken = (
  payload: any,
  secret: string,
  expiresIn: string = "2 days"
): string => {
  const token = JWT.sign(payload, secret, {
    // algorithm: "RS256",
    expiresIn,
  });

  return token;
};

export const signTokenPair = (
  ...dataKeys: {
    payload: any;
    secret: string;
    expiresIn?: string;
  }[]
): string[] => {
  const tokens = dataKeys.map(({ payload, secret, expiresIn }) =>
    signToken(payload, secret, expiresIn)
  );

  return tokens;
};
