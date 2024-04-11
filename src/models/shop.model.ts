import { Document, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

enum ShopStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export const DOCUMENT_NAME = "Shop";

export interface Shop extends Document {
  name: string;
  email: string;
  password: string;
  status: ShopStatus;
  verify: boolean;
  roles: string[];

  comparePassword(candidatePassword: string): boolean;
}

const shopSchema = new Schema<Shop>(
  {
    name: { type: String, trim: true, maxLength: 150 },
    email: { type: String, unique: true, trim: true },
    password: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(ShopStatus),
      default: ShopStatus.ACTIVE,
    },
    verify: { type: Boolean, default: false },
    roles: { type: [String], default: [] },
  },
  { timestamps: true }
);

shopSchema.pre("save", async function (next) {
  if (this.isNew) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }

  next();
});

shopSchema.methods.comparePassword = function comparePassword(
  candidatePassword: string
): boolean {
  console.log(candidatePassword, this.password);
  return bcrypt.compareSync(candidatePassword, this.password);
};

const ShopModel = model<Shop>(DOCUMENT_NAME, shopSchema);
export default ShopModel;
