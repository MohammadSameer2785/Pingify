# Pingify Deployment Guide

This guide will help you deploy the Pingify application to production using:
- **Frontend**: Vercel
- **Backend**: Render

## Prerequisites

- GitHub account with the project pushed to a repository
- MongoDB Atlas account (for database)
- Cloudinary account (for image uploads)
- Resend account (for emails)
- Arcjet account (optional, for security)

## Step 1: Deploy Backend to Render

### 1.1 Prepare MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with username and password
4. Whitelist IP addresses (use `0.0.0.0/0` for Render)
5. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0`

### 1.2 Get Cloudinary Credentials
1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up and get:
   - Cloud Name
   - API Key
   - API Secret

### 1.3 Get Resend API Key
1. Go to [Resend](https://resend.com/)
2. Sign up and get your API key

### 1.4 Deploy to Render
1. Go to [Render](https://render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the `backend` folder or configure root directory as `backend`
5. Configure:
   - **Name**: pingify-backend
   - **Region**: Choose nearest region
   - **Branch**: main
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`
6. Add Environment Variables:
   ```
   PORT=3000
   NODE_ENV=production
   MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/?appName=Cluster0
   JWT_SECRET=your-random-secret-key
   RESEND_API_KEY=re_your-api-key
   EMAIL_FROM="onboarding@resend.dev"
   EMAIL_FROM_NAME="Your Name"
   CLIENT_URL=https://your-frontend-url.vercel.app
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ARCJET_KEY=ajkey_your-key (optional)
   ARCJET_ENV=production
   ```
7. Click "Deploy Web Service"
8. Wait for deployment and note your backend URL: `https://pingify-backend.onrender.com`

## Step 2: Deploy Frontend to Vercel

### 2.1 Deploy to Vercel
1. Go to [Vercel](https://vercel.com/)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables:
   ```
   VITE_API_URL=https://pingify-backend.onrender.com/api
   ```
6. Click "Deploy"
7. Wait for deployment and note your frontend URL: `https://pingify.vercel.app`

### 2.2 Update Backend CLIENT_URL
1. Go back to Render dashboard
2. Open your backend service
3. Go to "Environment" section
4. Update `CLIENT_URL` to your Vercel frontend URL
5. Save changes (this will trigger a redeploy)

## Step 3: Final Configuration

### 3.1 Update CORS (if needed)
If you encounter CORS issues, ensure:
- Backend `CLIENT_URL` matches your Vercel frontend URL exactly
- Frontend `VITE_API_URL` matches your Render backend URL exactly

### 3.2 Test the Application
1. Open your Vercel frontend URL
2. Try signing up a new user
3. Try logging in
4. Test messaging functionality (need 2 users)

## Troubleshooting

### Backend Issues
- **Database connection error**: Check MongoDB URI and IP whitelist
- **Port issues**: Render automatically assigns ports use `process.env.PORT`
- **Build fails**: Check Node.js version compatibility

### Frontend Issues
- **API calls failing**: Check `VITE_API_URL` environment variable
- **Socket.IO connection issues**: Ensure backend URL is correct without `/api`
- **CORS errors**: Verify CLIENT_URL in backend matches frontend URL

### Common Issues
- **Cookie not set**: Ensure both frontend and backend use HTTPS in production
- **Socket.IO not connecting**: Check that backend URL in useAuthStore.js is correct
- **Image upload failing**: Verify Cloudinary credentials

## Environment Variables Reference

### Backend (.env)
```
PORT=3000
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0
JWT_SECRET=random-secret-string
RESEND_API_KEY=re_xxxxxxxxx
EMAIL_FROM="onboarding@resend.dev"
EMAIL_FROM_NAME="Your Name"
CLIENT_URL=https://your-frontend.vercel.app
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=abcdef123456
ARCJET_KEY=ajkey_xxxxxxxxx (optional)
ARCJET_ENV=production
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend.onrender.com/api
```

## Deployment Architecture

```
User Browser
    ↓
Vercel (Frontend - React/Vite)
    ↓ API Calls
Render (Backend - Node.js/Express)
    ↓
MongoDB Atlas (Database)
    ↓
Cloudinary (Image Storage)
```

## Cost Summary

- **Vercel**: Free tier available
- **Render**: Free tier available (with spin-up delay)
- **MongoDB Atlas**: Free tier available (512MB)
- **Cloudinary**: Free tier available
- **Resend**: Free tier available (3000 emails/day)

## Security Notes

- Never commit `.env` files to Git
- Use strong JWT secrets
- Enable MongoDB IP whitelisting
- Use HTTPS in production
- Rotate API keys periodically
