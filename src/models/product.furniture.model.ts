import { Schema, Types, model } from "mongoose";

import { User, DOCUMENT_NAME as userRef } from "./user.model";

interface FurnitureDocument extends Document {
  brand: string;
  size: string;
  material: string;
  user: Types.ObjectId | User;
}

const furnitureSchema = new Schema<FurnitureDocument>(
  {
    brand: { type: String, required: true },
    size: String,
    material: String,
    user: { type: Schema.Types.ObjectId, ref: userRef, required: true },
  },
  { timestamps: true }
);

const ProductFurnitureModel = model<FurnitureDocument>(
  "ProductFurniture",
  furnitureSchema
);
export default ProductFurnitureModel;
