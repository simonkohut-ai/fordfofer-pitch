# Vercel UI: Force Static Deployment (Fix 500 Error)

## Problem
- `www.golocapo.com` returns HTTP 500
- Vercel logs show `server.js` syntax error
- Framework Preset is set to "Express" (treating as Node server)
- Need to force static file serving

## Solution
Change Vercel project settings to treat as static site (no build, no server).

---

## STEP-BY-STEP UI PLAN

### Part 1: Change Build Settings

#### Step 1: Navigate to Project Settings
1. Go to: https://vercel.com/dashboard
2. Click project: **dashboard**
3. Click: **Settings** (left sidebar)
4. Click: **Build and Deployment** (in settings menu)

**Expected:** You see "Framework Preset: Express" and build configuration options.

---

#### Step 2: Change Framework Preset
1. Find section: **Framework Preset**
2. Click dropdown (currently shows "Express")
3. Select: **Other** (or "No Framework")
4. Click: **Save** (if auto-save doesn't happen)

**Expected:** Framework Preset now shows "Other" or "No Framework".

**Why:** "Other" tells Vercel this is a static site, not a Node.js app.

---

#### Step 3: Override Build Command
1. Find section: **Build Command**
2. Click toggle: **Override** (enable override)
3. Set value to: (empty/blank)
4. Click: **Save**

**Expected:** Build Command shows "(empty)" or blank.

**Why:** Static sites don't need a build step. Empty = no build.

---

#### Step 4: Set Output Directory
1. Find section: **Output Directory**
2. Click toggle: **Override** (enable override)
3. Set value to: `.` (single dot, means root directory)
4. Click: **Save**

**Expected:** Output Directory shows `.`

**Why:** Your static files (`index.html`) are in the root directory.

---

#### Step 5: Override Install Command
1. Find section: **Install Command**
2. Click toggle: **Override** (enable override)
3. Set value to: (empty/blank)
4. Click: **Save**

**Expected:** Install Command shows "(empty)" or blank.

**Why:** No dependencies needed for static HTML. Empty = skip npm install.

---

#### Step 6: Verify Root Directory
1. Find section: **Root Directory**
2. Check current value:
   - If blank or `.` → **Leave as is** ✅
   - If shows `dashboard` or other folder → **Change to:** `.` (root)
3. Click: **Save** (if changed)

**Expected:** Root Directory shows `.` or blank (both mean root).

**How to determine:** 
- Your `vercel.json` and `index.html` are in `fordfofer-pitch/dashboard/`
- If Vercel is linked to `dashboard` folder, Root Directory should be `.` (or blank)
- If Vercel is linked to parent folder, Root Directory should be `dashboard`

**Check:** Look at your `.vercel/project.json` - it shows which folder is linked.

---

### Part 2: Trigger New Deployment

#### Step 7: Go to Deployments
1. Click: **Deployments** (left sidebar)
2. Find: Latest deployment (top of list)

**Expected:** You see a list of deployments, newest at top.

---

#### Step 8: Redeploy Latest (or Promote)
**Option A: Redeploy Latest**
1. Click: **⋯** (three dots) on latest deployment
2. Click: **Redeploy**
3. Confirm: Click **Redeploy** button in modal

**Option B: Promote Preview to Production**
1. Find a preview deployment that worked
2. Click: **⋯** (three dots)
3. Click: **Promote to Production**
4. Confirm: Click **Promote** button

**Expected:** 
- Deployment status changes to "Building..."
- Then "Ready" (green checkmark)
- Badge shows "Production"

**Which to use:**
- **Redeploy** if latest deployment has your static files
- **Promote** if an older preview deployment worked

---

#### Step 9: Confirm Production Status
1. Wait for deployment to finish (status: "Ready")
2. Check badge: Should show **"Production"** (green)
3. Check timestamp: Should be "just now" or recent

**Expected:** 
- Status: ✅ Ready
- Badge: Production
- Age: "just now" or "X minutes ago"

**If not Production:**
- Click deployment → **Settings** tab → **Promote to Production**

---

### Part 3: Verify Domain Assignment

#### Step 10: Check Domain Assignment
1. Click: **Settings** → **Domains**
2. Find: `golocapo.com` and `www.golocapo.com`
3. Check status:
   - ✅ Should show "Valid" / "Active" (green)
   - ✅ Should show latest deployment URL

**Expected:** 
- Domain shows "Valid" / "Active"
- Points to latest Production deployment

**If domain shows "Invalid" or "Pending":**
- Click domain → **Configure** → Follow DNS setup steps

---

## SUCCESS CHECKLIST

### ✅ Browser Check
1. Open: https://www.golocapo.com
2. **Expected:** Homepage loads (no 500 error)
3. **Expected:** See your `index.html` content
4. **Expected:** No console errors (F12 → Console tab)

**Success:** ✅ Homepage loads, no 500

---

### ✅ CLI Check (Optional)
```powershell
curl.exe -I https://www.golocapo.com/
```

**Expected Output:**
```
HTTP/2 200
Content-Type: text/html; charset=utf-8
X-Vercel-Cache: MISS (or HIT)
```

**Success Indicators:**
- ✅ Status: `HTTP/2 200` (or `HTTP/1.1 200`)
- ✅ Content-Type: `text/html`
- ✅ No `X-Vercel-Error` header
- ✅ No `FUNCTION_INVOCATION_FAILED` error

**Failure Indicators:**
- ❌ Status: `HTTP/2 500`
- ❌ Header: `X-Vercel-Error: FUNCTION_INVOCATION_FAILED`
- ❌ Content-Type: `application/json` (error response)

---

## IF STILL 500 - ESCALATION

### Step 11: Disable Deployment Protection

**Path:** Settings → Deployment Protection

1. Go to: **Settings** → **Deployment Protection**
2. Find: **Preview Deployments** section
3. Set: **Password Protection** → **Disabled**
4. Click: **Save**

**Why:** Password protection can cause routing issues.

**Expected:** Password Protection shows "Disabled"

---

### Step 12: Inspect Runtime Logs

**Path:** Deployments → Latest → Functions tab

1. Go to: **Deployments** → Click latest deployment
2. Click: **Functions** tab
3. Look for: Any functions listed (should be empty for static)
4. Click: **Runtime Logs** tab
5. Check: Recent log entries

**What to Look For:**
- ✅ **Success:** No functions listed, no `server.js` references
- ❌ **Failure:** Still see `server.js` or function invocations

**If you see `server.js` errors:**
- Vercel is still trying to run Node.js code
- Check: Settings → Build and Deployment → Framework Preset (should be "Other")
- Check: No `package.json` scripts that start a server
- Redeploy after fixing settings

---

### Step 13: Verify No Server Files

**Check in Vercel UI:**
1. Go to: Latest deployment → **Source** or **Files** tab
2. Look for: `server.js`, `server.cjs`, `app.js`, `index.js` in root
3. Check: These files should NOT be executed

**If server files exist:**
- They might be getting executed
- Solution: Add to `.vercelignore` or delete them
- Or: Ensure Framework Preset is "Other" (not Express)

---

### Step 14: Force Clean Deployment

**Nuclear Option - Delete and Redeploy:**

1. Go to: **Deployments**
2. Find: A working preview deployment (if any)
3. Click: **⋯** → **Promote to Production**
4. OR: Make a small change (add comment to `index.html`), commit, push
5. Vercel will auto-deploy with new settings

**Expected:** New deployment uses static settings (no server.js)

---

## SETTINGS SUMMARY

**Final Settings Should Be:**

| Setting | Value |
|---------|-------|
| Framework Preset | **Other** (or "No Framework") |
| Build Command | **(empty)** (override enabled) |
| Output Directory | **`.`** (override enabled) |
| Install Command | **(empty)** (override enabled) |
| Root Directory | **`.`** or blank |

---

## QUICK REFERENCE

**Settings Path:**
```
Vercel Dashboard → dashboard project → Settings → Build and Deployment
```

**Deployments Path:**
```
Vercel Dashboard → dashboard project → Deployments
```

**Domain Settings Path:**
```
Vercel Dashboard → dashboard project → Settings → Domains
```

---

## TROUBLESHOOTING

**Q: Framework Preset dropdown doesn't show "Other"**
- **A:** Look for "No Framework" or "Static Site"
- **A:** Or leave it blank (some Vercel versions)

**Q: Can't find "Override" toggle**
- **A:** Click the field itself - override option appears
- **A:** Or click "Edit" button next to the setting

**Q: Deployment still shows "Express"**
- **A:** Wait for deployment to finish, then check again
- **A:** Or manually trigger new deployment after saving settings

**Q: Domain still returns 500 after settings change**
- **A:** Wait 2-3 minutes for DNS/cache propagation
- **A:** Check Runtime Logs to confirm no server.js errors
- **A:** Verify latest deployment is marked "Production"

---

**Status:** Follow steps 1-10 to force static deployment. Use escalation steps 11-14 if still 500.

