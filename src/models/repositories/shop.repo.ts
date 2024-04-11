import ShopModel, { Shop } from "../shop.model";

export const findShopByEmail = async (
  email: string,
  select = { email: 1, password: 1, status: 1, roles: 1, name: 1 }
) => {
  return await ShopModel.findOne({ email }).select(select).lean();
};

export const createNewShop = async (payload: Partial<Shop>): Promise<Shop> => {
  return await ShopModel.create(payload);
};

const shopRepo = { findShopByEmail, createNewShop };
export default shopRepo;
