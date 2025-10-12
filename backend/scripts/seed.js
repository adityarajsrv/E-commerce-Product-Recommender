// backend/scripts/seed.js
import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Product from "../models/Product.js";

// ✅ Define __dirname first
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Then load .env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("Current directory:", __dirname);
console.log("Looking for .env in:", path.resolve(__dirname, "../.env"));

const productFilePath = path.join(__dirname, "../../ml-service/data/product_catalog.json");

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to Mongo...");
    const data = JSON.parse(fs.readFileSync(productFilePath, "utf-8"));
    
    await Product.deleteMany({});
    await Product.insertMany(data);
    
    console.log(`✅ ${data.length} products imported successfully!`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error importing products:", error);
    process.exit(1);
  });
