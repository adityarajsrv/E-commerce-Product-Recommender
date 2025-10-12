// backend/models/Explanation.js
import mongoose from "mongoose";

const explanationSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  text: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Explanation", explanationSchema);
