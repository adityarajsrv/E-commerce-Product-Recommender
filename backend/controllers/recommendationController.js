import { spawn } from "child_process";
import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const runMLPipeline = async (req, res) => {
  try {
    const catalogFile = req.files["catalog"]?.[0];
    const behaviorFile = req.files["behavior"]?.[0];

    if (!catalogFile || !behaviorFile) {
      return res.status(400).json({ error: "Both catalog and behavior files are required." });
    }

    const mlScriptPath = path.resolve(
      __dirname,
      "../../ml-service/scripts/run_recommender_from_behavior.py"
    );

    const pythonExe =
      "C:\\Users\\ASUS\\Documents\\VSCODE\\E-commerce Product Recommender\\ml-service\\venv\\Scripts\\python.exe";

    console.log("🚀 Running ML script at:", mlScriptPath);

    // ✅ Force UTF-8 for subprocess
    const pythonProcess = spawn(
      pythonExe,
      [mlScriptPath, "--catalog", catalogFile.path, "--behavior", behaviorFile.path],
      { env: { ...process.env, PYTHONIOENCODING: "utf-8" } }
    );

    let output = "";
    let errorOutput = "";

    pythonProcess.stdout.on("data", (data) => {
      output += data.toString("utf-8");
    });

    pythonProcess.stderr.on("data", (data) => {
      const msg = data.toString("utf-8");
      errorOutput += msg;
      console.error("🐍 [ML STDERR]:", msg);
    });

    pythonProcess.on("close", (code) => {
      // Cleanup uploaded temp files
      try {
        fs.unlinkSync(catalogFile.path);
        fs.unlinkSync(behaviorFile.path);
      } catch (cleanupErr) {
        console.warn("⚠️ Cleanup warning:", cleanupErr.message);
      }

      if (code !== 0) {
        console.error("❌ Python exited with code", code);
        return res.status(500).json({
          error: "ML pipeline failed.",
          details: errorOutput.split("\n").slice(-5).join("\n"),
        });
      }

      // ✅ Try parsing the JSON output
      try {
        const jsonOutput = JSON.parse(output.trim());
        console.log("✅ ML pipeline completed successfully.");
        res.json(jsonOutput);
      } catch (err) {
        console.error("❌ JSON Parse Error:", err);
        console.error("Raw output sample:", output.slice(0, 400));
        res.status(500).json({
          error: "Failed to parse ML output.",
          raw: output.slice(0, 400),
        });
      }
    });
  } catch (err) {
    console.error("💥 Controller error:", err);
    res.status(500).json({ error: err.message });
  }
};
