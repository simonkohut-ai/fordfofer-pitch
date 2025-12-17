# Quick Fix: Homepage 500 Error

## Root Cause Identified
Vercel is treating `home.html` as a serverless function because:
1. Route configuration with `headers` block causes Vercel to process it as a function
2. `/home.html` also returns 500 (confirmed via curl)
3. `/api/health` works fine (serverless functions work)

## Solution: Use index.html (Vercel Auto-Detection)

Vercel automatically serves `index.html` for `/` without route configuration.

### Step 1: Backup current index.html
```powershell
cd "C:\Users\simik\Desktop\the most wanted!!!\fordfofer-pitch\dashboard"
if (Test-Path index.html) {
    Copy-Item index.html index.html.old-backup
    Write-Host "Backed up index.html to index.html.old-backup"
}
```

### Step 2: Copy home.html to index.html
```powershell
Copy-Item home.html index.html -Force
Write-Host "Copied home.html to index.html"
```

### Step 3: Remove / route from vercel.json
Remove lines 212-218 (the `/` route with headers).

### Step 4: Deploy
```powershell
vercel deploy --prod --confirm
```

### Step 5: Verify
```powershell
# Wait 30 seconds, then:
curl.exe -I https://www.golocapo.com/
# Expected: HTTP/2 200
```

---

## Alternative: Fix vercel.json Route (If you want to keep home.html)

Remove the `headers` block from the `/` route:

```json
// BEFORE
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

Then deploy: `vercel deploy --prod --confirm`

---

## Recommended: Use index.html (Fastest & Most Reliable)

This is the standard Vercel pattern and requires no route configuration.

