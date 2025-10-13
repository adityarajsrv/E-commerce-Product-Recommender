import express from "express";
import multer from "multer";
import { runMLPipeline } from "../controllers/recommendationController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/",
  upload.fields([
    { name: "catalog", maxCount: 1 },
    { name: "behavior", maxCount: 1 },
  ]),
  runMLPipeline
);

export default router;
