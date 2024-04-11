import { Schema, Types, model } from "mongoose";

import { User, DOCUMENT_NAME as userRef } from "./user.model";

interface ElectronicsDocument extends Document {
  manufacturer: string;
  model: string;
  color: string;
  user: Types.ObjectId | User;
}

const electronicsSchema = new Schema<ElectronicsDocument>(
  {
    manufacturer: { type: String, required: true },
    model: String,
    color: String,
    user: { type: Schema.Types.ObjectId, ref: userRef, required: true },
  },
  { timestamps: true }
);

const ProductElectronicsModel = model<ElectronicsDocument>(
  "ProductElectronics",
  electronicsSchema
);
export default ProductElectronicsModel;
