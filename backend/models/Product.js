// backend/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_id: { type: String, required: true, unique: true },
  name: String,
  category: String,
  brand: String,
  price: Number,
  description: String,
  tags: [String],
  rating: Number,
  features: [String],
});

export default mongoose.model("Product", productSchema);
