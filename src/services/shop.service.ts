import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "@/core/error.response";
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

  findShopWithEmailPassword = async (email: string, password: string) => {
    const existingShop = await findShopByEmail(email);
    if (!existingShop)
      throw new NotFoundError(
        `Error: Could not find any users with email: ${email}`
      );

    if (!existingShop.comparePassword(password))
      throw new UnauthorizedError("Error: Email or password is incorrect");

    return existingShop;
  };
}

export default new ShopService();
