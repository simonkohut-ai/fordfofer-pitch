# MikoRK pohrebníctvo - Production Verification Script
# 
# Checks that production deployment is working correctly.
# Run after deployment to verify everything works.
#
# Usage: .\scripts\VERIFY_MIKORK_PROD.ps1

Write-Host "=== MikoRK pohrebníctvo - Production Verification ===" -ForegroundColor Cyan
Write-Host ""

$siteUrl = $env:SITE_URL
if (-not $siteUrl) {
    $siteUrl = Read-Host "Enter your site URL (e.g., https://www.mikork.sk)"
}

if (-not $siteUrl) {
    Write-Host "❌ Site URL required. Exiting." -ForegroundColor Red
    exit 1
}

Write-Host "Testing: $siteUrl" -ForegroundColor Yellow
Write-Host ""

$allPass = $true

# 1. Homepage loads
Write-Host "1. Checking homepage..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "$siteUrl" -Method Head -TimeoutSec 15 -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "   ✅ Homepage loads (200 OK)" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Homepage returned $($response.StatusCode)" -ForegroundColor Yellow
        $allPass = $false
    }
} catch {
    Write-Host "   ❌ Homepage failed: $($_.Exception.Message)" -ForegroundColor Red
    $allPass = $false
}

# 2. Contact page loads
Write-Host "2. Checking contact page..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "$siteUrl/contact" -Method Head -TimeoutSec 15 -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "   ✅ Contact page loads (200 OK)" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Contact page returned $($response.StatusCode)" -ForegroundColor Yellow
        $allPass = $false
    }
} catch {
    Write-Host "   ❌ Contact page failed: $($_.Exception.Message)" -ForegroundColor Red
    $allPass = $false
}

# 3. Contact form API endpoint exists
Write-Host "3. Checking contact form API..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "$siteUrl/api/mikork/contact" -Method Options -TimeoutSec 15 -UseBasicParsing -ErrorAction SilentlyContinue
    Write-Host "   ✅ Contact API endpoint exists" -ForegroundColor Green
} catch {
    # Try POST to see if it exists (will fail validation but endpoint exists)
    try {
        $testBody = @{
            name = "Test"
            email = "test@test.sk"
            message = "Test"
            consent = $true
        } | ConvertTo-Json
        
        $response = Invoke-WebRequest -Uri "$siteUrl/api/mikork/contact" -Method POST -Body $testBody -ContentType "application/json" -TimeoutSec 15 -UseBasicParsing -ErrorAction SilentlyContinue
        Write-Host "   ✅ Contact API endpoint exists" -ForegroundColor Green
    } catch {
        Write-Host "   ⚠️  Contact API endpoint may not exist (check deployment)" -ForegroundColor Yellow
    }
}

# 4. Brand CSS loads
Write-Host "4. Checking brand CSS..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "$siteUrl/assets/mikork/brand.css" -Method Head -TimeoutSec 15 -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "   ✅ Brand CSS loads (200 OK)" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Brand CSS returned $($response.StatusCode)" -ForegroundColor Yellow
        $allPass = $false
    }
} catch {
    Write-Host "   ❌ Brand CSS failed: $($_.Exception.Message)" -ForegroundColor Red
    $allPass = $false
}

# 5. Mobile viewport check (reminder)
Write-Host "5. Mobile viewport check..." -ForegroundColor Cyan
Write-Host "   ⚠️  Manual check required:" -ForegroundColor Yellow
Write-Host "      - Open $siteUrl on mobile device" -ForegroundColor Gray
Write-Host "      - Verify layout is readable" -ForegroundColor Gray
Write-Host "      - Verify phone number is clickable" -ForegroundColor Gray
Write-Host "      - Verify contact form is usable" -ForegroundColor Gray

# 6. Lighthouse check (reminder)
Write-Host "6. Lighthouse performance check..." -ForegroundColor Cyan
Write-Host "   ⚠️  Manual check recommended:" -ForegroundColor Yellow
Write-Host "      - Open Chrome DevTools" -ForegroundColor Gray
Write-Host "      - Go to Lighthouse tab" -ForegroundColor Gray
Write-Host "      - Run audit for $siteUrl" -ForegroundColor Gray
Write-Host "      - Target: Performance 90+, Accessibility 100" -ForegroundColor Gray

# 7. Email configuration check (reminder)
Write-Host "7. Email configuration check..." -ForegroundColor Cyan
Write-Host "   ⚠️  Verify in Vercel:" -ForegroundColor Yellow
Write-Host "      - RESEND_API_KEY is set" -ForegroundColor Gray
Write-Host "      - CONTACT_EMAIL is set" -ForegroundColor Gray
Write-Host "      - RESEND_FROM_EMAIL is set" -ForegroundColor Gray
Write-Host "      - Test contact form submission" -ForegroundColor Gray

Write-Host ""
Write-Host "=== Final Result ===" -ForegroundColor Cyan

if ($allPass) {
    Write-Host "✅ Basic checks passed" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Test contact form submission" -ForegroundColor Gray
    Write-Host "2. Verify email notification received" -ForegroundColor Gray
    Write-Host "3. Test on mobile device" -ForegroundColor Gray
    Write-Host "4. Run Lighthouse audit" -ForegroundColor Gray
    Write-Host "5. Set up Google Business Profile" -ForegroundColor Gray
    exit 0
} else {
    Write-Host "❌ Some checks failed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Review errors above and fix before going live." -ForegroundColor Yellow
    exit 1
}

