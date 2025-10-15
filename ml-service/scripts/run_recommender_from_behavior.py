import os
import sys
import json
import pandas as pd
import argparse
from dotenv import load_dotenv, dotenv_values
import google.generativeai as genai # pyright: ignore[reportMissingImports]

os.environ["PYTHONIOENCODING"] = "utf-8"
try:
    sys.stdin.reconfigure(encoding="utf-8")
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
except Exception:
    pass

sys.path.append(os.path.join(os.path.dirname(__file__), ".."))
from model.recommender import generate_recommendations, load_catalog_from_file
from utils.preprocess import preprocess_user_behavior

env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../backend/.env"))
load_dotenv(dotenv_path=env_path)

config = dotenv_values(env_path)
GEMINI_API_KEY = config.get("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print(f"[ERROR] GEMINI_API_KEY not found in {env_path}", file=sys.stderr)
    GEMINI_API_KEY = None
else:
    print(f"[OK] Loaded GEMINI_API_KEY from {env_path}", file=sys.stderr)

model = None
if GEMINI_API_KEY:
    try:
        genai.configure(api_key=GEMINI_API_KEY)
        model = genai.GenerativeModel("gemini-2.5-flash")
        print("[OK] Gemini API configured successfully.", file=sys.stderr)
    except Exception as e:
        print(f"[WARN] Gemini setup failed: {e}", file=sys.stderr)
        model = None
else:
    print("[WARN] Gemini API key not found — skipping explanations.", file=sys.stderr)


parser = argparse.ArgumentParser()
parser.add_argument("--catalog", required=True, help="Path to product catalog JSON/CSV")
parser.add_argument("--behavior", required=True, help="Path to user behavior JSON/CSV")
args = parser.parse_args()

catalog_path = args.catalog
behavior_path = args.behavior

def load_data(path):
    """Load CSV or JSON file as a pandas DataFrame."""
    try:
        with open(path, "r", encoding="utf-8") as f:
            return pd.DataFrame(json.load(f))
    except Exception:
        pass

    try:
        return pd.read_csv(path)
    except Exception:
        pass

    raise ValueError("Unsupported file format. Please upload JSON or CSV.")


catalog_df = load_catalog_from_file(catalog_path)
behavior_df = load_data(behavior_path)

print("[INFO] Starting recommendation pipeline...", file=sys.stderr)
print(f"[INFO] Loaded catalog from: {catalog_path}", file=sys.stderr)
print(f"[INFO] Loaded behavior from: {behavior_path}", file=sys.stderr)
print(f"[INFO] Catalog size: {len(catalog_df)}, Behavior size: {len(behavior_df)}", file=sys.stderr)
sys.stderr.flush()

def generate_explanations(user_id, recs):
    """Enrich each recommendation with a short explanation via Gemini API."""
    if not model:
        for rec in recs:
            rec["explanation"] = "Explanation unavailable (Gemini disabled)."
        return recs

    enriched_recs = []
    for rec in recs:
        prompt = f"""
        Product: {rec['name']} (Category: {rec['category']})
        Based on this user's interaction history and preferences,
        write a concise 2–3 sentence explanation of why this product
        would be recommended to user {user_id}.
        """
        try:
            response = model.generate_content(prompt)
            rec["explanation"] = response.text.strip()
        except Exception as e:
            err = str(e)
            if "429" in err or "quota" in err.lower():
                rec["explanation"] = "Explanation temporarily unavailable (rate limit)."
            else:
                rec["explanation"] = f"Error: {e}"
        enriched_recs.append(rec)
    return enriched_recs

results = []

for user_id, user_df in behavior_df.groupby("user_id"):
    print(f"[INFO] Processing user {user_id} with {len(user_df)} interactions...", file=sys.stderr)
    sys.stderr.flush()

    user = {"user_id": user_id}
    interactions = user_df.to_dict(orient="records")

    recs = generate_recommendations(user, interactions, catalog_df, top_k=5)
    enriched = generate_explanations(user_id, recs)
    results.append({"user_id": user_id, "recommendations": enriched})

print("[OK] Finished processing all users.", file=sys.stderr)
sys.stderr.flush()

sys.stdout.write(json.dumps(results, ensure_ascii=False))
sys.stdout.flush()
sys.exit(0)
