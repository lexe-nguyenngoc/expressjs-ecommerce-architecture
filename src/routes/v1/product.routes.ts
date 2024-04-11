import express from "express";

import { asyncHandler } from "@/utils";
import productController from "@/controllers/product.controller";
import { authentication } from "@/middlewares";

const productRouter = express.Router();

productRouter.use(authentication);
productRouter.route("/").post(asyncHandler(productController.createProduct));

export default productRouter;
