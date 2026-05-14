# Netlify Deployment Guide for SunCart Essential Store

## Prerequisites
- A Netlify account (sign up at https://netlify.com)
- Your GitHub repository with the latest code

## Deployment Steps

### Method 1: Deploy via Netlify Dashboard (Recommended)

#### 1. Push Your Code to GitHub
```bash
git add .
git commit -m "Add Netlify configuration"
git push origin main
```

#### 2. Import Your Project to Netlify

1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub account
5. Select your repository: `RAYHAN-HEXA/Summer-Cart-Shop`

#### 3. Configure Build Settings

Netlify will auto-detect your `netlify.toml`, but verify:

- **Branch to deploy**: `main`
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Functions directory**: (leave empty, handled by plugin)

#### 4. Add Environment Variables

Click **"Add environment variables"** and add these:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Copy from your `.env.local` file |
| `BETTER_AUTH_SECRET` | Copy from your `.env.local` file |
| `GOOGLE_CLIENT_ID` | Copy from your `.env.local` file |
| `GOOGLE_CLIENT_SECRET` | Copy from your `.env.local` file |
| `NODE_VERSION` | `18.17.0` |

**Leave these blank for now** (update after first deployment):
- `BETTER_AUTH_URL`
- `NEXT_PUBLIC_APP_URL`

**Note**: Never commit actual secret values to Git. Copy them from your local `.env.local` file.

#### 5. Deploy

1. Click **"Deploy [your-site-name]"**
2. Wait for the build to complete (5-10 minutes)
3. You'll get a URL like `https://your-site-name.netlify.app`

#### 6. Update Environment Variables After Deployment

Once deployed:
1. Go to **Site settings** → **Environment variables**
2. Update these variables with your actual Netlify URL:
   - `BETTER_AUTH_URL` → `https://your-site-name.netlify.app`
   - `NEXT_PUBLIC_APP_URL` → `https://your-site-name.netlify.app`
3. Go to **Deploys** → **Trigger deploy** → **Deploy site**

### Method 2: Deploy via Netlify CLI

#### 1. Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### 2. Login to Netlify
```bash
netlify login
```

#### 3. Initialize Your Site
```bash
netlify init
```

Follow the prompts:
- **Create & configure a new site**
- Choose your team
- Enter a site name (or leave blank for random)
- Build command: `npm run build`
- Publish directory: `.next`

#### 4. Set Environment Variables
```bash
netlify env:set MONGODB_URI "your-mongodb-uri"
netlify env:set BETTER_AUTH_SECRET "your-secret"
netlify env:set GOOGLE_CLIENT_ID "your-client-id"
netlify env:set GOOGLE_CLIENT_SECRET "your-client-secret"
netlify env:set NODE_VERSION "18.17.0"
```

#### 5. Deploy
```bash
netlify deploy --prod
```

## Post-Deployment Configuration

### 1. Update Google OAuth Settings

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **APIs & Services** → **Credentials**
3. Select your OAuth 2.0 Client ID
4. Add to **Authorized redirect URIs**:
   - `https://your-site-name.netlify.app/api/auth/callback/google`
5. Add to **Authorized JavaScript origins**:
   - `https://your-site-name.netlify.app`
6. Click **Save**

### 2. Update Environment Variables

In Netlify dashboard:
1. Go to **Site settings** → **Environment variables**
2. Update:
   - `BETTER_AUTH_URL` → `https://your-site-name.netlify.app`
   - `NEXT_PUBLIC_APP_URL` → `https://your-site-name.netlify.app`
3. Redeploy the site

### 3. Configure MongoDB Atlas Network Access

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Navigate to **Network Access**
3. Click **Add IP Address**
4. Select **Allow Access from Anywhere** (`0.0.0.0/0`)
5. Click **Confirm**

## Custom Domain (Optional)

### Add a Custom Domain

1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter your domain name
4. Follow DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)

### Enable HTTPS

Netlify automatically provisions SSL certificates for custom domains.

## Automatic Deployments

Netlify automatically deploys when you push to your main branch.

To configure:
1. Go to **Site settings** → **Build & deploy**
2. Under **Continuous deployment**, manage branch deploys
3. You can enable/disable auto-publishing

## Troubleshooting

### Build Fails

**Check build logs:**
1. Go to **Deploys** tab
2. Click on the failed deploy
3. Review the build log

**Common issues:**
- Missing dependencies in `package.json`
- Node version mismatch (ensure `NODE_VERSION=18.17.0`)
- Build command errors

### Authentication Issues

**Symptoms:**
- Login redirects fail
- "Invalid redirect URI" errors

**Solutions:**
1. Verify `BETTER_AUTH_URL` matches your Netlify URL exactly
2. Check Google OAuth redirect URIs include your Netlify URL
3. Ensure no trailing slashes in URLs
4. Redeploy after updating environment variables

### Database Connection Issues

**Symptoms:**
- "MongoServerError: bad auth"
- Connection timeout errors

**Solutions:**
1. Verify `MONGODB_URI` is correct
2. Check MongoDB Atlas network access allows `0.0.0.0/0`
3. Ensure database user has proper permissions
4. Test connection string locally first

### Functions Timeout

**Symptoms:**
- "Function execution timed out"

**Solutions:**
1. Optimize database queries
2. Add indexes to MongoDB collections
3. Consider upgrading to a paid Netlify plan (longer timeout limits)

### Environment Variables Not Working

**Symptoms:**
- Variables are undefined in the app

**Solutions:**
1. Ensure variables starting with `NEXT_PUBLIC_` for client-side access
2. Redeploy after adding/updating variables
3. Clear build cache: **Site settings** → **Build & deploy** → **Clear cache and retry deploy**

## Performance Optimization

### Enable Netlify Edge Functions (Optional)

For better performance, consider using Netlify Edge Functions for API routes.

### Image Optimization

Next.js Image component works automatically with Netlify's image CDN.

### Caching

Netlify automatically caches static assets. Configure cache headers in `netlify.toml` if needed.

## Monitoring

### View Logs

1. Go to **Functions** tab
2. Click on a function to view logs
3. Use Netlify's real-time log streaming

### Analytics (Paid Feature)

Enable Netlify Analytics for:
- Page views
- Unique visitors
- Top pages
- Bandwidth usage

## Free Tier Limitations

Netlify's free tier includes:
- 100GB bandwidth/month
- 300 build minutes/month
- Automatic HTTPS
- Continuous deployment
- Serverless functions (125k requests/month)

For production apps with high traffic, consider upgrading.

## Useful Commands

```bash
# View site info
netlify status

# Open site in browser
netlify open

# View site logs
netlify logs

# Link local repo to Netlify site
netlify link

# Run build locally
netlify build

# Test functions locally
netlify dev
```

## Support

- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Community Forum](https://answers.netlify.com)
- [Next.js on Netlify Guide](https://docs.netlify.com/integrations/frameworks/next-js/)

---

**Ready to deploy?** Follow the steps above and your app will be live in minutes!
