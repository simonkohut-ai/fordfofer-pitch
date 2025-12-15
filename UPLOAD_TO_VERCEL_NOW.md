# 🚀 Upload to Vercel - Quick Steps

Your zip files are ready on the desktop! Follow these steps:

---

## **Step 1: Go to Vercel**

1. Open your browser
2. Go to: **https://vercel.com**
3. **Log in** with: `simonkohut21-4119`

---

## **Step 2: Deploy Dashboard**

1. Click **"Add New..."** → **"Project"**
2. Click **"Browse"** or drag & drop `dashboard.zip` from your desktop
3. **Project Name**: `ai-studio-dashboard`
4. **Framework Preset**: Select **"Other"**
5. **Root Directory**: Leave empty
6. **Build Command**: Leave empty
7. **Output Directory**: Leave empty
8. Click **"Deploy"**
9. Wait for deployment to complete (1-2 minutes)

---

## **Step 3: Add OpenAI Key to Dashboard**

After dashboard deployment:

1. In your project, click **"Settings"** tab
2. Click **"Environment Variables"** (left menu)
3. Click **"Add New"**
4. Fill in:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `YOUR_OPENAI_API_KEY_HERE` (add your OpenAI API key)
   - **Environments**: ✅ Check all (Production, Preview, Development)
5. Click **"Save"**
6. Go to **"Deployments"** tab
7. Click **"..."** on the latest deployment → **"Redeploy"**

---

## **Step 4: Deploy p2ba-console**

1. Go back to Vercel dashboard (click logo)
2. Click **"Add New..."** → **"Project"**
3. Click **"Browse"** or drag & drop `p2ba-console.zip` from your desktop
4. **Project Name**: `p2ba-console` (or `ultimate-p2ba`)
5. **Framework Preset**: Select **"Next.js"** (should auto-detect)
6. **Root Directory**: Leave empty
7. **Build Command**: Leave as default
8. **Output Directory**: Leave as default
9. Click **"Deploy"**
10. Wait for deployment to complete (2-3 minutes)

---

## **Step 5: Add OpenAI Key to p2ba-console**

After p2ba-console deployment:

1. In your project, click **"Settings"** tab
2. Click **"Environment Variables"** (left menu)
3. Click **"Add New"**
4. Fill in:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `YOUR_OPENAI_API_KEY_HERE` (add your OpenAI API key)
   - **Environments**: ✅ Check all (Production, Preview, Development)
5. Click **"Save"**
6. Go to **"Deployments"** tab
7. Click **"..."** on the latest deployment → **"Redeploy"**

---

## **Step 6: Get Your URLs**

After both deployments complete:

1. **Dashboard URL**: Click on `ai-studio-dashboard` project → Click **"Visit"** button
   - Copy the URL (looks like: `https://ai-studio-dashboard-xxxxx.vercel.app`)

2. **p2ba-console URL**: Click on `p2ba-console` project → Click **"Visit"** button
   - Copy the URL (looks like: `https://p2ba-console-xxxxx.vercel.app`)

---

## **Step 7: Test**

- Open Dashboard URL → Test the AI chat interface
- Open p2ba-console URL → Test the prompt-to-business automation

---

## ✅ **Done!**

Your projects are now live! 🎉

Save both URLs somewhere safe - you'll need them for marketing and sharing.
