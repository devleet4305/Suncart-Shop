# Render Deployment Guide for SunCart Essential Store

## Prerequisites
- A Render account (sign up at https://render.com)
- Your GitHub repository pushed with the latest code

## Deployment Steps

### 1. Push Your Code to GitHub
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Create a New Web Service on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the `suncart-essential-store` repository

### 3. Configure the Web Service

Render will auto-detect your `render.yaml` file, but verify these settings:

- **Name**: `suncart-essential-store` (or your preferred name)
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Plan**: `Free` (or choose a paid plan for better performance)

### 4. Set Environment Variables

In the Render dashboard, add these environment variables:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Copy from your `.env.local` file |
| `BETTER_AUTH_SECRET` | Copy from your `.env.local` file |
| `BETTER_AUTH_URL` | `https://your-app-name.onrender.com` (update after deployment) |
| `NEXT_PUBLIC_APP_URL` | `https://your-app-name.onrender.com` (update after deployment) |
| `GOOGLE_CLIENT_ID` | Copy from your `.env.local` file |
| `GOOGLE_CLIENT_SECRET` | Copy from your `.env.local` file |
| `NODE_VERSION` | `18.17.0` |

**Note**: Never commit your actual secret values to Git. Copy them directly from your local `.env.local` file into Render's dashboard.

**Important**: After your first deployment, you'll get a URL like `https://suncart-essential-store.onrender.com`. Update the `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` environment variables with this URL and redeploy.

### 5. Update Google OAuth Redirect URIs

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **APIs & Services** → **Credentials**
3. Select your OAuth 2.0 Client ID
4. Add these to **Authorized redirect URIs**:
   - `https://your-app-name.onrender.com/api/auth/callback/google`
5. Add to **Authorized JavaScript origins**:
   - `https://your-app-name.onrender.com`

### 6. Deploy

Click **"Create Web Service"** and Render will:
- Clone your repository
- Install dependencies
- Build your Next.js app
- Start the server

## Post-Deployment

### Update Environment Variables
Once you have your Render URL:
1. Update `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` in Render dashboard
2. Trigger a manual redeploy

### Monitor Your App
- View logs in the Render dashboard
- Check the "Events" tab for deployment status
- Monitor performance and errors

## Troubleshooting

### Build Fails
- Check the build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### Authentication Issues
- Verify all environment variables are set correctly
- Check Google OAuth redirect URIs match your Render URL
- Ensure `BETTER_AUTH_URL` matches your actual deployment URL

### Database Connection Issues
- Verify MongoDB URI is correct
- Check MongoDB Atlas network access (allow all IPs: `0.0.0.0/0`)
- Ensure database user has proper permissions

## Free Tier Limitations

Render's free tier:
- Spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month of runtime
- Consider upgrading for production use

## Automatic Deployments

Render automatically deploys when you push to your main branch. To disable:
1. Go to your service settings
2. Under "Auto-Deploy", toggle it off

## Custom Domain (Optional)

1. Go to your service settings
2. Click "Custom Domain"
3. Add your domain and follow DNS configuration instructions

---

**Need Help?** Check [Render's documentation](https://render.com/docs) or their community forum.
