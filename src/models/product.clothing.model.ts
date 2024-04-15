import { Schema, Types, model } from "mongoose";

import { IUser, DOCUMENT_NAME as userRef } from "./user.model";

interface IClothingProduct {
  brand: string;
  size: string;
  material: string;
  user: Types.ObjectId | IUser;

  createdAt: NativeDate;
  updatedAt: NativeDate;
}

const clothingSchema = new Schema<IClothingProduct>(
  {
    brand: { type: String, required: true },
    size: String,
    material: String,
    user: { type: Schema.Types.ObjectId, ref: userRef, required: true }
  },
  { timestamps: true, collection: "product_clothing" }
);

const ProductClothingModel = model<IClothingProduct>(
  "ProductClothing",
  clothingSchema
);
export default ProductClothingModel;
