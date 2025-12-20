# FlexCore - Workout Tracking Application

A full-stack workout tracking application built with React, Express, and MongoDB.

## 🚀 Live Demo

- **Frontend**: [Your Vercel URL will appear here]
- **Backend API**: [Your Render URL will appear here]

## 📋 Features

- User authentication and profiles
- Workout planning and tracking
- Progress monitoring
- AI-powered chatbot assistance
- Workout history and analytics

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- TailwindCSS
- Axios

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- Express Session

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Local Development

1. Clone the repository
```bash
git clone <your-repo-url>
cd wait
```

2. Install root dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd backend
npm install
```

4. Install frontend dependencies
```bash
cd frontend
npm install
```

5. Set up environment variables
- Copy `backend/.env.example` to `backend/.env`
- Add your MongoDB connection string and other secrets

6. Run the application
```bash
# From root directory
npm run dev
```

This will start both frontend (port 5173) and backend (port 5000) concurrently.

## 🌐 Deployment

### Backend Deployment (Render)

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Create a new Web Service
4. Connect your GitHub repository
5. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add environment variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `SESSION_SECRET`: A random secure string
   - `CORS_ORIGIN`: Your frontend URL (from Vercel)
   - `NODE_ENV`: `production`
7. Deploy!

### Frontend Deployment (Vercel)

1. Install Vercel CLI (optional):
```bash
npm i -g vercel
```

2. Deploy via Vercel Dashboard:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Import your GitHub repository
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Add environment variable:
     - `VITE_API_URL`: Your Render backend URL

3. Or deploy via CLI:
```bash
vercel
```

### Update API URL in Frontend

After deploying your backend, update the API URL in your frontend code:

In `frontend/src/api.js`, update the base URL:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
CORS_ORIGIN=your_frontend_url
NODE_ENV=production
```

### Frontend (.env)
```
VITE_API_URL=your_backend_url
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👥 Authors

Your Name - [Your GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- React Documentation
- Express.js
- MongoDB
- TailwindCSS
