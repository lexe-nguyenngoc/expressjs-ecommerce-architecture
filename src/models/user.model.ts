import { Document, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export const DOCUMENT_NAME = "User";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  status: UserStatus;
  verify: boolean;
  roles: string[];

  comparePassword(candidatePassword: string): boolean;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, trim: true, maxLength: 150 },
    email: { type: String, unique: true, trim: true },
    password: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
    },
    verify: { type: Boolean, default: false },
    roles: { type: [String], default: [] },
  },
  { timestamps: true, collection: "users" }
);

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }

  next();
});

const UserModel = model<User>(DOCUMENT_NAME, userSchema);
export default UserModel;
