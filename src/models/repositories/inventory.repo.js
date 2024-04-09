const inventoryModel = require("../inventory.model");

const insertInventory = async ({
  productId,
  shopId,
  stock,
  location = "unknown",
}) => {
  return await inventoryModel.create({
    product_id: productId,
    shop_id: shopId,
    location,
    stock,
  });
};

module.exports = { insertInventory };
