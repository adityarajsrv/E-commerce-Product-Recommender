// backend/controllers/recommendationController.js
import { callMlService } from "../services/apiClient.js";
import { callGeminiExplain } from "../services/geminiService.js";
import { getCachedExplanation, saveExplanation } from "../services/cacheService.js";

export const getRecommendations = async (req, res) => {
  try {
    const { user, interactions, catalog, k = 5, explain = true, tone = "friendly" } = req.body;
    const mlResp = await callMlService(user, interactions, catalog);
    let recs = mlResp.recommendations || [];

    recs = recs.slice(0, k);

    const withExplanations = await Promise.all(recs.map(async (p) => {
      const pid = p.product_id;
      const cached = await getCachedExplanation(user.user_id || user.id || user.user_id || "anon", pid);
      if (cached && cached.text) {
        return { ...p, explanation: cached.text, cached: true };
      }
      const reasonFacts = [
        `recent_product_ids: ${interactions.map(i => i.product_id).slice(-3).join(", ")}`,
      ];
      const text = await callGeminiExplain(user, p, reasonFacts, tone);
      await saveExplanation(user.user_id || user.id || "anon", pid, text);
      return { ...p, explanation: text, cached: false };
    }));

    return res.json({ user: user.user_id || user.id || "anon", recommendations: withExplanations });

  } catch (err) {
    console.error("recommendationController error:", err);
    return res.status(500).json({ error: "Failed to get recommendations" });
  }
};
