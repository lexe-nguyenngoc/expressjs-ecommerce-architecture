import ShopModel, { Shop } from "../shop.model";

export const createNewShop = async (payload: Partial<Shop>): Promise<Shop> => {
  return await ShopModel.create(payload);
};

export const findShopByEmail = async (
  email: string,
  select: Partial<{ [key in keyof Shop]: 1 | -1 }> = {
    email: 1,
    password: 1,
    status: 1,
    roles: 1,
    name: 1,
  }
) => {
  return await ShopModel.findOne({ email }).select(select);
};

const shopRepo = { findShopByEmail, createNewShop };
export default shopRepo;
