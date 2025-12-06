# Deploy DWIGHT UX to Vercel

This guide will help you deploy the DWIGHT UX Neural ACO Emergency Response System to Vercel, making it accessible to anyone on the internet!

## Prerequisites

1. **GitHub Account** - Create one at https://github.com
2. **Vercel Account** - Sign up at https://vercel.com (use your GitHub account)
3. **Git installed** - Should already be on your system

## Step 1: Push to GitHub

### Initialize Git Repository (if not already done)

```bash
cd /home/nivetha/dwight_latest
git init
git add .
git commit -m "Initial commit: Y2K-themed emergency evacuation simulation"
```

### Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `dwight-ux` (or whatever you prefer)
3. Description: "Neural ACO Emergency Response System - Y2K Edition"
4. Keep it **Public** (so others can access it)
5. **Do NOT** initialize with README (we already have files)
6. Click "Create repository"

### Push to GitHub

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/dwight-ux.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Website (Easiest)

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Click "Import Git Repository"
4. Select your `dwight-ux` repository
5. Vercel will auto-detect the configuration from `vercel.json`
6. Click **"Deploy"**
7. Wait 1-2 minutes for deployment to complete
8. You'll get a live URL like: `https://dwight-ux.vercel.app`

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
cd /home/nivetha/dwight_latest
vercel --prod
```

## Step 3: Share Your App!

Once deployed, you'll get a URL like:
```
https://dwight-ux-yourname.vercel.app
```

Share this URL with anyone, and they can:
- Access the Y2K-themed interface
- Run the emergency evacuation simulation
- See real-time results from the Neural ACO system

## Project Structure for Vercel

```
dwight_latest/
├── api/
│   └── run_simulation.py      # Serverless function endpoint
├── backend/
│   └── dwight.py               # Core simulation code
├── index.html                  # Main frontend (served at /)
├── style.css                   # Y2K theme styles
├── script.js                   # Frontend logic
├── favicon.svg                 # Icon
├── vercel.json                 # Vercel configuration
└── requirements.txt            # Python dependencies
```

## How It Works on Vercel

1. **Frontend**: Served as static files from the root directory
2. **Backend**: Runs as a serverless function at `/api/run_simulation`
3. **On Each Request**:
   - User clicks "RUN SIMULATION"
   - Frontend calls `/api/run_simulation`
   - Vercel spins up a Python environment
   - Runs the headless simulation (240 steps)
   - Returns JSON results
   - Frontend displays the results

## Environment Variables

The simulation automatically detects Vercel environment and runs in HEADLESS mode (no display/audio).

## Troubleshooting

### Build Fails

- Check that `requirements.txt` is in the root directory
- Ensure `pygame` and `numpy` versions are compatible

### API Returns Errors

- Check Vercel function logs at https://vercel.com/dashboard
- The HEADLESS mode should be auto-detected

### Frontend Can't Reach API

- Ensure `vercel.json` rewrites are correct
- Check browser console for CORS errors

## Updating Your Deployment

Whenever you push to GitHub, Vercel will automatically redeploy:

```bash
git add .
git commit -m "Update: improved Y2K theme"
git push
```

Vercel will rebuild and deploy in ~1 minute!

## Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `dwight.yourdomain.com`)
4. Follow Vercel's DNS instructions

---

## Features Live on Vercel

✅ Y2K purple/cyan themed interface
✅ Neural Predictive ACO (LSTM fire spread prediction)
✅ IoT Sensor Fusion simulation
✅ Reinforcement Learning coordinator
✅ Real-time evacuation simulation
✅ Accessible from anywhere!

Enjoy your live deployment! 🔥🚨💜
