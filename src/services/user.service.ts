import bcrypt from "bcrypt";

import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "@/core/error.response";
import {
  createNewUser,
  findUserByFilter,
} from "@/models/repositories/user.repo";

class UserService {
  createUser = async (name: string, email: string, password: string) => {
    const existingUser = await findUserByFilter({ email }).lean();
    if (existingUser) {
      throw new BadRequestError("Error: User already exists!");
    }

    const newUser = await createNewUser({
      name,
      email,
      password,
    });

    return newUser;
  };

  findUserByEmailPassword = async (email: string, password: string) => {
    const existingUser = await findUserByFilter({ email }).lean();
    if (!existingUser)
      throw new NotFoundError(
        `Error: Could not find any users with email: ${email}`
      );

    if (!bcrypt.compareSync(password, existingUser.password))
      throw new UnauthorizedError("Error: Email or password is incorrect");

    return existingUser;
  };

  findUserByEmailId = async (email: string, _id: string) => {
    const existingUser = await findUserByFilter({ _id, email }).lean();
    return existingUser;
  };
}

export default new UserService();
