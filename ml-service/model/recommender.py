# ml-service/model/recommender.py
import json
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict

EVENT_WEIGHTS = {
    "view": 1.0,
    "wishlist": 1.5,
    "add_to_cart": 2.5,
    "purchase": 4.0
}

def load_catalog_from_file(path: str) -> pd.DataFrame:
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    df = pd.DataFrame(data)
    df["description"] = df.get("description", "") 
    df["tags"] = df.get("tags", "").apply(lambda t: " ".join(t) if isinstance(t, list) else (t or ""))
    return df

def build_popularity(interactions: List[Dict]) -> Dict[str, int]:
    counts = {}
    for ev in interactions:
        pid = ev.get("product_id")
        if not pid: 
            continue
        counts[pid] = counts.get(pid, 0) + 1
    return counts

def user_pref_vector(user: Dict, interactions: List[Dict], products_df: pd.DataFrame, vectorizer: TfidfVectorizer):
    texts = []
    weights = []
    for ev in interactions:
        pid = ev.get("product_id")
        typ = ev.get("event_type", "view")
        w = EVENT_WEIGHTS.get(typ, 1.0)
        row = products_df[products_df["product_id"] == pid]
        if len(row) == 0:
            continue
        text = (row.iloc[0].get("description", "") or "") + " " + (row.iloc[0].get("tags", "") or "")
        texts.append(text)
        weights.append(w)
    
    if not texts:
        pref_text = " ".join(user.get("preferences", [])) if user else ""
        user_vec = vectorizer.transform([pref_text])
    else:
        tfidf_rows = vectorizer.transform(texts)
        weights = np.array(weights).reshape(-1,1)
        weighted = tfidf_rows.multiply(weights)
        avg = weighted.sum(axis=0) / (weights.sum() + 1e-9)
        user_vec = avg
    return np.asarray(user_vec)

def generate_recommendations(user: Dict, interactions: List[Dict], catalog_df: pd.DataFrame = None, top_k:int = 10):
    if catalog_df is None:
        catalog_df = load_catalog_from_file("data/product_catalog.json")

    if "product_id" not in catalog_df.columns:
        catalog_df["product_id"] = catalog_df.index.map(lambda i: f"P{i+1:03d}")

    catalog_df["text_search"] = (
        catalog_df.get("name","") + " " + 
        catalog_df.get("description","") + " " + 
        catalog_df.get("tags","").astype(str)
    ).fillna("")

    vectorizer = TfidfVectorizer(stop_words="english", max_features=5000)
    tfidf_matrix = vectorizer.fit_transform(catalog_df["text_search"].tolist())
    tfidf_matrix = np.asarray(tfidf_matrix.toarray())
    user_vec = user_pref_vector(user, interactions, catalog_df, vectorizer)
    sims = cosine_similarity(user_vec, tfidf_matrix).flatten()
    pop = build_popularity(interactions)
    max_pop = max(pop.values()) if pop else 1
    pop_scores = catalog_df["product_id"].map(lambda pid: pop.get(pid,0) / max_pop if max_pop>0 else 0).fillna(0).values

    recency_boost = np.zeros(len(catalog_df))

    alpha = 0.65   
    beta = 0.25    
    gamma = 0.10   

    combined = alpha * sims + beta * pop_scores + gamma * recency_boost

    catalog_df["score"] = combined
    catalog_df["text_sim"] = sims
    catalog_df["pop_score"] = pop_scores

    purchased = {ev["product_id"] for ev in interactions if ev.get("event_type") == "purchase"}
    results = catalog_df[~catalog_df["product_id"].isin(purchased)].copy()

    results = results.sort_values("score", ascending=False).head(top_k)
    output = []
    for rank, (_, row) in enumerate(results.iterrows(), start=1):
        features = []
        if row.get("brand"):
            features.append(row["brand"])
        tags = row.get("tags")
        if tags:
            if isinstance(tags, str):
                tlist = tags.split()[:2]
            else:
                tlist = tags[:2]
            features += tlist
        output.append({
            "product_id": row["product_id"],
            "name": row.get("name") or row.get("title"),
            "category": row.get("category"),
            "score": float(row["score"]),
            "rank": rank,
            "text_sim": float(row["text_sim"]),
            "pop_score": float(row["pop_score"]),
            "reason_features": features[:2],
            "image": row.get("image") or None
        })
    return output
