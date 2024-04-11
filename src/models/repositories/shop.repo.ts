import { SelectFields } from "@/utils";
import ShopModel, { Shop } from "../shop.model";
import { FilterQuery } from "mongoose";

const defaultSelect: SelectFields<Shop> = {
  email: 1,
  password: 1,
  status: 1,
  roles: 1,
  name: 1,
};

export const createNewShop = async (payload: Partial<Shop>): Promise<Shop> => {
  return await ShopModel.create(payload);
};

export const findShopByFilter = (
  filter: FilterQuery<Shop> | undefined,
  select = defaultSelect
) => {
  return ShopModel.findOne(filter).select(select);
};

const shopRepo = { createNewShop, findShopByFilter };
export default shopRepo;
