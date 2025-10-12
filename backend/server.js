// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import explanationRoutes from "./routes/explainationRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/recommendations", recommendationRoutes);
app.use("/api/explanations", explanationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
