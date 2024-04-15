import { FilterQuery } from "mongoose";

import User, { IUser } from "@/models/user.model";
import { SelectFields } from "@/types";

const defaultSelect: SelectFields<IUser> = {
  email: 1,
  password: 1,
  status: 1,
  roles: 1,
  name: 1
};

export const createNewUser = async (
  payload: Partial<IUser>
): Promise<IUser> => {
  return await User.create(payload);
};

export const findUserByFilter = (
  filter: FilterQuery<IUser> | undefined,
  select = defaultSelect
) => {
  return User.findOne(filter).select(select);
};

const userRepo = { createNewUser, findUserByFilter };
export default userRepo;
