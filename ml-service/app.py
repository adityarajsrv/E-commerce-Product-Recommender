# ml-service/app.py
from fastapi import FastAPI, Request
from model.recommender import generate_recommendations
import uvicorn

app = FastAPI(title="ML Recommender Service")

@app.get("/")
def home():
    return {"message": "ML recommender microservice running"}

@app.post("/recommend")
async def recommend(request: Request):
    payload = await request.json()
    user = payload.get("user", {})
    interactions = payload.get("interactions", [])
    # Optionally accept inline catalog
    catalog = payload.get("catalog", None)
    recs = generate_recommendations(user, interactions, catalog_df=None if catalog is None else None)
    return {"recommendations": recs}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
