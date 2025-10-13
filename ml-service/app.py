# ml-service/app.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json
import random
from fastapi.middleware.cors import CORSMiddleware
from utils.preprocess import preprocess_user_behavior
from model.recommender import recommend_products

app = FastAPI(title="ML Recommendation Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load Data
with open("data/product_catalog.json", "r") as f:
    product_catalog = json.load(f)

with open("data/user_behavior.json", "r") as f:
    user_behavior = json.load(f)

class UserInput(BaseModel):
    user_id: str

@app.get("/")
def home():
    return {"message": "ML Service running successfully 🚀"}

@app.post("/recommend")
def recommend(user: UserInput):
    user_id = user.user_id
    if user_id not in user_behavior:
        raise HTTPException(status_code=404, detail="User not found in behavior data")
    
    processed = preprocess_user_behavior(user_behavior[user_id])
    recommendations = recommend_products(user_id, product_catalog, processed)
    return {"user_id": user_id, "recommendations": recommendations}
