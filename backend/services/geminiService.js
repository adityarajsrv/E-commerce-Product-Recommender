// backend/services/geminiService.js
import axios from "axios";

const GEMINI_KEY = process.env.GEMINI_API_KEY;

// Example placeholder function that composes prompt and calls Gemini REST endpoint.
// Replace with the actual Gemini client you have access to.
export async function callGeminiExplain(user, product, reasonFacts = [], tone = "friendly") {
  const prompt = `
User facts:
${reasonFacts.join("\n")}
Product:
- id: ${product.product_id}
- name: ${product.name}
- category: ${product.category}
- reason_features: ${product.reason_features ? product.reason_features.join(", ") : ""}

Task:
Write a friendly 1-2 sentence explanation (20-50 words) starting with "Why this product?" that references at most 1 user fact and at most 1 product attribute. Keep factual, do not invent details.
  `;

  // TODO: Replace with official Gemini SDK call.
  // For now, return a canned response format so you can test pipeline.
  const fake = `Why this product? Based on your recent activity, the ${product.name} is a good match because of ${product.reason_features.join(", ")}. It pairs well with your previous interests.`;
  return fake;

  // Example using axios if you have a REST endpoint:
  /*
  const resp = await axios.post("https://api.gemini.../generate", {
    prompt, max_tokens: 70, temperature: 0.2
  }, {
    headers: { Authorization: `Bearer ${GEMINI_KEY}` }
  });
  return resp.data. ... // parse accordingly
  */
}
