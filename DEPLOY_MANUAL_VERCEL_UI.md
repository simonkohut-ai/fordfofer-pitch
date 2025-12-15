# 🚀 Deploy Manually via Vercel Web UI

Simple step-by-step guide to deploy your projects using Vercel's website (no CLI needed).

---

## 📋 **Project 1: Dashboard**

### **Step 1: Prepare Dashboard for Upload**
1. Open File Explorer
2. Navigate to: `c:\Users\simik\Desktop\the most wanted!!!\fordfofer-pitch\dashboard`
3. **Select ALL files** in this folder (Ctrl+A)
4. **Right-click** → **Send to** → **Compressed (zipped) folder**
5. Name it: `dashboard.zip`
6. Remember where you saved it

### **Step 2: Deploy Dashboard on Vercel**
1. Go to: **https://vercel.com**
2. **Log in** with your account: `simonkohut21-4119`
3. Click **"Add New..."** → **"Project"**
4. Click **"Browse"** or drag & drop your `dashboard.zip` file
5. **Project Name**: `ai-studio-dashboard` (or any name you want)
6. **Framework Preset**: Select **"Other"** (it's a static site with API routes)
7. **Root Directory**: Leave empty (or type `./` if needed)
8. **Build Command**: Leave empty
9. **Output Directory**: Leave empty
10. Click **"Deploy"**

### **Step 3: Add Environment Variables (Dashboard)**
After deployment:
1. Go to your project dashboard on Vercel
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in the left menu
4. Click **"Add New"**
5. Add:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (starts with `sk-...`)
   - **Environments**: Check all (Production, Preview, Development)
6. Click **"Save"**
7. Go to **"Deployments"** tab → Click **"..."** on latest deployment → **"Redeploy"**

---

## 📋 **Project 2: p2ba-console (Ultimate P2BA Tool)**

### **Step 1: Prepare p2ba-console for Upload**
1. Open File Explorer
2. Navigate to: `c:\Users\simik\Desktop\the most wanted!!!\fordfofer-pitch\p2ba-console`
3. **Select ALL files** in this folder (Ctrl+A)
4. **Right-click** → **Send to** → **Compressed (zipped) folder**
5. Name it: `p2ba-console.zip`
6. Remember where you saved it

### **Step 2: Deploy p2ba-console on Vercel**
1. Go to: **https://vercel.com**
2. Click **"Add New..."** → **"Project"**
3. Click **"Browse"** or drag & drop your `p2ba-console.zip` file
4. **Project Name**: `p2ba-console` (or `ultimate-p2ba`)
5. **Framework Preset**: Select **"Next.js"** (it's a Next.js app)
6. **Root Directory**: Leave empty
7. **Build Command**: Leave as default (Vercel will auto-detect)
8. **Output Directory**: Leave as default
9. Click **"Deploy"**

### **Step 3: Add Environment Variables (p2ba-console)**
After deployment:
1. Go to your project dashboard on Vercel
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in the left menu
4. Click **"Add New"**
5. Add:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (starts with `sk-...`)
   - **Environments**: Check all (Production, Preview, Development)
6. Click **"Save"**
7. Go to **"Deployments"** tab → Click **"..."** on latest deployment → **"Redeploy"**

---

## ✅ **After Deployment**

### **Get Your URLs**
1. After deployment completes, you'll see:
   - **Dashboard URL**: `https://ai-studio-dashboard-xxxxx.vercel.app`
   - **p2ba-console URL**: `https://p2ba-console-xxxxx.vercel.app`
2. Click the **"Visit"** button to open your live site
3. Copy the URLs and save them

### **Test Your Deployments**
- **Dashboard**: Visit the URL and test the AI chat interface
- **p2ba-console**: Visit the URL and test the prompt-to-business automation

---

## 🔧 **Troubleshooting**

### **If deployment fails:**
1. Check the **"Deployments"** tab → Click on the failed deployment
2. Read the error logs
3. Common issues:
   - **Missing dependencies**: Make sure `package.json` has all required packages
   - **Build errors**: Check if there are syntax errors in your code
   - **Environment variables**: Make sure you added `OPENAI_API_KEY`

### **If you need to update:**
1. Make changes to your files locally
2. Create a new zip file
3. Go to Vercel → Your project → **"Deployments"** → **"Redeploy"**
4. Or upload the new zip file again

---

## 📝 **Quick Checklist**

- [ ] Dashboard folder zipped
- [ ] Dashboard deployed on Vercel
- [ ] `OPENAI_API_KEY` added to dashboard project
- [ ] Dashboard redeployed with environment variables
- [ ] p2ba-console folder zipped
- [ ] p2ba-console deployed on Vercel
- [ ] `OPENAI_API_KEY` added to p2ba-console project
- [ ] p2ba-console redeployed with environment variables
- [ ] Both URLs saved and tested

---

**🎉 Done! Your projects are now live on Vercel!**
