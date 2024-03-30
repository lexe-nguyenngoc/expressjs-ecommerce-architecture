const express = require("express");

const accessController = require("../../controllers/access.controller");
const asyncHandler = require("../../middlewares/asyncHandler.middleware");

const router = express.Router();

// signup
router.post("/shop/signup", asyncHandler(accessController.signup));
module.exports = router;
