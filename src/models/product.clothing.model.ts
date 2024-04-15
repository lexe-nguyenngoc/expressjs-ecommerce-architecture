import { Schema, Types, model } from "mongoose";

import { IUser, DOCUMENT_NAME as userRef } from "./user.model";

interface ClothingDocument extends Document {
  brand: string;
  size: string;
  material: string;
  user: Types.ObjectId | IUser;
}

const clothingSchema = new Schema<ClothingDocument>(
  {
    brand: { type: String, required: true },
    size: String,
    material: String,
    user: { type: Schema.Types.ObjectId, ref: userRef, required: true }
  },
  { timestamps: true, collection: "product_clothing" }
);

const ProductClothingModel = model<ClothingDocument>(
  "ProductClothing",
  clothingSchema
);
export default ProductClothingModel;
