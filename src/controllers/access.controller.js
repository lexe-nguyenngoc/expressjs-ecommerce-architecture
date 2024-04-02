const AccessService = require("../services/access.service");

const { CREATED, SuccessResponse } = require("../core/success.response");

class AccessController {
  refreshTokenHandler = async (req, res, next) => {
    new SuccessResponse({
      message: "Get token success!",
      metadata: await AccessService.refreshTokenHandler({
        refreshToken: req.refreshToken,
        user: req.user,
        keyStore: req.keyStore,
      }),
    }).send(res);
  };

  logout = async (req, res, next) => {
    new SuccessResponse({
      message: "Logout success!",
      metadata: await AccessService.logout(req.keyStore),
    }).send(res);
  };

  login = async (req, res, next) => {
    new SuccessResponse({ metadata: await AccessService.login(req.body) }).send(
      res
    );
  };

  signup = async (req, res, next) => {
    new CREATED({
      message: "Registered OK",
      metadata: await AccessService.signup(req.body),
      options: {
        limit: 10,
      },
    }).send(res);
  };
}

module.exports = new AccessController();
