#!/bin/bash

echo "🚀 DWIGHT UX - Push to GitHub & Deploy to Vercel"
echo "================================================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Y2K-themed emergency evacuation simulation with Neural ACO

Features:
- Neural Predictive ACO (LSTM + pheromones)
- IoT Sensor Fusion with Kalman filtering
- RL-based Evacuation Coordinator
- Y2K purple/cyan themed interface
- Vercel-ready deployment"
fi

echo ""
echo "📝 Please enter your GitHub username:"
read github_username

echo ""
echo "📝 Please enter your repository name (default: dwight-ux):"
read repo_name
repo_name=${repo_name:-dwight-ux}

echo ""
echo "🔗 Setting up remote..."
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/$github_username/$repo_name.git"

echo ""
echo "📤 Pushing to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Done! Your code is now on GitHub:"
echo "   https://github.com/$github_username/$repo_name"
echo ""
echo "🌐 Next steps to deploy to Vercel:"
echo "   1. Go to https://vercel.com"
echo "   2. Click 'Add New...' → 'Project'"
echo "   3. Import your GitHub repository"
echo "   4. Click 'Deploy'"
echo "   5. Wait ~1 minute"
echo "   6. Get your live URL!"
echo ""
echo "📖 For detailed instructions, see DEPLOY_TO_VERCEL.md"
