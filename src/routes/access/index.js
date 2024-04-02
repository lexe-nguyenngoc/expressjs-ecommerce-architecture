const express = require("express");

const accessController = require("../../controllers/access.controller");
const asyncHandler = require("../../helpers/asyncHandler");
const { authentication } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.post("/shop/login", asyncHandler(accessController.login));
router.post("/shop/signup", asyncHandler(accessController.signup));

// authentication
router.use(authentication);

router.delete("/shop/logout", asyncHandler(accessController.logout));
router.patch(
  "/shop/refreshToken",
  asyncHandler(accessController.refreshTokenHandler)
);

module.exports = router;
