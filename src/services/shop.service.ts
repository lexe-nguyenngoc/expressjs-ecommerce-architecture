import { BadRequestError } from "@/core/error.response";
import {
  createNewShop,
  findShopByEmail,
} from "@/models/repositories/shop.repo";

class ShopService {
  createShop = async (name: string, email: string, password: string) => {
    const existingShop = await findShopByEmail(email);
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
}

export default new ShopService();
