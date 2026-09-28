# Gajendran N.S — Engineering Portfolio

Portfolio of **Gajendran N.S** — Frontend Developer specializing in Angular 21+, React, Web3, DeFi platforms, and high-performance interactive user interfaces.

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start the local Vite development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build locally
npm run preview
```

---

## 📦 How to Push to Your GitHub Repository

### Step 1: Create a new Repository on GitHub
1. Go to [GitHub New Repository](https://github.com/new).
2. Set the repository name to `portfolio` (or `gajendran-portfolio`).
3. Set visibility to **Public** (recommended for portfolios).
4. Leave "Initialize this repository with a README" **unchecked**.
5. Click **Create repository**.

### Step 2: Initialize Git and Push from your terminal
Run the following commands in your project root folder:

```bash
# Initialize git if not already initialized
git init

# Add all files to staging
git add .

# Commit changes
git commit -m "feat: complete animated portfolio with Web3 lab and skills matrix"

# Set default branch to main
git branch -M main

# Link your GitHub remote (replace with your repo URL)
git remote add origin https://github.com/Gajendranns/portfolio.git

# Push code to GitHub
git push -u origin main
```

---

## ⚡ How to Deploy on Vercel (1-Click Setup)

The repository comes pre-configured with `vercel.json` for seamless zero-configuration deployments.

### Option A: Using the Vercel Web Dashboard (Recommended)
1. Navigate to [vercel.com](https://vercel.com) and log in with your **GitHub account**.
2. Click **"Add New..."** → **"Project"**.
3. Select your newly pushed `portfolio` repository from the list and click **Import**.
4. Configure the Project Settings (Vercel auto-detects these via `vercel.json`):
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.
6. In ~30 seconds, your site will be live with a free SSL certificate (e.g. `https://gajendran-portfolio.vercel.app`)!

### Option B: Using the Vercel CLI
If you prefer deploying directly from your terminal:

```bash
# Install Vercel CLI globally
npm i -g vercel

# Run deployment
vercel

# Deploy to production
vercel --prod
```

---

## 🛠 Tech Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (`motion/react`)
- **Charts & Data**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel (`vercel.json`)
