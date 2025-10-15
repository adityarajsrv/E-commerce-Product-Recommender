# E-Commerce Product Recommender

A full-stack recommendation system that provides personalized product suggestions using collaborative filtering, content-based filtering, and AI-generated explanations.

Demo Video Link : https://drive.google.com/drive/folders/1E4oaQG9XUf_VbGIpHEewhvDKNRJ4i_p9?usp=drive_link


## 🚀 Overview

This system analyzes user behavior and product catalog data to generate personalized recommendations with explainable AI insights. The architecture spans frontend, backend, and machine learning services working in harmony.

## 📁 Project Structure

```
E-COMMERCE PRODUCT RECOMMENDER/
├── backend/                 # Node.js API Server
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── services/          # Business logic & external APIs
│   ├── utils/             # Utilities & middleware
│   └── server.js          # Entry point
├── frontend/              # React Application
└── ml-service/            # Python ML Pipeline
    ├── data/              # Sample datasets
    ├── model/             # Recommendation algorithms
    └── utils/             # Data preprocessing
```

## 🛠️ Technology Stack

- **Frontend**: React.js with modern hooks
- **Backend**: Node.js, Express.js, MongoDB
- **ML Service**: Python, Pandas, Scikit-learn, Google Gemini API
- **Recommendation**: Hybrid (Content-based + Collaborative Filtering)

## 🔄 Workflow

### 1. Frontend (React App)
- Upload product catalog and user behavior data
- Display expandable recommendation panels
- Show product details with images and AI explanations
- Handle user interactions (likes, wishlist)
- Fallback UI for missing data

### 2. Backend (Node.js API)
- File upload handling with UTF-8 encoding
- ML pipeline orchestration via child processes
- Caching layer for performance optimization
- API endpoints for recommendations and explanations
- Temporary file cleanup

### 3. ML Service (Python)
- **Input Processing**: Catalog & behavior data parsing
- **Feature Engineering**: TF-IDF on product descriptions
- **Similarity Computation**: Cosine similarity between user preferences and products
- **Ranking**: Combined scoring (similarity + popularity + recency)
- **Explanation Generation**: AI-powered reasoning using Gemini API

## 📊 Data Flow

```
User Uploads → Backend API → ML Processing → Recommendations → Frontend Display
     ↓              ↓             ↓               ↓               ↓
  CSV/JSON     File Validation  TF-IDF +     JSON Response   Expandable Panels
  Files        & Processing     Similarity   with Scores     with AI Explanations
```

## 🎯 Key Features

- **Hybrid Recommendations**: Content-based + popularity scoring
- **AI Explanations**: Natural language reasoning for recommendations
- **Real-time Processing**: On-demand recommendation generation
- **Scalable Architecture**: Modular and extensible design
- **User-Friendly Interface**: Intuitive React components with fallbacks

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- Python 3.8+
- MongoDB
- Google Gemini API key

### Installation & Setup

See individual README files in each directory:
- [Backend Setup](backend/README.md)
- [Frontend Setup](frontend/README.md) 
- [ML Service Setup](ml-service/README.md)

## 🔧 Configuration

- Environment variables for API keys and service configuration
- Modular scoring weights for recommendation algorithm
- Configurable caching strategies
- Customizable UI themes and layouts

## 🎨 Frontend Features

- Responsive design with expandable panels
- Image fallback handling
- Interactive liking system
- Real-time recommendation updates
- Debug mode with console logging

---

*For detailed setup instructions, check the README files in each subdirectory.*

---

## ⭐ Support the Project

If you find this project helpful or interesting, please consider giving it a star on GitHub! Your support helps me continue to improve and maintain the project.

---
