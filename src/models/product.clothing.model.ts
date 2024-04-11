import { Schema, Types, model } from "mongoose";

import { User, DOCUMENT_NAME as userRef } from "./user.model";

interface ClothingDocument extends Document {
  brand: string;
  size: string;
  material: string;
  user: Types.ObjectId | User;
}

const clothingSchema = new Schema<ClothingDocument>(
  {
    brand: { type: String, required: true },
    size: String,
    material: String,
    user: { type: Schema.Types.ObjectId, ref: userRef, required: true },
  },
  { timestamps: true }
);

const ProductClothingModel = model<ClothingDocument>(
  "ProductClothing",
  clothingSchema
);
export default ProductClothingModel;
