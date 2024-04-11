import { OK } from "@/core/success.response";
import { ProductStatus } from "@/models/product.model";
import ProductFactory from "@/services/product.service";
import { NextFunction, Request, Response } from "express";

class ProductController {
  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const newProduct = await ProductFactory.createProduct({
      ...req.body,
      user: req.user._id,
      status: ProductStatus.DRAFT,
    });
    new OK({ data: newProduct }, "Create Product success!").send(res);
  };
}

export default new ProductController();
