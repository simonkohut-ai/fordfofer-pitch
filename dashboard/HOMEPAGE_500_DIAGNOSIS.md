# Homepage 500 Error - Diagnosis & Fix Plan

## Current State
- ✅ `/api/health` → HTTP 200 OK
- ❌ `/` → HTTP 500 `FUNCTION_INVOCATION_FAILED`
- ✅ `home.html` exists in repo
- ✅ `vercel.json` routes `/` → `/home.html`

---

## Ranked Root Causes (Most Likely First)

### 1. **Vercel Route Configuration Issue** (80% likely)
**Problem:** Route with `headers` in `vercel.json` might cause Vercel to process it as a serverless function instead of static file.

**Evidence:**
- Line 213-218 in `vercel.json`: `/` → `/home.html` with `headers` block
- Vercel sometimes treats routes with headers as serverless functions
- Static files shouldn't need explicit route configuration

**Fix:** Remove the route and let Vercel auto-detect `home.html` OR rename to `index.html`

---

### 2. **Static File Not Deployed** (15% likely)
**Problem:** `home.html` exists locally but wasn't included in deployment.

**Evidence:**
- File exists in repo
- But Vercel might not have deployed it

**Fix:** Verify file is in deployment, ensure it's not gitignored

---

### 3. **Catch-All Route Interference** (5% likely)
**Problem:** The `/(.*)` catch-all at line 224 might be matching `/` before the specific route.

**Evidence:**
- Routes are processed in order
- Catch-all is last, so shouldn't interfere
- But Vercel routing can be unpredictable

**Fix:** Ensure specific routes come before catch-all (already correct)

---

## Diagnosis Commands (Run in Order)

### Step 1: Verify Vercel CLI & Project Link
```powershell
cd "C:\Users\simik\Desktop\the most wanted!!!\fordfofer-pitch\dashboard"

# Check CLI version
vercel --version
# Expected: 50.1.0 or similar

# Verify authentication
vercel whoami
# Expected: Your email/username

# Verify project link
vercel link
# Expected: Should show "Existing project" → select "dashboard"
# If it asks to create new, STOP and check .vercel folder

# List environment variables
vercel env ls
# Expected: List of env vars (check if STRIPE_CHECKOUT_URL exists)
```

**Success Criteria:**
- ✅ `vercel whoami` prints your account
- ✅ `vercel link` shows "dashboard" project
- ✅ No errors

---

### Step 2: Check Vercel Logs (CRITICAL)
```powershell
# Get recent logs from production
vercel logs dashboard-9o5iveq3q-golos-projects-e144069f.vercel.app --since 1h

# Or get logs from your project name
vercel logs dashboard --since 1h

# Or follow logs in real-time
vercel logs dashboard --follow
```

**What to Look For:**
- Error messages mentioning `home.html`
- Stack traces showing which function failed
- Import/module errors
- File not found errors

**Success Criteria:**
- ✅ Logs show clear error message
- ✅ Error points to specific file/line

---

### Step 3: Test Routes Directly
```powershell
# Test homepage (should fail)
curl.exe -I https://www.golocapo.com/
# Expected: HTTP/2 500 or HTTP/1.1 500

# Test health endpoint (should work)
curl.exe -I https://www.golocapo.com/api/health
# Expected: HTTP/2 200

# Test pricing page
curl.exe -I https://www.golocapo.com/pricing
# Expected: HTTP/2 200

# Test if home.html is accessible directly
curl.exe -I https://www.golocapo.com/home.html
# Expected: HTTP/2 200 (if accessible) or 404 (if not)
```

**Success Criteria:**
- ✅ `/api/health` → 200
- ✅ `/pricing` → 200
- ✅ `/` → 500 (confirming issue)
- ✅ `/home.html` → 200 or 404 (tells us if file is deployed)

---

### Step 4: Inspect vercel.json Routing
```powershell
# View vercel.json
cat vercel.json | Select-String -Pattern "home.html|index.html|^\s*\"src\":\s*\"/\""

# Check if index.html exists
Test-Path index.html
# Expected: True or False

# Check if home.html exists
Test-Path home.html
# Expected: True
```

**Success Criteria:**
- ✅ `home.html` exists
- ✅ `vercel.json` has route for `/` → `/home.html`

---

## Fastest Path Fix (Prioritize Getting HTTP 200)

### Option A: Rename home.html → index.html (FASTEST - 2 minutes)

**Why:** Vercel automatically serves `index.html` for `/` without route configuration.

**Steps:**
1. Rename `home.html` → `index.html` (backup current `index.html` first if needed)
2. Remove the `/` route from `vercel.json` (lines 213-218)
3. Deploy

**Commands:**
```powershell
cd "C:\Users\simik\Desktop\the most wanted!!!\fordfofer-pitch\dashboard"

# Backup current index.html if it exists
if (Test-Path index.html) {
    Copy-Item index.html index.html.backup
}

# Rename home.html to index.html
Move-Item home.html index.html -Force

# Deploy
vercel deploy --prod --confirm
```

**Success Criteria:**
- ✅ `curl.exe -I https://www.golocapo.com/` → HTTP 200
- ✅ Homepage loads in browser

---

### Option B: Fix vercel.json Route (5 minutes)

**Why:** Remove headers from route to let Vercel serve as static file.

**Steps:**
1. Remove `headers` block from `/` route
2. Ensure route is before catch-all
3. Deploy

**File Change:**
```json
// BEFORE (lines 213-218)
{
  "src": "/",
  "dest": "/home.html",
  "headers": {
    "Cache-Control": "public, max-age=0, must-revalidate"
  }
}

// AFTER
{
  "src": "/",
  "dest": "/home.html"
}
```

**Commands:**
```powershell
cd "C:\Users\simik\Desktop\the most wanted!!!\fordfofer-pitch\dashboard"

# Edit vercel.json (remove headers block from / route)
# Then deploy
vercel deploy --prod --confirm
```

**Success Criteria:**
- ✅ `curl.exe -I https://www.golocapo.com/` → HTTP 200

---

### Option C: Use Rewrites Instead of Routes (10 minutes)

**Why:** Rewrites are more reliable for static files in Vercel.

**File Change:**
```json
// Remove routes section for /, add rewrites section
{
  "rewrites": [
    {
      "source": "/",
      "destination": "/home.html"
    }
  ],
  "routes": [
    // ... keep all other routes, remove the / route
  ]
}
```

---

## Recommended Action Plan

### Immediate (Next 5 minutes):
1. **Run Step 2** (check Vercel logs) - This will tell us the exact error
2. **Run Step 3** (test `/home.html` directly) - Confirms if file is deployed

### Based on Logs:
- **If logs show "file not found"** → File not deployed → Check gitignore, redeploy
- **If logs show "function invocation failed"** → Route config issue → Use Option A (rename to index.html)
- **If logs show import/module error** → Code issue → Fix the import

### Fastest Fix (If logs are unclear):
**Use Option A** - Rename `home.html` → `index.html` and remove route config.

---

## Verification Checklist

After applying fix:

```powershell
# 1. Deploy
vercel deploy --prod --confirm

# 2. Wait 30 seconds for propagation

# 3. Test homepage
curl.exe -I https://www.golocapo.com/
# Expected: HTTP/2 200

# 4. Test in browser
# Open: https://www.golocapo.com/
# Expected: Homepage loads, no errors in console

# 5. Test money path
curl.exe -I https://www.golocapo.com/pricing
# Expected: HTTP/2 200

# 6. Test API
curl.exe -i https://www.golocapo.com/api/health
# Expected: HTTP/2 200
```

---

## What Success Looks Like

✅ **Homepage returns HTTP 200**
✅ **Homepage loads in browser without errors**
✅ **CTA button works** (links to `/pricing`)
✅ **Pricing page redirects to Stripe** (if env var set)
✅ **No console errors in browser**

---

## Next Steps After Fix

1. **Set Stripe Environment Variable:**
   - Vercel Dashboard → Project "dashboard" → Settings → Environment Variables
   - Add: `STRIPE_CHECKOUT_URL` = your Stripe Payment Link
   - Redeploy

2. **Test Money Path:**
   - Homepage → Click CTA → `/pricing` → Stripe checkout
   - Verify end-to-end flow

3. **Send First Outreach:**
   - Once homepage is live, send outreach message

---

## Files to Check/Modify

- `vercel.json` - Route configuration (lines 213-218)
- `home.html` - Homepage file (exists, needs to be served)
- `index.html` - Current index file (might conflict)
- `.vercel/project.json` - Project link configuration

---

**Status:** Ready to diagnose and fix. Start with Step 2 (logs) to get exact error, then apply Option A if logs are unclear.

