// backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  preferences: [String],
});

export default mongoose.model("User", userSchema);
