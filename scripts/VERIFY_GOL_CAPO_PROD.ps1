# GoLoČapo Production Verification Script
# 
# Verifies that production site is working correctly.
# Checks critical routes and assets.
#
# Usage: .\scripts\VERIFY_GOL_CAPO_PROD.ps1

Write-Host "=== GoLoČapo Production Verification ===" -ForegroundColor Cyan
Write-Host ""

$siteUrl = "https://www.golocapo.com"
$allPass = $true

# 1. Homepage
Write-Host "1. Checking homepage..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "$siteUrl/" -Method Head -TimeoutSec 15 -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "   ✅ Homepage loads (200 OK)" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Homepage returned $($response.StatusCode)" -ForegroundColor Red
        $allPass = $false
    }
} catch {
    Write-Host "   ❌ Homepage failed: $($_.Exception.Message)" -ForegroundColor Red
    $allPass = $false
}

# 2. Prelaunch page
Write-Host "2. Checking prelaunch page..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "$siteUrl/prelaunch" -Method Head -TimeoutSec 15 -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "   ✅ Prelaunch page loads (200 OK)" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Prelaunch page returned $($response.StatusCode)" -ForegroundColor Red
        $allPass = $false
    }
} catch {
    Write-Host "   ❌ Prelaunch page failed: $($_.Exception.Message)" -ForegroundColor Red
    $allPass = $false
}

# 3. Brand CSS (CRITICAL)
Write-Host "3. Checking brand CSS..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "$siteUrl/assets/brand/brand.css" -Method Head -TimeoutSec 15 -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "   ✅ Brand CSS loads (200 OK)" -ForegroundColor Green
        
        # Check Content-Type
        $contentType = $response.Headers['Content-Type']
        if ($contentType -like "*css*" -or $contentType -like "*text*") {
            Write-Host "   ✅ Content-Type correct: $contentType" -ForegroundColor Green
        } else {
            Write-Host "   ⚠️  Content-Type unexpected: $contentType" -ForegroundColor Yellow
        }
    } else {
        Write-Host "   ❌ Brand CSS returned $($response.StatusCode)" -ForegroundColor Red
        $allPass = $false
    }
} catch {
    Write-Host "   ❌ Brand CSS failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   ⚠️  CRITICAL: CSS not loading - site will appear unstyled!" -ForegroundColor Red
    $allPass = $false
}

# 4. Robots.txt
Write-Host "4. Checking robots.txt..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "$siteUrl/robots.txt" -Method Head -TimeoutSec 15 -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "   ✅ Robots.txt loads (200 OK)" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Robots.txt returned $($response.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ⚠️  Robots.txt failed: $($_.Exception.Message)" -ForegroundColor Yellow
}

# 5. Sitemap.xml
Write-Host "5. Checking sitemap.xml..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "$siteUrl/sitemap.xml" -Method Head -TimeoutSec 15 -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "   ✅ Sitemap.xml loads (200 OK)" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Sitemap.xml returned $($response.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ⚠️  Sitemap.xml failed: $($_.Exception.Message)" -ForegroundColor Yellow
}

# 6. Visual verification reminder
Write-Host "6. Visual verification..." -ForegroundColor Cyan
Write-Host "   ⚠️  Manual check required:" -ForegroundColor Yellow
Write-Host "      - Open $siteUrl in browser" -ForegroundColor Gray
Write-Host "      - Verify gradient background is visible" -ForegroundColor Gray
Write-Host "      - Verify proper spacing and typography" -ForegroundColor Gray
Write-Host "      - Verify CTA button shimmer effect" -ForegroundColor Gray
Write-Host "      - Verify brand colors (purple gradient)" -ForegroundColor Gray
Write-Host "      - Verify dark background (#0B0B12)" -ForegroundColor Gray

Write-Host ""
Write-Host "=== Final Result ===" -ForegroundColor Cyan

if ($allPass) {
    Write-Host "✅ All critical checks passed" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Perform visual verification in browser" -ForegroundColor Gray
    Write-Host "2. Check browser DevTools Network tab for CSS loading" -ForegroundColor Gray
    Write-Host "3. Test on mobile device" -ForegroundColor Gray
    exit 0
} else {
    Write-Host "❌ Some critical checks failed" -ForegroundColor Red
    Write-Host ""
    Write-Host "CRITICAL ISSUES DETECTED:" -ForegroundColor Red
    Write-Host "- Review errors above" -ForegroundColor Yellow
    Write-Host "- Check Vercel deployment logs" -ForegroundColor Yellow
    Write-Host "- Verify assets are in correct location" -ForegroundColor Yellow
    Write-Host "- Check vercel.json configuration" -ForegroundColor Yellow
    exit 1
}

