# 🚀 Deployment Guide - FlexCore

This guide will help you deploy your FlexCore application and create a live link on GitHub.

## Prerequisites

1. **GitHub Account** - [Sign up](https://github.com)
2. **MongoDB Atlas Account** (for cloud database) - [Sign up](https://www.mongodb.com/cloud/atlas)
3. **Render Account** (for backend) - [Sign up](https://render.com)
4. **Vercel Account** (for frontend) - [Sign up](https://vercel.com)

## Step 1: Set Up MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (Free M0 tier)
3. Create a database user with username and password
4. Whitelist IP address: `0.0.0.0/0` (allow from anywhere)
5. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/flexcore?retryWrites=true&w=majority`

## Step 2: Push Code to GitHub

1. Initialize git repository (if not already):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Create repository (e.g., "flexcore-app")
   - Don't initialize with README (you already have one)

3. Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/flexcore-app.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub account and select your repository
4. Configure the service:
   - **Name**: `flexcore-backend` (or any name)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Add Environment Variables (click "Add Environment Variable"):
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
   - `MONGO_URI` = `your_mongodb_atlas_connection_string`
   - `SESSION_SECRET` = `generate_random_string_here` (e.g., use password generator)
   - `CORS_ORIGIN` = `*` (will update after frontend deployment)

6. Click "Create Web Service"
7. Wait for deployment to complete (5-10 minutes)
8. Copy your backend URL (e.g., `https://flexcore-backend.onrender.com`)

## Step 4: Deploy Frontend to Vercel

### Option A: Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - **Name**: `VITE_API_URL`
   - **Value**: Your Render backend URL (e.g., `https://flexcore-backend.onrender.com`)
6. Click "Deploy"
7. Wait for deployment (2-5 minutes)
8. Copy your frontend URL (e.g., `https://flexcore-app.vercel.app`)

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend directory
cd frontend

# Deploy
vercel

# Follow the prompts:
# Set up and deploy? Yes
# Which scope? Your account
# Link to existing project? No
# Project name? flexcore-app
# Directory? ./
# Override settings? Yes
# Build Command? npm run build
# Output Directory? dist
# Development Command? npm run dev
```

After deployment, add environment variable:
```bash
vercel env add VITE_API_URL
# Enter your Render backend URL
```

Then redeploy:
```bash
vercel --prod
```

## Step 5: Update CORS Settings

1. Go back to Render Dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Update `CORS_ORIGIN` variable:
   - **Value**: Your Vercel frontend URL (e.g., `https://flexcore-app.vercel.app`)
5. Save changes (this will trigger a redeploy)

## Step 6: Test Your Application

1. Visit your frontend URL
2. Try creating an account
3. Test all features
4. Check if API calls are working

## Step 7: Add Live Links to GitHub

1. Go to your GitHub repository
2. Click "Settings" → "General"
3. In "About" section (right sidebar), click the gear icon
4. Add:
   - **Website**: Your Vercel URL
   - **Description**: "Full-stack workout tracking application"
   - **Topics**: `react`, `nodejs`, `mongodb`, `vite`, `express`
5. Save changes

6. Update your README.md with the live links:
```bash
git pull origin main
# Edit README.md and update the Live Demo section
git add README.md
git commit -m "Add live demo links"
git push origin main
```

## 📍 Your Live Links

After deployment, your links will be:

- **Frontend**: `https://YOUR-PROJECT-NAME.vercel.app`
- **Backend API**: `https://YOUR-SERVICE-NAME.onrender.com`
- **GitHub Repo**: `https://github.com/YOUR-USERNAME/flexcore-app`

## 🔧 Troubleshooting

### Backend Issues

**Problem**: 503 Service Unavailable
- **Solution**: Wait 30-60 seconds. Render free tier spins down after inactivity.

**Problem**: Database connection error
- **Solution**: Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`

**Problem**: CORS errors
- **Solution**: Ensure `CORS_ORIGIN` in Render matches your Vercel URL exactly

### Frontend Issues

**Problem**: API calls fail
- **Solution**: Check `VITE_API_URL` environment variable in Vercel

**Problem**: Build fails
- **Solution**: Ensure all dependencies are in `package.json`

**Problem**: 404 on page refresh
- **Solution**: Already configured in `vercel.json` redirects

## 🔄 Continuous Deployment

Both Render and Vercel support automatic deployments:

- **Render**: Auto-deploys on push to `main` branch (backend)
- **Vercel**: Auto-deploys on push to any branch (frontend)

To deploy changes:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

## 💰 Pricing Notes

- **MongoDB Atlas**: Free tier (M0) - 512MB storage
- **Render**: Free tier - Spins down after 15 min inactivity
- **Vercel**: Free tier - Unlimited bandwidth for personal projects

**Note**: Free tier backend on Render will spin down after inactivity and take 30-60 seconds to wake up on first request.

## 🎉 Success!

Your application is now live! Share your links:
- Add them to your resume
- Share on social media
- Include in your portfolio

## Need Help?

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
