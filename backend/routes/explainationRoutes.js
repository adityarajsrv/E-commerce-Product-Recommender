// backend/routes/explanationRoutes.js
import express from "express";

const router = express.Router();

// Example route: explain why a product was recommended
router.get("/", (req, res) => {
  res.json({
    message: "Explanation API is active 🚀",
    info: "This endpoint will later return model-based explanations for recommendations."
  });
});

export default router;
