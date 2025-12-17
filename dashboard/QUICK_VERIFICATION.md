# Quick Verification Guide

## 1. DIFF

```diff
--- a/vercel.json
+++ b/vercel.json
@@ -212,6 +212,3 @@
     {
       "src": "/",
-      "dest": "/home.html",
-      "headers": {
-        "Cache-Control": "public, max-age=0, must-revalidate"
-      }
+      "dest": "/home.html"
     },
```

**Removed:** `headers` block (lines 215-217) - Cache-Control header rule

---

## 2. HYPOTHESIS VALIDATION

**CORRECTION:** Headers don't cause function execution. Real issue is likely route processing or file detection.

**Proof Checklist:**
- ✅ Static: `Content-Type: text/html`, `X-Vercel-Cache: HIT/MISS`, Status 200
- ❌ Function: `X-Vercel-Error: FUNCTION_INVOCATION_FAILED`, Status 500

---

## 3. VERIFICATION SCRIPT

```powershell
$baseUrl = "https://www.golocapo.com"; $t = Get-Date -Format "yyyyMMddHHmmss"
@("/", "/home.html", "/pricing", "/api/health") | ForEach-Object {
    $url = "$baseUrl$_?t=$t"
    try {
        $r = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing
        Write-Host "$_`: ✅ HTTP $($r.StatusCode)" -ForegroundColor Green
    } catch {
        $s = $_.Exception.Response.StatusCode.value__
        Write-Host "$_`: ❌ HTTP $s" -ForegroundColor Red
    }
}
```

**Expected:** All routes return HTTP 200

---

## 4. DEPLOY STEPS

```powershell
cd "C:\Users\simik\Desktop\the most wanted!!!\fordfofer-pitch\dashboard"
vercel whoami                    # Verify auth
vercel link                      # Confirm "dashboard" project
vercel deploy --prod --confirm   # Deploy
vercel ls | Select-Object -First 1  # Confirm Production
```

**Production URL:** Shown after `vercel deploy --prod`

---

## 5. FALLBACK (If Still 500)

```powershell
Copy-Item home.html index.html -Force
# Remove / route from vercel.json (lines 212-215)
vercel deploy --prod --confirm
```

**Why:** Vercel auto-serves `index.html` for `/` (no route needed)

---

## 6. 401 FIX

**Vercel UI:** Settings → Deployment Protection → Preview Deployments → Disable Password

**Why:** `.vercel.app` URLs can be password-protected. Custom domain (`golocapo.com`) is always public.

**Re-enable when:** Production domain working, ready for launch.

