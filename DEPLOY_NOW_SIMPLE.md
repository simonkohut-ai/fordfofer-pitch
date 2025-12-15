# 🚀 Deploy Dashboard & p2ba-console - Simple Guide

**Your code is ready! Deploy both projects:**

---

## ✅ **Step 1: Deploy Dashboard**

1. Go to: **https://vercel.com/new**
2. Click **"Import Git Repository"**
3. Select: **`simonkohut-ai/p2ba`**
4. Configure:
   - **Project Name**: `ai-studio-dashboard`
   - **Root Directory**: `dashboard`
   - **Framework**: **Other**
5. Click **"Deploy"**
6. After deployment: **Settings** → **Environment Variables** → Add `OPENAI_API_KEY`

---

## ✅ **Step 2: Deploy p2ba-console**

1. Go to: **https://vercel.com/new**
2. Click **"Import Git Repository"**
3. Select: **`simonkohut-ai/p2ba`** (same repo)
4. Configure:
   - **Project Name**: `p2ba-console`
   - **Root Directory**: `p2ba-console`
   - **Framework**: **Next.js** (auto-detected)
5. Click **"Deploy"**
6. After deployment: **Settings** → **Environment Variables** → Add `OPENAI_API_KEY`

---

## 🔑 **Add OpenAI Key**

For both projects:
- **Name**: `OPENAI_API_KEY`
- **Value**: Use the key from your saved answers
- **Environments**: ✅ All (Production, Preview, Development)

---

**That's it! Both projects will be live!** 🎉
