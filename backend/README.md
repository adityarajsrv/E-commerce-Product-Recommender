## 🚀 Node.js API Server

### 📁 Directory Structure
```
backend/
├── config/
│   └── db.js              # MongoDB connection configuration
├── controllers/
│   ├── recommendationController.js  # Handle recommendation requests
│   └── explanationController.js     # Manage AI explanations
├── models/
│   ├── User.js            # User schema and methods
│   ├── Product.js         # Product data model
│   └── Interaction.js     # User behavior tracking
├── routes/
│   ├── recommendationRoutes.js     # API routes for recommendations
│   └── explanationRoutes.js        # Routes for explanation generation
├── services/
│   ├── geminiService.js   # Google Gemini API integration
│   ├── cacheService.js    # Redis/Memory caching layer
│   └── apiClient.js       # External API communication
├── utils/
│   ├── logger.js          # Custom logging utility
│   └── validation.js      # Input validation middleware
├── scripts/
│   └── seed.js            # Database seeding script
└── server.js              # Application entry point
```

### 🛠️ Setup & Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   Configure:
   - `MONGODB_URI`: MongoDB connection string
   - `GEMINI_API_KEY`: Google Gemini API key
   - `PORT`: Server port (default: 5000)

3. **Start Server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

### 📡 API Endpoints

#### Recommendations
- `POST /api/recommendations` - Generate recommendations from uploaded files
- `GET /api/recommendations/:userId` - Get cached recommendations

#### Explanations
- `POST /api/explanations/generate` - Generate AI explanations
- `GET /api/explanations/:productId` - Get stored explanations

### 🔧 Key Features

- **File Processing**: Handles CSV/JSON uploads with UTF-8 encoding
- **ML Integration**: Spawns Python ML processes for recommendations
- **Caching**: Redis-based caching for performance
- **Error Handling**: Comprehensive error handling and logging
- **Security**: Input validation and sanitization

### 🚦 Scripts

- `npm run dev` - Start with nodemon
- `npm run seed` - Populate database with sample data

---
