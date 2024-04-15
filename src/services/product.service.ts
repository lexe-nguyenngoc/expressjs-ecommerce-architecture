import { Types } from "mongoose";

import { BadRequestError } from "@/core/error.response";

import ProductClothingModel from "@/models/product.clothing.model";
import ProductElectronicsModel from "@/models/product.electronics.model";
import ProductFurnitureModel from "@/models/product.furniture.model";
import ProductModel, {
  ProductDocument,
  ProductStatus,
  ProductTypes
} from "@/models/product.model";
import { IUser } from "@/models/user.model";

class Product {
  name: string;
  thumb: string;
  description: string;
  slug: string;
  quantity: number;
  type: ProductTypes;
  user: Types.ObjectId | IUser;
  attributes: any;
  rating_average: number;
  variations: any;
  status: ProductStatus;

  constructor({
    name,
    thumb,
    description,
    slug,
    quantity,
    type,
    user,
    attributes,
    rating_average,
    variations,
    status
  }: ProductDocument) {
    this.name = name;
    this.thumb = thumb;
    this.description = description;
    this.slug = slug;
    this.quantity = quantity;
    this.type = type;
    this.user = user;
    this.attributes = { ...attributes, user };
    this.rating_average = rating_average;
    this.variations = variations;
    this.status = status;
  }

  async createProduct(_id: string): Promise<ProductDocument> {
    const newProduct = await ProductModel.create({ ...this, _id });
    return newProduct;
  }
}

class Clothing extends Product {
  async createProduct() {
    const newClothing = await ProductClothingModel.create(this.attributes);

    const newProduct = await super.createProduct(newClothing._id.toString());
    return newProduct;
  }
}

class Electronics extends Product {
  async createProduct() {
    const newElectronics = await ProductElectronicsModel.create(
      this.attributes
    );

    const newProduct = await super.createProduct(newElectronics._id.toString());
    return newProduct;
  }
}

class Furniture extends Product {
  async createProduct() {
    const newFurniture = await ProductFurnitureModel.create(this.attributes);

    const newProduct = await super.createProduct(newFurniture._id.toString());
    return newProduct;
  }
}

const CLASSES_REGISTERED = {
  [ProductTypes.CLOTHING]: Clothing,
  [ProductTypes.ELECTRONICS]: Electronics,
  [ProductTypes.FURNITURE]: Furniture
};

class ProductFactory {
  static async createProduct(payload: ProductDocument) {
    const ProductClass = CLASSES_REGISTERED[payload.type];
    if (!ProductClass)
      throw new BadRequestError("Error: Type of product is invalid!");

    return await new ProductClass(payload).createProduct();
  }
}

export default ProductFactory;
