const { BadRequestError } = require("../core/error.response");
const {
  clothing,
  electronic,
  product,
  furniture,
} = require("../models/product.model");
const {
  publishProductByShop,
  queryProduct,
  unPublishProductByShop,
  searchProductsByUser,
} = require("../models/repositories/product.repo");

// Define Factory class to create product
class ProductFactory {
  static productRegistry = {};

  static registerProductType(type, classRef) {
    ProductFactory.productRegistry[type] = classRef;
  }

  static async createProduct(type, payload) {
    const productClass = ProductFactory.productRegistry[type];

    if (!productClass)
      throw new BadRequestError(`Invalid Product Types ${type}`);

    return await new productClass(payload).createProduct();
  }

  static async publishProductByShop({ product_shop, product_id }) {
    return await publishProductByShop({ product_shop, product_id });
  }

  static async unpublishProductByShop({ product_shop, product_id }) {
    return await unpublishProductByShop({ product_shop, product_id });
  }

  static async findAllDraftsForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isDraft: true };
    return await queryProduct({ query, limit, skip });
  }

  static async findAllPublishForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isPublish: true };
    return await queryProduct({ query, limit, skip });
  }

  static async searchProducts({ keySearch }) {
    return await searchProductsByUser({ keySearch });
  }
}

// Define base product class
class Product {
  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_shop,
    product_attributes,
  }) {
    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_shop = product_shop;
    this.product_attributes = product_attributes;
  }

  // Create new product
  async createProduct(_id) {
    return await product.create({ ...this, _id });
  }
}

class Clothing extends Product {
  async createProduct() {
    const newClothing = await clothing.create(this.product_attributes);
    if (!newClothing) throw new BadRequestError("Create new Clothing error");

    const newProduct = await super.createProduct(newClothing._id);
    if (!newProduct) throw new BadRequestError("Create new Product error");

    return newProduct;
  }
}

class Electronics extends Product {
  async createProduct() {
    const newElectronic = await electronic.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newElectronic)
      throw new BadRequestError("Create new Electronics error");

    const newProduct = await super.createProduct(newElectronic._id);
    if (!newProduct) throw new BadRequestError("Create new Product error");

    return newProduct;
  }
}

class Furniture extends Product {
  async createProduct() {
    const newFurniture = await furniture.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newFurniture) throw new BadRequestError("Create new Furniture error");

    const newProduct = await super.createProduct(newFurniture._id);
    if (!newProduct) throw new BadRequestError("Create new Product error");

    return newProduct;
  }
}

// Register product types
ProductFactory.registerProductType("Electronics", Electronics);
ProductFactory.registerProductType("Clothing", Clothing);
ProductFactory.registerProductType("Furniture", Furniture);

module.exports = ProductFactory;
