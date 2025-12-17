# Vercel Deployment Cleanup Guide

## Problem
Vercel deployment history shows errors from old preview branches or detached projects. These are historical and cannot be deleted via code.

## Solution: UI-Based Cleanup

### Step 1: Verify Production Project
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Find the project that owns `golocapo.com`
3. Confirm it's connected to the correct GitHub repo: `simonkohut-ai/fordfofer-pitch`

### Step 2: Configure Production Branch
1. In project Settings → Git
2. Set **Production Branch** = `main`
3. Ensure **Auto-deploy from GitHub** is enabled for `main` only

### Step 3: Disable Preview Deployments (Optional)
**Option A: Disable all previews**
1. Settings → Git → **Preview Deployments** → Toggle OFF

**Option B: Ignore specific patterns**
1. Settings → Git → **Ignored Build Step**
2. Add pattern: `git diff HEAD^ HEAD --quiet .`
3. OR add to `.vercelignore`:
   ```
   demo/
   showcase/
   archive/
   ```

### Step 4: Verify Domain Configuration
1. Settings → Domains
2. Confirm:
   - `golocapo.com` → Points to correct project
   - `www.golocapo.com` → Points to correct project
3. If duplicate domains exist on other projects, remove them

### Step 5: Clean Up Other Projects (If Needed)
If you have other Vercel projects (e.g., `ai-studio`, `dashboard`) that are auto-deploying from the same repo:

**Option A: Detach repo**
1. Go to that project's Settings → Git
2. Click "Disconnect" or "Remove Git Integration"

**Option B: Disable auto-deploy**
1. Settings → Git → **Auto-deploy from GitHub** → Toggle OFF

### Step 6: Manual Cleanup (If Needed)
1. Go to Deployments tab
2. Find failed deployments from old branches
3. Click "..." → "Cancel" (if still building)
4. Note: You cannot delete deployment history, but canceling active builds helps

## Verification

After cleanup, verify:
1. Only `main` branch deploys automatically
2. Production URLs return 200 OK:
   ```powershell
   .\scripts\healthcheck.ps1
   ```
3. No new failed deployments appear

## Prevention

- Keep `vercel.json` minimal (production routes only)
- Archive experimental pages to `/archive/` (not in sitemap/rewrites)
- Ensure repo root always has `index.html` (static entrypoint)
- Use `.vercelignore` to exclude non-production files

## Notes

- **Historical deployments cannot be deleted** - this is Vercel's design
- **Focus on preventing new failures** - configure correctly going forward
- **Production is healthy** - current `main` deploys are working (200 OK verified)

