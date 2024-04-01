const JWT = require("jsonwebtoken");

const { AuthFailureError, NotFoundError } = require("../core/error.response");
const asyncHandler = require("../helpers/asyncHandler");
const { findById } = require("../services/apiKey.service");
const KeyTokenService = require("../services/keyToken.service");
const { verifyToken } = require("../utils/auth.util");

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
};

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();

    if (!key) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }

    // Check objKey
    const objKey = await findById(key);
    if (!objKey) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }

    req.objKey = objKey;
    next();
  } catch (error) {
    console.log(error);
  }
};

const permission = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: "Permission Denied!",
      });
    }

    console.log("Permissions:: ", req.objKey.permissions);
    const validPermission = req.objKey.permissions.includes(permission);
    if (!validPermission) {
      return res.status(403).json({
        message: "Permission Denied!",
      });
    }

    return next();
  };
};

const authentication = asyncHandler(async (req, res, next) => {
  /*
  1- Check userId missing ?
  2- Get accessToken
  3- Verify token
  4- Check user in dbs
  5- Check keyStore with this userId
  6- Ok => return next
  */

  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new AuthFailureError("Invalid Request");

  const keyStore = await KeyTokenService.findByUserId(userId);
  if (!keyStore) throw new NotFoundError("Not found keyStore");

  const accessToken = req.headers[HEADER.AUTHORIZATION];

  if (!accessToken?.startsWith("Bearer"))
    throw new AuthFailureError("Invalid Request");

  const decodeUser = await JWT.verify(
    accessToken.replace("Bearer ", ""),
    keyStore.publicKey
  );
  if (userId !== decodeUser.userId)
    throw new AuthFailureError("Invalid UserId");

  req.keyStore = keyStore;
  return next();
});

module.exports = { apiKey, permission, authentication };
