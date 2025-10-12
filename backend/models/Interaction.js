// backend/models/Interaction.js
import mongoose from "mongoose";

const interactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  event_type: { type: String, enum: ["view", "wishlist", "add_to_cart", "purchase"], default: "view" },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Interaction", interactionSchema);
