# Verify Routes - Vercel Deployment Check
# Checks that routes and brand assets return 200

Write-Host "=== Route Checks ===" -ForegroundColor Cyan
Write-Host ""

$urls = @(
    "https://www.golocapo.com/prelaunch",
    "https://www.golocapo.com/pricing",
    "https://www.golocapo.com/thank-you",
    "https://www.golocapo.com/assets/brand/brand.css",
    "https://www.golocapo.com/assets/brand/og.png"
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
Write-Host "=== Final Result ===" -ForegroundColor Cyan

if ($allPass) {
    Write-Host "✅ SUCCESS - All routes and brand assets return HTTP 200" -ForegroundColor Green
    exit 0
} else {
    Write-Host "❌ FAIL - Some URLs did not return HTTP 200" -ForegroundColor Red
    exit 1
}

Write-Host ""

