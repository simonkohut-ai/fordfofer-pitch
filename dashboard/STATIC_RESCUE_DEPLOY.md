# Static Rescue Deploy - Get HTTP 200 on / Today

## Goal
Deploy `index.html` to production so `https://www.golocapo.com/` returns HTTP 200.

---

## MINIMAL VERCEL.JSON

**Strategy:** Let Vercel auto-detect `index.html` for `/` (no route needed). Route APIs, keep essential static pages, fallback unknown routes to `index.html`.

```json
{
  "version": 2,
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/pricing",
      "dest": "/pricing.html"
    },
    {
      "src": "/prelaunch",
      "dest": "/prelaunch.html"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

**Why This Works:**
- ✅ No `/` route = Vercel auto-serves `index.html`
- ✅ API routes preserved (all `/api/*` → serverless functions)
- ✅ Essential pages preserved (`/pricing`, `/prelaunch`)
- ✅ Catch-all falls back to `index.html` (SPA-style)
- ✅ Minimal = less to break

---

## COPY/PASTE COMMAND BLOCK

```powershell
# ============================================
# STATIC RESCUE DEPLOY - Copy/paste entire block
# ============================================

# Step 1: Confirm correct folder
$expectedPath = "C:\Users\simik\Desktop\the most wanted!!!\fordfofer-pitch\dashboard"
$currentPath = Get-Location
if ($currentPath.Path -ne $expectedPath) {
    Write-Host "⚠️  Wrong folder. Changing to: $expectedPath" -ForegroundColor Yellow
    Set-Location $expectedPath
} else {
    Write-Host "✅ Correct folder: $currentPath" -ForegroundColor Green
}

# Step 2: Confirm index.html exists
if (Test-Path "index.html") {
    $size = (Get-Item "index.html").Length
    Write-Host "✅ index.html exists ($size bytes)" -ForegroundColor Green
} else {
    Write-Host "❌ index.html NOT FOUND" -ForegroundColor Red
    exit 1
}

# Step 3: Backup current vercel.json
if (Test-Path "vercel.json") {
    Copy-Item "vercel.json" "vercel.json.backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
    Write-Host "✅ Backed up vercel.json" -ForegroundColor Green
}

# Step 4: Create minimal vercel.json
$minimalVercel = @{
    version = 2
    routes = @(
        @{
            src = "/api/(.*)"
            dest = "/api/$1"
        },
        @{
            src = "/pricing"
            dest = "/pricing.html"
        },
        @{
            src = "/prelaunch"
            dest = "/prelaunch.html"
        },
        @{
            src = "/(.*)"
            dest = "/index.html"
        }
    )
} | ConvertTo-Json -Depth 10

$minimalVercel | Set-Content "vercel.json" -Encoding UTF8
Write-Host "✅ Created minimal vercel.json" -ForegroundColor Green
Write-Host "`nCurrent vercel.json:" -ForegroundColor Cyan
Get-Content "vercel.json"

# Step 5: Verify Vercel CLI
Write-Host "`n=== Verifying Vercel CLI ===" -ForegroundColor Cyan
vercel --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Vercel CLI not found. Install: npm i -g vercel" -ForegroundColor Red
    exit 1
}

# Step 6: Verify authentication
Write-Host "`n=== Verifying Authentication ===" -ForegroundColor Cyan
vercel whoami
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Not authenticated. Run: vercel login" -ForegroundColor Red
    exit 1
}

# Step 7: Verify project link
Write-Host "`n=== Verifying Project Link ===" -ForegroundColor Cyan
if (Test-Path ".vercel\project.json") {
    $project = Get-Content ".vercel\project.json" | ConvertFrom-Json
    Write-Host "✅ Linked to project: $($project.projectId)" -ForegroundColor Green
} else {
    Write-Host "⚠️  Not linked. Running: vercel link" -ForegroundColor Yellow
    vercel link
}

# Step 8: Deploy to production
Write-Host "`n=== Deploying to Production ===" -ForegroundColor Cyan
Write-Host "This will deploy index.html as homepage..." -ForegroundColor Yellow
vercel deploy --prod --confirm

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Deployment complete!" -ForegroundColor Green
    Write-Host "`nWaiting 30 seconds for propagation..." -ForegroundColor Yellow
    Start-Sleep -Seconds 30
} else {
    Write-Host "`n❌ Deployment failed. Check errors above." -ForegroundColor Red
    exit 1
}

# Step 9: Show deployment status
Write-Host "`n=== Latest Deployment ===" -ForegroundColor Cyan
vercel ls | Select-Object -First 1

Write-Host "`n✅ Ready to verify!" -ForegroundColor Green
```

---

## VERIFICATION COMMAND BLOCK

```powershell
# ============================================
# VERIFICATION - Copy/paste entire block
# ============================================

$baseUrl = "https://www.golocapo.com"
$timestamp = Get-Date -Format "yyyyMMddHHmmss"

Write-Host "`n=== Verifying Static Rescue Deploy ===" -ForegroundColor Cyan
Write-Host "Testing: $baseUrl" -ForegroundColor Yellow
Write-Host "Timestamp: $timestamp`n" -ForegroundColor Gray

function Test-Route {
    param(
        [string]$Path,
        [int]$ExpectedStatus = 200
    )
    
    $url = "$baseUrl$Path?t=$timestamp"
    
    try {
        $response = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -ErrorAction Stop
        $status = $response.StatusCode
        $contentType = $response.Headers["Content-Type"]
        $vercelCache = $response.Headers["X-Vercel-Cache"]
        $vercelError = $response.Headers["X-Vercel-Error"]
        
        if ($status -eq $ExpectedStatus) {
            Write-Host "$Path`: ✅ HTTP $status" -ForegroundColor Green
            Write-Host "   Content-Type: $contentType" -ForegroundColor Gray
            if ($vercelCache) {
                Write-Host "   Cache: $vercelCache" -ForegroundColor Gray
            }
            return $true
        } else {
            Write-Host "$Path`: ❌ HTTP $status (expected $ExpectedStatus)" -ForegroundColor Red
            if ($vercelError) {
                Write-Host "   Error: $vercelError" -ForegroundColor Red
            }
            return $false
        }
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        $vercelError = $_.Exception.Response.Headers["X-Vercel-Error"]
        Write-Host "$Path`: ❌ HTTP $statusCode" -ForegroundColor Red
        if ($vercelError) {
            Write-Host "   Error: $vercelError" -ForegroundColor Red
        }
        return $false
    }
}

# Test critical routes
$results = @{
    Homepage = Test-Route -Path "/" -ExpectedStatus 200
    Pricing = Test-Route -Path "/pricing" -ExpectedStatus 200
    Prelaunch = Test-Route -Path "/prelaunch" -ExpectedStatus 200
    Health = Test-Route -Path "/api/health" -ExpectedStatus 200
}

Write-Host "`n=== Results ===" -ForegroundColor Cyan
$allPassed = $true
foreach ($key in $results.Keys) {
    if ($results[$key]) {
        Write-Host "$key`: ✅ PASS" -ForegroundColor Green
    } else {
        Write-Host "$key`: ❌ FAIL" -ForegroundColor Red
        $allPassed = $false
    }
}

Write-Host "`n=== Summary ===" -ForegroundColor Cyan
if ($allPassed) {
    Write-Host "✅ Homepage is LIVE - HTTP 200" -ForegroundColor Green
    Write-Host "✅ Static rescue deploy successful!" -ForegroundColor Green
    Write-Host "`nOpen in browser: $baseUrl" -ForegroundColor Yellow
} else {
    Write-Host "❌ Some routes failing - see escalation steps below" -ForegroundColor Red
}

# Also test with curl.exe (more reliable)
Write-Host "`n=== curl.exe Verification ===" -ForegroundColor Cyan
curl.exe -I "$baseUrl/?t=$timestamp" 2>&1 | Select-String -Pattern "HTTP|X-Vercel"
```

**Expected Success Output:**
```
=== Verifying Static Rescue Deploy ===
Testing: https://www.golocapo.com

/`: ✅ HTTP 200
   Content-Type: text/html; charset=utf-8
   Cache: MISS
/pricing`: ✅ HTTP 200
/prelaunch`: ✅ HTTP 200
/api/health`: ✅ HTTP 200

=== Results ===
Homepage: ✅ PASS
Pricing: ✅ PASS
Prelaunch: ✅ PASS
Health: ✅ PASS

=== Summary ===
✅ Homepage is LIVE - HTTP 200
✅ Static rescue deploy successful!
```

---

## IF STILL BROKEN - ESCALATION

### Step 1: Check Deployment Protection

**Vercel UI Path:**
1. Go to: https://vercel.com/dashboard
2. Select project: **dashboard**
3. Click: **Settings** (left sidebar)
4. Click: **Deployment Protection**
5. Find: **Preview Deployments** section
6. Set: **Password Protection** → **Disabled**
7. Click: **Save**

**Why:** Password protection on preview deployments can cause 401 errors.

---

### Step 2: Confirm Which Deployment is Serving Domain

```powershell
# Check domain assignment
vercel domains ls

# Check latest production deployment
vercel ls | Select-Object -First 1

# Get deployment details
$latest = vercel ls | Select-Object -First 1
Write-Host "Latest deployment: $latest" -ForegroundColor Cyan

# In Vercel UI:
# 1. Go to: Project "dashboard" → Settings → Domains
# 2. Confirm: golocapo.com is listed and shows "Valid" / "Active"
# 3. Check: Which deployment is assigned (should be latest Production)
```

**Vercel UI Path:**
1. Go to: Project "dashboard" → **Deployments**
2. Find deployment with **Production** badge
3. Click deployment → **Domains** tab
4. Confirm: `golocapo.com` is listed

---

### Step 3: Force Redeploy (Nuclear Option)

```powershell
# Delete .vercel folder and relink
Remove-Item -Recurse -Force .vercel -ErrorAction SilentlyContinue
vercel link
# Select: Existing project → dashboard

# Deploy again
vercel deploy --prod --confirm

# Wait 60 seconds
Start-Sleep -Seconds 60

# Verify
curl.exe -I https://www.golocapo.com/
```

---

### Step 4: Check Vercel Logs

```powershell
# Get latest deployment URL
$deployment = vercel ls | Select-Object -First 1 | ForEach-Object { $_.Split()[0] }
Write-Host "Checking logs for: $deployment" -ForegroundColor Cyan

# View logs (last 50 lines)
vercel logs $deployment | Select-Object -Last 50
```

**What to Look For:**
- File not found errors
- Function invocation errors
- Routing errors

---

### Step 5: Verify index.html is Deployed

```powershell
# Check if index.html is in deployment
# In Vercel UI:
# 1. Go to: Project "dashboard" → Latest deployment
# 2. Click: "Source" or "Files" tab
# 3. Confirm: index.html is listed

# Or check locally
Get-Item index.html | Select-Object Name, Length, LastWriteTime
```

---

## SUCCESS CRITERIA

After deploy, you should see:

✅ `curl.exe -I https://www.golocapo.com/` → **HTTP/2 200** (or HTTP/1.1 200)
✅ Homepage loads in browser (no 500 error)
✅ `Content-Type: text/html`
✅ No `X-Vercel-Error` header

**Acceptable Behavior:**
- ✅ `/home.html` → 404 (expected, we're using index.html now)
- ✅ `/pricing` → 200 (if pricing.html exists)
- ✅ `/prelaunch` → 200 (if prelaunch.html exists)
- ✅ `/api/health` → 200 (serverless function)

---

## ROLLBACK (If Needed)

```powershell
# Restore backup vercel.json
$backup = Get-ChildItem "vercel.json.backup-*" | Sort-Object LastWriteTime -Descending | Select-Object -First 1
if ($backup) {
    Copy-Item $backup.FullName "vercel.json" -Force
    Write-Host "✅ Restored: $($backup.Name)" -ForegroundColor Green
    vercel deploy --prod --confirm
}
```

---

**Status:** Ready to deploy. Run the command block above to get HTTP 200 on `/` today.

