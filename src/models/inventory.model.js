const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = "Inventory";
const COLLECTION_NAME = "Inventories";

const inventorySchema = new Schema(
  {
    product_id: { type: Schema.Types.ObjectId, ref: "Product" },
    location: { type: String, default: "unknown" },
    stock: { type: Number, required: true },
    shop_id: { type: Schema.Types.ObjectId, ref: "Shop" },
    reservations: { type: Array, default: [] },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, inventorySchema);
