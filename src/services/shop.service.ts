import bcrypt from "bcrypt";

import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "@/core/error.response";
import {
  createNewShop,
  findShopByFilter,
} from "@/models/repositories/shop.repo";

class ShopService {
  createShop = async (name: string, email: string, password: string) => {
    const existingShop = await findShopByFilter({ email }).lean();
    if (existingShop) {
      throw new BadRequestError("Error: Shop already exists!");
    }

    const newShop = await createNewShop({
      name,
      email,
      password,
    });

    return newShop;
  };

  findShopWithEmailPassword = async (email: string, password: string) => {
    const existingShop = await findShopByFilter({ email }).lean();
    if (!existingShop)
      throw new NotFoundError(
        `Error: Could not find any users with email: ${email}`
      );

    if (!bcrypt.compareSync(password, existingShop.password))
      throw new UnauthorizedError("Error: Email or password is incorrect");

    return existingShop;
  };

  findShopByEmailId = async (email: string, _id: string) => {
    const shopFound = await findShopByFilter({ _id, email }).lean();
    return shopFound;
  };
}

export default new ShopService();
