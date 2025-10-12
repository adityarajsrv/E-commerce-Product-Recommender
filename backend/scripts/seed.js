// backend/config/seedProducts.js or backend/scripts/seed.js
import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Product from "../models/Product.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productFilePath = path.join(__dirname, "../ml-service/data/product_catalog.json");

mongoose.connect(process.env.MONGO_URI)
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
