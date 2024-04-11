import { FilterQuery } from "mongoose";

import { SelectFields } from "@/@types/generic";
import UserModel, { User } from "@/models/user.model";

const defaultSelect: SelectFields<User> = {
  email: 1,
  password: 1,
  status: 1,
  roles: 1,
  name: 1,
};

export const createNewUser = async (payload: Partial<User>): Promise<User> => {
  return await UserModel.create(payload);
};

export const findUserByFilter = (
  filter: FilterQuery<User> | undefined,
  select = defaultSelect
) => {
  return UserModel.findOne(filter).select(select);
};

const userRepo = { createNewUser, findUserByFilter };
export default userRepo;
