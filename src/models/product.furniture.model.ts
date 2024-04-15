import { Schema, Types, model } from "mongoose";

import { IUser, DOCUMENT_NAME as userRef } from "./user.model";

interface IFurnitureProduct {
  brand: string;
  size: string;
  material: string;
  user: Types.ObjectId | IUser;

  createdAt: NativeDate;
  updatedAt: NativeDate;
}

const furnitureSchema = new Schema<IFurnitureProduct>(
  {
    brand: { type: String, required: true },
    size: String,
    material: String,
    user: { type: Schema.Types.ObjectId, ref: userRef, required: true }
  },
  { timestamps: true, collection: "product_furniture" }
);

const ProductFurnitureModel = model<IFurnitureProduct>(
  "ProductFurniture",
  furnitureSchema
);
export default ProductFurnitureModel;
