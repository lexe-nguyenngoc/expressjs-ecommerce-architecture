const express = require("express");

const accessController = require("../../controllers/access.controller");
const asyncHandler = require("../../helpers/asyncHandler");
const { authentication } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.post("/shop/login", asyncHandler(accessController.login));
router.post("/shop/signup", asyncHandler(accessController.signup));

// authentication
router.use(authentication);

router.get("/shop/logout", asyncHandler(accessController.logout));

module.exports = router;
