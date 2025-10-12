// backend/services/apiClient.js
import axios from "axios";

const ML_URL = process.env.ML_SERVICE_URL || "http://localhost:8001/recommend";

export async function callMlService(user, interactions, catalog = null) {
  try {
    const body = { user, interactions };
    if (catalog) body.catalog = catalog;
    const resp = await axios.post(ML_URL, body, { timeout: 15000 });
    return resp.data;
  } catch (err) {
    console.error("ML service error:", err.message || err);
    throw err;
  }
}
