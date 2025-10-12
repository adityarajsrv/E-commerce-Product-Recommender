// backend/services/cacheService.js
import Explanation from "../models/Explaination.js";

export async function getCachedExplanation(userId, productId) {
  return await Explanation.findOne({ userId, productId }).lean();
}

export async function saveExplanation(userId, productId, text) {
  const ex = new Explanation({ userId, productId, text });
  await ex.save();
  return ex;
}
