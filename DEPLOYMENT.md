# Sacred Temples - Deployment Guide

## Vercel Deployment with GitHub Actions

This guide helps you deploy the Sacred Temples application to Vercel with automated CI/CD using GitHub Actions.

### Prerequisites
- GitHub account and repository
- Vercel account (free tier available)
- Access to Firebase configuration credentials

### Step 1: Create Vercel Account & Project

1. **Sign up at [vercel.com](https://vercel.com)** (free tier is sufficient)
2. **Connect your GitHub account**
   - Click "Settings" → "Connected Integrations"
   - Authorize Vercel to access your GitHub repositories

3. **Create a new project**
   - Click "New Project"
   - Select your GitHub repository (Sacred-Temples)
   - Vercel will auto-detect Vite configuration

### Step 2: Configure Environment Variables on Vercel

After creating the project on Vercel:

1. Go to your project's **Settings** → **Environment Variables**
2. Add the following environment variables:

| Variable Name | Value |
|---|---|
| `VITE_FIREBASE_API_KEY` | Your Firebase API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | `sacred-temples.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `sacred-temples` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `sacred-temples.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `756850869278` |
| `VITE_FIREBASE_APP_ID` | `1:756850869278:web:656eb42906c888ad309a0f` |
| `VITE_FIREBASE_MEASUREMENT_ID` | `G-YMBPSQ532K` |

3. Set the environments for:
   - **Production** - Applied to `main` branch
   - **Preview** - Applied to PR branches

### Step 3: Set Up GitHub Actions Secrets

The GitHub Actions workflow needs these secrets to deploy:

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Add these secrets:

| Secret Name | Where to Get |
|---|---|
| `VERCEL_TOKEN` | Vercel Dashboard → Settings → Tokens → Create new |
| `VERCEL_ORG_ID` | Vercel Dashboard → Settings → General (copy Project ID from URL) |
| `VERCEL_PROJECT_ID` | Vercel Dashboard → Settings → General (Project ID) |
| `VITE_FIREBASE_API_KEY` | Your Firebase Console |
| `VITE_FIREBASE_AUTH_DOMAIN` | `sacred-temples.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `sacred-temples` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `sacred-temples.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `756850869278` |
| `VITE_FIREBASE_APP_ID` | `1:756850869278:web:656eb42906c888ad309a0f` |
| `VITE_FIREBASE_MEASUREMENT_ID` | `G-YMBPSQ532K` |

### Step 4: What the Workflow Does

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:

✅ **On Pull Request**: Creates a preview deployment
- Builds the project
- Deploys to a temporary Vercel URL
- Great for testing before merging

✅ **On Push to Main**: Deploys to production
- Builds the project with environment variables
- Deploys to your production domain
- Updates your Vercel project

### Step 5: Deploy!

The workflow triggers automatically when you:

1. **Create a Pull Request** → Preview deployment created
2. **Push to main branch** → Production deployment

You'll see deployment status in your GitHub PR/commit.

### Vercel Dashboard

To monitor deployments:
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your "sacred-temples" project
3. View deployment history and logs
4. Manage custom domains and SSL

### Custom Domain (Optional)

1. In Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions
4. DNS propagation takes 24-48 hours

### Troubleshooting

**Build fails with Firebase errors:**
- Ensure all `VITE_*` environment variables are set in both Vercel and GitHub Secrets
- Check that Firebase project is active

**Deployment succeeds but app shows blank:**
- Check browser console for errors
- Verify Firebase configuration is correct
- Ensure Cloudinary API keys are accessible

**Preview deployments not created:**
- Verify `VERCEL_TOKEN` is valid
- Check GitHub Actions logs in your repo

### Rollback to Previous Deployment

If something goes wrong:
1. Go to Vercel Dashboard → Deployments
2. Click the previous working deployment
3. Click "Promote to Production"

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **Vite Docs**: https://vitejs.dev/
