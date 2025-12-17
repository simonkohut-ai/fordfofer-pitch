# Fix Applied: Homepage 500 Error

## What Was Changed

**File:** `vercel.json`
**Change:** Removed `headers` block from `/` route (lines 213-218)

**Before:**
```json
{
  "src": "/",
  "dest": "/home.html",
  "headers": {
    "Cache-Control": "public, max-age=0, must-revalidate"
  }
}
```

**After:**
```json
{
  "src": "/",
  "dest": "/home.html"
}
```

## Why This Fixes It

Vercel was treating the route with `headers` as a serverless function, causing `FUNCTION_INVOCATION_FAILED`. Removing the headers block allows Vercel to serve `home.html` as a static file.

## Next Steps

1. **Deploy:**
   ```powershell
   cd "C:\Users\simik\Desktop\the most wanted!!!\fordfofer-pitch\dashboard"
   vercel deploy --prod --confirm
   ```

2. **Wait 30 seconds** for deployment to propagate

3. **Verify:**
   ```powershell
   curl.exe -I https://www.golocapo.com/
   # Expected: HTTP/2 200
   
   curl.exe -I https://www.golocapo.com/api/health
   # Expected: HTTP/2 200
   ```

4. **Test in browser:**
   - Open: https://www.golocapo.com/
   - Should load homepage without errors
   - CTA button should work

## If This Doesn't Work

**Alternative Fix:** Use `index.html` instead of `home.html`

1. Copy `home.html` to `index.html`
2. Remove the `/` route entirely from `vercel.json`
3. Vercel will automatically serve `index.html` for `/`

## Success Criteria

✅ Homepage returns HTTP 200  
✅ Homepage loads in browser  
✅ No console errors  
✅ CTA button works

