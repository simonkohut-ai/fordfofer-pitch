# 🔧 FIX /prelaunch 404 – CEO Priority #1

**Problem:** `/prelaunch` returns `NOT_FOUND` (404)  
**Root Cause:** Vercel Root Directory setting is wrong  
**Fix Time:** 10 minutes

---

## ✅ DIAGNOSTIC (Run First)

```powershell
curl.exe -I https://www.golocapo.com/prelaunch
```

**Expected:** `200 OK`  
**Current:** `404 NOT_FOUND` or `NOT_FOUND`

---

## 🔧 FIX IN VERCEL UI (Do This Exactly)

### Step 1: Open Vercel Dashboard
1. Go to: https://vercel.com/dashboard
2. Find project with domain: **`www.golocapo.com`**
3. Click on that project

### Step 2: Check Root Directory
1. Click: **Settings** (left sidebar)
2. Click: **General** (under Settings)
3. Scroll to: **Root Directory** section
4. **Check current value:**
   - ✅ **CORRECT:** Empty or `/` (root)
   - ❌ **WRONG:** `dashboard` or `dashboard/`

### Step 3: Fix Root Directory
**If Root Directory is set to `dashboard` or `dashboard/`:**

1. Click **Edit** (or pencil icon) next to Root Directory
2. **Clear the field** (make it empty)
3. Click **Save**

**Why:** Your `vercel.json` already routes `/prelaunch` → `/dashboard/prelaunch.html`. If Root Directory is `dashboard/`, Vercel looks for `/dashboard/dashboard/prelaunch.html` which doesn't exist.

### Step 4: Redeploy
1. Go to: **Deployments** tab (top menu)
2. Find latest deployment
3. Click: **...** (three dots)
4. Click: **Redeploy**
5. Wait 1-2 minutes for deployment to complete

### Step 5: Verify Fix
```powershell
curl.exe -I https://www.golocapo.com/prelaunch
```

**Expected:** `HTTP/2 200` or `HTTP/1.1 200 OK`

---

## 🎯 WHAT TO EXPECT

### Before Fix:
- `/` → Works (200)
- `/prelaunch` → 404 NOT_FOUND
- `/pricing` → May work or 404

### After Fix:
- `/` → Works (200)
- `/prelaunch` → **200 OK** ✅
- `/pricing` → Works (200)
- `/api/health` → Works (200)

---

## ⚠️ IF ROOT DIRECTORY FIELD NOT VISIBLE

**Alternative Method:**

1. Vercel Dashboard → Your Project
2. Settings → General
3. Look for: **Build & Development Settings**
4. Expand that section
5. Find: **Root Directory** field
6. Set to: **Empty** (or `/`)
7. Save → Redeploy

---

## 🚨 HARD STOP RULE

**Do NOT promote until `/prelaunch` returns 200.**

Test with:
```powershell
curl.exe -I https://www.golocapo.com/prelaunch
```

**Only proceed to Stripe setup when this returns 200.**

---

## 📋 CHECKLIST

- [ ] Opened Vercel Dashboard
- [ ] Found project with `www.golocapo.com` domain
- [ ] Checked Root Directory setting
- [ ] Set Root Directory to empty (or `/`)
- [ ] Saved changes
- [ ] Redeployed project
- [ ] Verified `/prelaunch` returns 200
- [ ] Confirmed form loads and submits

---

**Once `/prelaunch` returns 200, proceed to Stripe setup.** ✅

