# Fix Vercel Build Script Execution

## Problem
Build script `scripts/vercel-static-export.mjs` exists but Vercel is not executing it.

## Solution: Configure Vercel Build Settings

1. **Go to Vercel Dashboard**
   - Project: golocapo.com
   - Settings → Build & Development Settings

2. **Update Settings:**
   ```
   Framework Preset: Other
   Build Command: npm run vercel-build
   Output Directory: (leave empty)
   Install Command: npm install
   ```

3. **Save Settings**

4. **Redeploy:**
   - Deployments → Latest → "Redeploy"
   - ✅ CHECK "Clear Build Cache"
   - Deploy

5. **Verify Build Logs:**
   After deployment starts, check Build Logs for:
   - `Building Vercel static output...`
   - `✅ Dashboard files copied`
   - `✅ dashboard/prelaunch.html exists in output`

6. **After deployment completes:**
   ```powershell
   .\VERIFY_PRELAUNCH.ps1
   ```

## Expected Result
All 6 URLs return HTTP 200:
- `/dashboard/index.html`
- `/dashboard/prelaunch.html`
- `/dashboard/pricing.html`
- `/dashboard/thank-you.html`
- `/prelaunch`
- `/pricing`

