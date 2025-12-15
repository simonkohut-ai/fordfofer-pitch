# 🚀 Deploy Dashboard & p2ba-console from GitHub

Based on your current Vercel deployments, here's how to deploy **both projects separately**:

---

## 📊 Current Situation

You have deployments from the `p2ba` repository, but they're deploying from the root. To deploy **dashboard** and **p2ba-console** separately, you need **two separate Vercel projects** with different **Root Directory** settings.

---

## ✅ Step-by-Step: Deploy Dashboard

### **1. Create New Project for Dashboard**

1. Go to: **https://vercel.com**
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select: **`simonkohut-ai/p2ba`**
5. Click **"Import"**

### **2. Configure Dashboard Project**

**Project Settings:**
- **Project Name**: `ai-studio-dashboard`
- **Framework Preset**: **Other**
- **Root Directory**: `dashboard` ⚠️ **CRITICAL!**
- **Build Command**: Leave empty
- **Output Directory**: Leave empty
- **Install Command**: Leave empty

### **3. Deploy Dashboard**

1. Click **"Deploy"**
2. Wait for deployment (1-2 minutes)
3. After deployment, go to **Settings** → **Environment Variables**
4. Add:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `REMOVED_OPENAI_KEY`
   - **Environments**: ✅ All (Production, Preview, Development)
5. Click **"Save"**
6. Go to **Deployments** → Click **"..."** → **"Redeploy"**

**Dashboard URL**: `https://ai-studio-dashboard-xxxxx.vercel.app`

---

## ✅ Step-by-Step: Deploy p2ba-console

### **1. Create New Project for p2ba-console**

1. Go to: **https://vercel.com**
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select: **`simonkohut-ai/p2ba`**
5. Click **"Import"**

### **2. Configure p2ba-console Project**

**Project Settings:**
- **Project Name**: `p2ba-console` (or `ultimate-p2ba`)
- **Framework Preset**: **Next.js** (auto-detected)
- **Root Directory**: `p2ba-console` ⚠️ **CRITICAL!**
- **Build Command**: 
  ```
  cd ../p2ba-core && npm install && npm run build && cd ../p2ba-console && npm install && npm run build
  ```
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: Leave as default

**⚠️ Note**: The build command needs to build `p2ba-core` first, then `p2ba-console`. Since they're in the same repo, Vercel will handle the paths correctly.

### **3. Deploy p2ba-console**

1. Click **"Deploy"**
2. Wait for deployment (2-3 minutes)
3. After deployment, go to **Settings** → **Environment Variables**
4. Add:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `REMOVED_OPENAI_KEY`
   - **Environments**: ✅ All (Production, Preview, Development)
5. Click **"Save"**
6. Go to **Deployments** → Click **"..."** → **"Redeploy"**

**p2ba-console URL**: `https://p2ba-console-xxxxx.vercel.app`

---

## 🎯 Summary

After completing both deployments, you'll have:

1. **Dashboard Project**
   - URL: `https://ai-studio-dashboard-xxxxx.vercel.app`
   - Root Directory: `dashboard`
   - Framework: Other

2. **p2ba-console Project**
   - URL: `https://p2ba-console-xxxxx.vercel.app`
   - Root Directory: `p2ba-console`
   - Framework: Next.js

---

## 🔍 Important Notes

### **Root Directory is Key!**

When importing from the same GitHub repository:
- **Dashboard**: Set Root Directory to `dashboard`
- **p2ba-console**: Set Root Directory to `p2ba-console`

This tells Vercel which folder to deploy from the same repository.

### **Branch Selection**

- You can deploy from `delete-old-system` branch (where dashboard was pushed)
- Or from `main` branch
- Select the branch when importing the repository

---

## 🚀 Quick Actions

1. **Deploy Dashboard**: Follow steps above with Root Directory = `dashboard`
2. **Deploy p2ba-console**: Follow steps above with Root Directory = `p2ba-console`
3. **Add OpenAI keys** to both projects
4. **Test both URLs**

---

**Ready to deploy both!** 🎉
