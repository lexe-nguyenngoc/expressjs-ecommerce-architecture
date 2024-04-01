const JWT = require("jsonwebtoken");

const createTokenPair = async (payload, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7 days",
    });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {}
};

const verifyJWT = async (token, secret) => {
  return await JWT.verify(token, secret);
};

module.exports = {
  createTokenPair,
  verifyJWT,
};
