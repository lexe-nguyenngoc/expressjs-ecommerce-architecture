const express = require("express");

const productController = require("../../controllers/product.controller");
const asyncHandler = require("../../helpers/asyncHandler");
const { authentication } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get(
  "/search/:keySearch",
  asyncHandler(productController.getListSearchProduct)
);

router.get("", asyncHandler(productController.findAllProducts));
router.get("/:id", asyncHandler(productController.findProduct));

router.use(authentication);

router.post("", asyncHandler(productController.createProduct));
router.patch(
  "/publish/:id",
  asyncHandler(productController.publishProductByShop)
);
router.patch(
  "/unpublish/:id",
  asyncHandler(productController.unPublishProductByShop)
);
router.get("/drafts/all", asyncHandler(productController.getAllDraftsForShop));
router.get(
  "/publish/all",
  asyncHandler(productController.getAllPublishForShop)
);

module.exports = router;
