# ml-service/utils/preprocess.py
import json
import pandas as pd

def load_json_as_df(path: str):
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return pd.DataFrame(data)

def normalize_text(text: str) -> str:
    if not isinstance(text, str):
        return ""
    return text.lower().strip()
