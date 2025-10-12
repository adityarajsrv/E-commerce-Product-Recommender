// backend/controllers/explanationController.js
import { callGeminiExplain } from "../services/geminiService.js";
import { getCachedExplanation, saveExplanation } from "../services/cacheService.js";

export const explainProduct = async (req, res) => {
  try {
    const { user, product, reasonFacts = [] } = req.body;

    const cached = await getCachedExplanation(user.user_id, product.product_id);
    if (cached) return res.json({ explanation: cached.text, cached: true });

    const text = await callGeminiExplain(user, product, reasonFacts);
    await saveExplanation(user.user_id, product.product_id, text);
    res.json({ explanation: text, cached: false });
  } catch (error) {
    console.error("explainProduct error:", error);
    res.status(500).json({ error: "Failed to generate explanation" });
  }
};
