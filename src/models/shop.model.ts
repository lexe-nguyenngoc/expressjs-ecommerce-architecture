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

const ShopModel = model(DOCUMENT_NAME, shopSchema);
export default ShopModel;
