# Verify /prelaunch Route - Vercel Deployment Check
# Checks that dashboard HTML files exist and /prelaunch returns 200

Write-Host "=== Dashboard Files Check ===" -ForegroundColor Cyan
Write-Host ""

$files = @(
    "dashboard/index.html",
    "dashboard/prelaunch.html",
    "dashboard/pricing.html",
    "dashboard/thank-you.html"
)

$allFilesExist = $true

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ MISSING: $file" -ForegroundColor Red
        $allFilesExist = $false
    }
}

Write-Host ""
Write-Host "=== Live Route Verification ===" -ForegroundColor Cyan
Write-Host ""

$urls = @(
    "https://www.golocapo.com/",
    "https://www.golocapo.com/prelaunch",
    "https://www.golocapo.com/pricing",
    "https://www.golocapo.com/api/health"
)

$allPass = $true

foreach ($url in $urls) {
    try {
        $response = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 15 -UseBasicParsing
        $status = $response.StatusCode
        
        if ($status -eq 200) {
            Write-Host "✅ $status  $url" -ForegroundColor Green
        } else {
            Write-Host "⚠️  $status  $url" -ForegroundColor Yellow
            $allPass = $false
        }
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        if ($statusCode -eq 404) {
            Write-Host "❌ 404 NOT_FOUND  $url" -ForegroundColor Red
            $allPass = $false
        } else {
            Write-Host "❌ ERROR  $url" -ForegroundColor Red
            Write-Host "   $($_.Exception.Message)" -ForegroundColor Gray
            $allPass = $false
        }
    }
}

Write-Host ""
Write-Host "=== Result ===" -ForegroundColor Cyan

if ($allFilesExist -and $allPass) {
    Write-Host "✅ SUCCESS - All files exist and routes return 200" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now:" -ForegroundColor Yellow
    Write-Host "  1. Create Stripe Payment Link" -ForegroundColor White
    Write-Host "  2. Set STRIPE_CHECKOUT_URL in Vercel" -ForegroundColor White
    Write-Host "  3. Start promoting /prelaunch" -ForegroundColor White
} else {
    if (-not $allFilesExist) {
        Write-Host "❌ FILES MISSING - Fix file paths first" -ForegroundColor Red
    }
    if (-not $allPass) {
        Write-Host "❌ ROUTES FAILING - Redeploy after fixing files" -ForegroundColor Red
        Write-Host ""
        Write-Host "After fixing:" -ForegroundColor Yellow
        Write-Host "  1. Commit changes" -ForegroundColor White
        Write-Host "  2. Push to main" -ForegroundColor White
        Write-Host "  3. Vercel will auto-deploy" -ForegroundColor White
        Write-Host "  4. Run this script again" -ForegroundColor White
    }
}

Write-Host ""

