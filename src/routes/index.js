const express = require("express");

const { apiKey, permission } = require("../middlewares/auth.middleware");

const router = express.Router();

// Check ApiKey
router.use(apiKey);
// Check permission
router.use(permission("0000"));

router.use("/v1/api", require("./access"));
router.use("/v1/api/product", require("./product"));

module.exports = router;
