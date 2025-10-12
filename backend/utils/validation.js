// backend/utils/validation.js
export const validateRecommendationRequest = (body) => {
  if (!body.user || !body.interactions) {
    throw new Error("Invalid input: user and interactions are required.");
  }
};
