# 🔧 FIX DASHBOARD - Root Directory Issue

**Problem:** Dashboard showing "Chiara's World" landing page instead of dashboard

**Cause:** Root Directory is set to root instead of `dashboard` folder

**Fix:** Change Root Directory in Vercel settings

---

## ✅ **QUICK FIX (2 minutes)**

### **Step 1: Open Vercel Dashboard**
1. Go to: https://vercel.com/dashboard (already opened)
2. Click on: `ai-studio` project

### **Step 2: Change Root Directory**
1. Click: `Settings` (left sidebar)
2. Click: `General` (under Settings)
3. Scroll down to: `Root Directory` section
4. **Current:** (empty or `/`)
5. **Change to:** `dashboard` ⚠️ **CRITICAL!**
6. Click: `Save`

### **Step 3: Redeploy**
1. Go to: `Deployments` tab (top menu)
2. Find latest deployment
3. Click: `...` (three dots)
4. Click: `Redeploy`
5. Wait 1-2 minutes for deployment

### **Step 4: Test**
1. Open: https://ai-studio-sandy-five.vercel.app
2. **Should now show:** Password prompt
3. **Password:** `moneymachine25`
4. **After login:** Should show dashboard with sidebar

---

## 🎯 **WHAT TO EXPECT**

**Before Fix:**
- Shows "Chiara's World" landing page
- No password prompt
- Wrong content

**After Fix:**
- Shows password prompt first
- After login: Shows dashboard with sidebar
- AI Chat works

---

## ⚠️ **IF ROOT DIRECTORY FIELD NOT VISIBLE**

**Alternative Method:**
1. In Vercel Dashboard → `ai-studio` project
2. Click: `Settings` → `General`
3. Look for: `Build & Development Settings`
4. Find: `Root Directory` field
5. If not visible, try:
   - Click: `Edit` button
   - Look for: `Root Directory` option
   - Set to: `dashboard`

**Or redeploy from GitHub:**
1. Delete current `ai-studio` project (optional)
2. Create new project
3. Import: `simonkohut-ai/p2ba`
4. **Set Root Directory:** `dashboard` ⚠️ **BEFORE deploying**
5. Deploy

---

## 📋 **VERIFICATION**

After fixing:
- [ ] Root Directory = `dashboard`
- [ ] Project redeployed
- [ ] URL shows password prompt
- [ ] Can log in with password
- [ ] Dashboard loads correctly

---

**Fix this now and test!** 🔧
