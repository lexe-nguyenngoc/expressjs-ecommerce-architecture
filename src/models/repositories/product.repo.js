const { getSelectData, unGetSelectData } = require("../../utils");
const {
  electronic,
  clothing,
  furniture,
  product,
} = require("../product.model");

const findAllProducts = async ({ limit, sort, page, filter, select }) => {
  const skip = (page - 1) * limit;
  const sortBy = { _id: sort === "ctime" ? -1 : 1 };
  const products = await product
    .find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(getSelectData(select))
    .lean();

  return products;
};

const findProduct = async ({ product_id, unselect }) => {
  return await product.findById(product_id).select(unGetSelectData(unselect));
};

const queryProduct = async ({ query, limit, skip }) => {
  return await product
    .find(query)
    .populate("product_shop", "name email -_id")
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();
};

const searchProductsByUser = async ({ keySearch }) => {
  const regexSearch = new RegExp(keySearch);
  const result = await product
    .find(
      { $text: { $search: regexSearch }, isDraft: false, isPublish: true },
      { score: { $meta: "textScore" } }
    )
    .sort({ score: { $meta: "textScore" } })
    .lean();

  return result;
};

const publishProductByShop = async ({ product_shop, product_id }) => {
  const foundShop = await product.findOne({
    product_shop,
    _id: product_id,
  });

  if (!foundShop) return null;

  foundShop.isDraft = false;
  foundShop.isPublish = true;
  await foundShop.save();

  return foundShop;
};

const unpublishProductByShop = async ({ product_shop, product_id }) => {
  const foundShop = await product.findOne({
    product_shop,
    _id: product_id,
  });

  if (!foundShop) return null;

  foundShop.isDraft = true;
  foundShop.isPublish = false;
  await foundShop.save();

  return foundShop;
};

module.exports = {
  queryProduct,
  publishProductByShop,
  unpublishProductByShop,
  searchProductsByUser,
  findAllProducts,
  findProduct,
};
