import { Document, Schema, Types, model } from "mongoose";
import slugify from "slugify";
import uniqueSlug from "unique-slug";

import { User, DOCUMENT_NAME as userRef } from "./user.model";

export enum ProductTypes {
  ELECTRONICS = "Electronics",
  CLOTHING = "Clothing",
  FURNITURE = "Furniture",
}

export enum ProductStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
}

export interface ProductDocument extends Document {
  name: string;
  thumb: string;
  description: string;
  slug: string;
  quantity: number;
  type: ProductTypes;
  user: Types.ObjectId | User;
  attributes: any;
  rating_average: number;
  variations: any;
  status: ProductStatus;
}

const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    thumb: { type: String, required: true },
    description: String,
    slug: String,
    quantity: { type: Number, required: true },
    type: { type: String, required: true, enum: Object.values(ProductTypes) },
    user: { type: Schema.Types.ObjectId, ref: userRef, required: true },
    attributes: { type: Schema.Types.Mixed, required: true },
    rating_average: {
      type: Number,
      required: true,
      default: 4.5,
      min: [1, "The lowest rating must be 1.0"],
      max: [5, "The highest rating must be 5.0"],
      set: (value: number) => Math.round(value * 10) / 10,
    },
    variations: { type: Array, required: true },
    status: {
      type: String,
      required: true,
      enum: Object.values(ProductStatus),
    },
  },
  { timestamps: true, collection: "products" }
);
// Create index
productSchema.index({ name: "text", description: "text" });

// Middleware
productSchema.pre("save", function (next) {
  this.slug =
    slugify(this.name, {
      lower: true,
      trim: true,
      remove: /[*+~.()'"!:@]/g,
    }) + uniqueSlug(this.name);
  next();
});

const ProductModel = model<ProductDocument>("Product", productSchema);
export default ProductModel;
