## 🤖 Python Recommendation Engine

### 📁 Directory Structure
```
ml-service/
├── data/                   # Sample datasets
│   ├── product_catalog.json
│   └── user_behavior.json
├── model/                  # Core ML algorithms
│   ├── __init__.py
│   └── recommender.py     # Main recommendation logic
├── utils/                  # Data processing utilities
│   └── preprocess.py      # Data cleaning & feature engineering
├── tests/                  # Test suites
│   └── test_recommender.py
├── requirements.txt        # Python dependencies
└── app.py                 # Flask API entry point
```

### 🛠️ Setup & Installation

1. **Create Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   Configure:
   - `GEMINI_API_KEY`: Google Gemini API key
   - `MODEL_WEIGHTS`: Scoring weights for algorithm
   - `LOG_LEVEL`: Logging level

### 🧠 Recommendation Algorithm

#### Feature Engineering
- **TF-IDF Vectorization**: Product descriptions and tags
- **User Preference Vectors**: Aggregated from behavior history
- **Popularity Scoring**: Based on interaction counts

#### Scoring Methodology
```python
final_score = (
    text_similarity * TEXT_WEIGHT +
    popularity * POP_WEIGHT +
    recency_boost * RECENCY_WEIGHT
)
```

#### AI Explanations
- Integration with Google Gemini API
- Natural language reasoning generation
- Fallback template-based explanations

### 🔧 Key Features

- **Hybrid Approach**: Content-based + collaborative filtering
- **Scalable Processing**: Handles large datasets efficiently
- **Configurable Weights**: Tunable scoring parameters
- **Extensible Architecture**: Easy to add new algorithms

### 🚀 Usage

1. **Standalone ML Script**
   ```bash
   python -m model.recommender --catalog data/catalog.json --behavior data/behavior.json
   ```

2. **API Mode**
   ```bash
   python app.py
   ```

3. **Integration Test**
   ```bash
   python -m pytest tests/
   ```

### 📊 Input Formats

#### Product Catalog
```json
{
  "product_id": "P001",
  "name": "Product Name",
  "category": "Category",
  "description": "Product description...",
  "tags": ["tag1", "tag2"]
}
```

#### User Behavior
```json
{
  "user_id": "U001",
  "product_id": "P001",
  "event_type": "view|wishlist|add_to_cart|purchase",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### 🧪 Testing
```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=model

# Specific test file
pytest tests/test_recommender.py
```