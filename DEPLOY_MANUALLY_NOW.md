# 🚀 Deploy Dashboard & p2ba-console - Manual Steps

**Since GitHub is blocking automated pushes, here's the simple manual way:**

---

## ✅ **Deploy Dashboard**

1. **Go to**: https://vercel.com/new
2. **Click**: "Import Git Repository"
3. **Select**: `simonkohut-ai/p2ba`
4. **Configure**:
   - **Project Name**: `ai-studio-dashboard`
   - **Root Directory**: `dashboard` ⚠️ **IMPORTANT!**
   - **Framework**: **Other**
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
5. **Click**: "Deploy"
6. **After deployment**:
   - Go to **Settings** → **Environment Variables**
   - Add: `OPENAI_API_KEY` = (your key from saved answers)
   - **Redeploy**

---

## ✅ **Deploy p2ba-console**

1. **Go to**: https://vercel.com/new
2. **Click**: "Import Git Repository"
3. **Select**: `simonkohut-ai/p2ba` (same repo!)
4. **Configure**:
   - **Project Name**: `p2ba-console`
   - **Root Directory**: `p2ba-console` ⚠️ **IMPORTANT!**
   - **Framework**: **Next.js** (auto-detected)
   - **Build Command**: Leave as default
5. **Click**: "Deploy"
6. **After deployment**:
   - Go to **Settings** → **Environment Variables**
   - Add: `OPENAI_API_KEY` = (your key from saved answers)
   - **Redeploy**

---

## 🎯 **Key Points**

- ✅ Use **same GitHub repo** (`simonkohut-ai/p2ba`) for both
- ✅ Set **different Root Directory** (`dashboard` vs `p2ba-console`)
- ✅ This creates **two separate projects** with their own URLs

---

## 📋 **Your OpenAI Key**

Check `P2BA_DEPLOY_ACTIONS.md` for your saved OpenAI API key.

---

**That's it! Both will be live in minutes!** 🎉
