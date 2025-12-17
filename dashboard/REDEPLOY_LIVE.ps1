# REDEPLOY_LIVE.ps1
# One-command production deployment + verification script
# Deploys to Vercel production, verifies domain attachment, and tests live domain
# FAILS LOUDLY if domain not attached or not responding

Write-Host "🚀 Vercel Production Deployment & Verification" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Detect project root (where vercel.json + package.json live)
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = $scriptPath

# Verify vercel.json exists
if (-not (Test-Path "$projectRoot\vercel.json")) {
    Write-Host "❌ ERROR: vercel.json not found in $projectRoot" -ForegroundColor Red
    Write-Host "   Current directory: $(Get-Location)" -ForegroundColor Yellow
    Write-Host "   Script path: $scriptPath" -ForegroundColor Yellow
    Write-Host "   Please run this script from the project root (where vercel.json exists)." -ForegroundColor Yellow
    exit 1
}

# Change to project root
Set-Location $projectRoot
Write-Host "📁 Working directory: $(Get-Location)" -ForegroundColor Gray
Write-Host "✅ Project root detected: $projectRoot" -ForegroundColor Green
Write-Host ""

# Step 1: Check Vercel CLI login
Write-Host "📋 Step 1: Checking Vercel CLI login..." -ForegroundColor Yellow
$whoami = vercel whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ERROR: Not logged in to Vercel CLI" -ForegroundColor Red
    Write-Host "   Run: vercel login" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Logged in as: $whoami" -ForegroundColor Green
Write-Host ""

# Step 2: Check project link and verify project name
Write-Host "📋 Step 2: Verifying Vercel project link..." -ForegroundColor Yellow
if (Test-Path "$projectRoot\.vercel\project.json") {
    $projectInfo = Get-Content "$projectRoot\.vercel\project.json" | ConvertFrom-Json
    $projectName = $projectInfo.projectName
    $projectId = $projectInfo.projectId
    
    Write-Host "   Project Name: $projectName" -ForegroundColor Gray
    Write-Host "   Project ID: $projectId" -ForegroundColor Gray
    
    # Verify project name is "dashboard"
    if ($projectName -ne "dashboard") {
        Write-Host "❌ ERROR: Project name mismatch!" -ForegroundColor Red
        Write-Host "   Expected: dashboard" -ForegroundColor Yellow
        Write-Host "   Found: $projectName" -ForegroundColor Yellow
        Write-Host "   This script is for the 'dashboard' project only." -ForegroundColor Yellow
        Write-Host "   Run 'vercel link' and select the correct project." -ForegroundColor Yellow
        exit 1
    }
    
    Write-Host "✅ Project verified: $projectName ($projectId)" -ForegroundColor Green
} else {
    Write-Host "⚠️  .vercel directory not found. Linking project..." -ForegroundColor Yellow
    Write-Host "   IMPORTANT: Select project 'dashboard' when prompted" -ForegroundColor Yellow
    vercel link --yes
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ ERROR: Failed to link project" -ForegroundColor Red
        exit 1
    }
    
    # Verify linked project is "dashboard"
    $projectInfo = Get-Content "$projectRoot\.vercel\project.json" | ConvertFrom-Json
    if ($projectInfo.projectName -ne "dashboard") {
        Write-Host "❌ ERROR: Wrong project linked!" -ForegroundColor Red
        Write-Host "   Expected: dashboard" -ForegroundColor Yellow
        Write-Host "   Linked: $($projectInfo.projectName)" -ForegroundColor Yellow
        Write-Host "   Run 'vercel link' again and select 'dashboard'" -ForegroundColor Yellow
        exit 1
    }
}
Write-Host ""

# Step 3: Deploy to production
Write-Host "📋 Step 3: Deploying to PRODUCTION..." -ForegroundColor Yellow
Write-Host "   This may take 1-2 minutes..." -ForegroundColor Gray
Write-Host ""

$deployOutput = vercel deploy --prod --confirm 2>&1 | Tee-Object -Variable deployOutputFull

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ERROR: Deployment failed" -ForegroundColor Red
    Write-Host $deployOutputFull
    exit 1
}

# Extract production URL from output
$prodUrl = ""
if ($deployOutput -match "https://[^\s]+\.vercel\.app") {
    $prodUrl = $matches[0]
} elseif ($deployOutput -match "Production: (https://[^\s]+)") {
    $prodUrl = $matches[1]
} else {
    # Try to get it from vercel inspect
    $inspectOutput = vercel inspect --prod 2>&1
    if ($inspectOutput -match "https://[^\s]+\.vercel\.app") {
        $prodUrl = $matches[0]
    }
}

if (-not $prodUrl) {
    Write-Host "⚠️  Could not extract production URL from output" -ForegroundColor Yellow
    Write-Host "   Deploy output:" -ForegroundColor Gray
    Write-Host $deployOutputFull
    Write-Host ""
    Write-Host "   Please check Vercel dashboard for the URL:" -ForegroundColor Yellow
    Write-Host "   https://vercel.com/dashboard" -ForegroundColor Cyan
    exit 1
}

Write-Host "✅ Deployment successful!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Production URL: $prodUrl" -ForegroundColor Cyan
Write-Host ""

# Step 4: Verify routes
Write-Host "📋 Step 4: Verifying production routes..." -ForegroundColor Yellow
Write-Host ""

$routes = @(
    @{ Path = "/"; Name = "Homepage" },
    @{ Path = "/clients/mikork"; Name = "MikoRK" },
    @{ Path = "/clients/komfortreality"; Name = "Komfortreality" },
    @{ Path = "/clients/hamilton-merch"; Name = "Hamilton Merch" },
    @{ Path = "/api/health"; Name = "API Health" }
)

$allPassed = $true
foreach ($route in $routes) {
    $url = "$prodUrl$($route.Path)"
    try {
        $response = Invoke-WebRequest -Uri $url -Method GET -TimeoutSec 10 -UseBasicParsing -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ PASS: $($route.Name) ($($route.Path))" -ForegroundColor Green
        } else {
            Write-Host "❌ FAIL: $($route.Name) ($($route.Path)) - Status: $($response.StatusCode)" -ForegroundColor Red
            $allPassed = $false
        }
    } catch {
        Write-Host "❌ FAIL: $($route.Name) ($($route.Path)) - Error: $($_.Exception.Message)" -ForegroundColor Red
        $allPassed = $false
    }
}

Write-Host ""

# Step 5: Verify domain attachment (REQUIRED - ABORT IF MISSING)
Write-Host "📋 Step 5: Verifying domain attachment (REQUIRED)..." -ForegroundColor Yellow
$domainsOutput = vercel domains ls 2>&1 | Out-String

if (-not ($domainsOutput -match "golocapo\.com")) {
    Write-Host "❌ ERROR: Domain golocapo.com is NOT attached to this project!" -ForegroundColor Red
    Write-Host ""
    Write-Host "   Deployment cannot be considered LIVE without domain attachment." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📝 REQUIRED ACTION: Attach domain in Vercel dashboard:" -ForegroundColor Cyan
    Write-Host "   1. Go to: https://vercel.com/dashboard" -ForegroundColor White
    Write-Host "   2. Select project: dashboard" -ForegroundColor White
    Write-Host "   3. Go to: Settings > Domains" -ForegroundColor White
    Write-Host "   4. Add domain: golocapo.com" -ForegroundColor White
    Write-Host "   5. Follow DNS setup instructions" -ForegroundColor White
    Write-Host "   6. Wait for DNS propagation (can take up to 48 hours)" -ForegroundColor White
    Write-Host ""
    Write-Host "   After domain is attached, run this script again." -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

Write-Host "✅ Domain golocapo.com is attached to this project" -ForegroundColor Green
Write-Host ""

Write-Host ""

# Step 6: Test custom domain (REQUIRED - ABORT IF FAILS)
Write-Host "📋 Step 6: Testing custom domain golocapo.com (REQUIRED)..." -ForegroundColor Yellow
Write-Host "   This is the FINAL check - domain must respond with HTTP 200" -ForegroundColor Gray
Write-Host ""

$customDomain = "https://golocapo.com"
$domainHealthUrl = "$customDomain/api/health"

try {
    Write-Host "   Testing: $domainHealthUrl" -ForegroundColor Gray
    $domainResponse = Invoke-WebRequest -Uri $domainHealthUrl -Method GET -TimeoutSec 15 -UseBasicParsing -ErrorAction Stop
    
    if ($domainResponse.StatusCode -eq 200) {
        Write-Host "✅ PASS: Custom domain golocapo.com is LIVE and responding" -ForegroundColor Green
        $domainLive = $true
    } else {
        Write-Host "❌ FAIL: Custom domain returned HTTP $($domainResponse.StatusCode)" -ForegroundColor Red
        Write-Host "   Expected: HTTP 200" -ForegroundColor Yellow
        Write-Host "   Deployment is NOT LIVE until domain responds correctly." -ForegroundColor Yellow
        $domainLive = $false
    }
} catch {
    Write-Host "❌ FAIL: Custom domain golocapo.com is NOT responding" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   Possible causes:" -ForegroundColor Yellow
    Write-Host "   - DNS not configured correctly" -ForegroundColor White
    Write-Host "   - DNS still propagating (can take up to 48 hours)" -ForegroundColor White
    Write-Host "   - Domain not properly attached in Vercel" -ForegroundColor White
    Write-Host "   - SSL certificate not issued yet" -ForegroundColor White
    Write-Host ""
    Write-Host "   Deployment is NOT LIVE until domain responds." -ForegroundColor Yellow
    $domainLive = $false
}

Write-Host ""

# Step 7: Open browser
Write-Host "📋 Step 7: Opening URLs in browser..." -ForegroundColor Yellow
Start-Process $prodUrl
Start-Process $customDomain
Write-Host "✅ Browser opened (both URLs)" -ForegroundColor Green
Write-Host ""

# Final summary
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

if ($allPassed -and $domainLive) {
    Write-Host "✅ DEPLOYMENT IS LIVE" -ForegroundColor Green
    Write-Host "   All routes verified" -ForegroundColor Green
    Write-Host "   Custom domain responding" -ForegroundColor Green
} elseif ($allPassed -and -not $domainLive) {
    Write-Host "⚠️  DEPLOYMENT COMPLETE BUT DOMAIN NOT LIVE" -ForegroundColor Yellow
    Write-Host "   Routes verified on .vercel.app URL" -ForegroundColor Green
    Write-Host "   Custom domain NOT responding (see errors above)" -ForegroundColor Red
    Write-Host ""
    Write-Host "   Status: NOT LIVE - Domain must respond to be considered LIVE" -ForegroundColor Yellow
} else {
    Write-Host "❌ DEPLOYMENT FAILED" -ForegroundColor Red
    Write-Host "   Some routes failed - Check output above" -ForegroundColor Red
}

Write-Host ""
Write-Host "🌐 Vercel URL: $prodUrl" -ForegroundColor Cyan
Write-Host "🌐 Custom Domain: $customDomain" -ForegroundColor Cyan
Write-Host ""

if (-not $domainLive) {
    Write-Host "📝 REQUIRED ACTIONS:" -ForegroundColor Yellow
    Write-Host "   1. Verify domain is attached in Vercel dashboard" -ForegroundColor White
    Write-Host "   2. Check DNS records are correct" -ForegroundColor White
    Write-Host "   3. Wait for DNS propagation (up to 48 hours)" -ForegroundColor White
    Write-Host "   4. Run this script again to verify" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host "📊 Next Steps:" -ForegroundColor Cyan
Write-Host "   - Verify all pages load correctly on golocapo.com" -ForegroundColor White
Write-Host "   - Test client microsite forms" -ForegroundColor White
Write-Host "   - Check Featured Work section on homepage" -ForegroundColor White
Write-Host ""

