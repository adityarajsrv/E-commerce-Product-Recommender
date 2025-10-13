## ⚛️ React Application

### 📁 Project Structure
```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── RecommendationPanel/
│   │   │   ├── RecommendationPanel.jsx
│   │   │   ├── RecommendationCard.jsx
│   │   │   └── PanelHeader.jsx
│   │   ├── FileUpload/
│   │   │   ├── FileUpload.jsx
│   │   │   └── UploadProgress.jsx
│   │   └── UI/
│   │       ├── LoadingSpinner.jsx
│   │       ├── ErrorBoundary.jsx
│   │       └── FallbackImage.jsx
│   ├── services/
│   │   ├── api.js          # API communication
│   │   └── storage.js      # Local storage management
│   ├── hooks/
│   │   ├── useRecommendations.js
│   │   └── useFileUpload.js
│   ├── utils/
│   │   ├── constants.js
│   │   └── helpers.js
│   └── styles/
│       ├── main.css
│       └── components.css
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
   - `REACT_APP_API_URL`: Backend API base URL
   - `REACT_APP_DEBUG`: Enable debug mode

3. **Start Development Server**
   ```bash
   npm start
   ```

### 🎯 Components

#### RecommendationPanel
- Expandable/collapsible user recommendation sections
- Displays product cards with images, scores, and explanations
- Handles user interactions (likes, wishes)

#### FileUpload
- Drag-and-drop file upload interface
- Supports CSV and JSON formats
- Progress indicators and validation

#### UI Components
- **LoadingSpinner**: Async operation indicators
- **ErrorBoundary**: Graceful error handling
- **FallbackImage**: Placeholder for missing product images

### 🔧 Key Features

- **Responsive Design**: Mobile-first approach
- **Real-time Updates**: Live recommendation loading
- **Error Handling**: User-friendly error messages
- **Performance**: Optimized re-renders and API calls
- **Debug Mode**: Console logging for development

### 🚦 Scripts

- `npm start` - Development server
- `npm build` - Production build

---
