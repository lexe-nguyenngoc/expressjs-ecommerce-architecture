import { Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export const DOCUMENT_NAME = "user";
const COLLECTION_NAME = "users";

enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  status: UserStatus;
  verify: boolean;
  roles: string[];

  createdAt: NativeDate;
  updatedAt: NativeDate;
}

interface UserMethods {
  comparePassword(candidatePassword: string): boolean;
}

export type UserModel = Model<IUser, {}, UserMethods>;

const userSchema = new Schema<IUser, UserModel, UserMethods>(
  {
    name: { type: String, trim: true, maxLength: 150 },
    email: { type: String, unique: true, trim: true },
    password: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE
    },
    verify: { type: Boolean, default: false },
    roles: { type: [String], default: [] }
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }

  next();
});

userSchema.method("comparePassword", function (candidatePassword: string) {
  return bcrypt.compareSync(candidatePassword, this.password);
});

const User = model<IUser, UserModel>(DOCUMENT_NAME, userSchema);
export default User;
