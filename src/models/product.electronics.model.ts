import { Schema, Types, model } from "mongoose";

import { IUser, DOCUMENT_NAME as userRef } from "./user.model";

interface IElectronicsProduct {
  manufacturer: string;
  model: string;
  color: string;
  user: Types.ObjectId | IUser;

  createdAt: NativeDate;
  updatedAt: NativeDate;
}

const electronicsSchema = new Schema<IElectronicsProduct>(
  {
    manufacturer: { type: String, required: true },
    model: String,
    color: String,
    user: { type: Schema.Types.ObjectId, ref: userRef, required: true }
  },
  { timestamps: true, collection: "product_electronics" }
);

const ProductElectronicsModel = model<IElectronicsProduct>(
  "ProductElectronics",
  electronicsSchema
);
export default ProductElectronicsModel;
