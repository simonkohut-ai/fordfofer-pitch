# Golo Čapo Production Health Check Script
# Checks all critical routes and assets return 200 OK

$baseUrl = "https://www.golocapo.com"
$routes = @(
    "/",
    "/prelaunch",
    "/thank-you",
    "/assets/brand/brand.css",
    "/robots.txt",
    "/sitemap.xml"
)

Write-Host "=== GOLO ČAPO HEALTH CHECK ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Base URL: $baseUrl" -ForegroundColor Gray
Write-Host ""

$allPassed = $true

foreach ($route in $routes) {
    $url = "$baseUrl$route"
    try {
        $response = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
        $status = $response.StatusCode
        $contentType = $response.Headers["Content-Type"]
        
        if ($status -eq 200) {
            Write-Host "✅ $route" -ForegroundColor Green
            Write-Host "   Status: $status | Content-Type: $contentType" -ForegroundColor Gray
        } else {
            Write-Host "❌ $route" -ForegroundColor Red
            Write-Host "   Status: $status (expected 200)" -ForegroundColor Red
            $allPassed = $false
        }
    } catch {
        Write-Host "❌ $route" -ForegroundColor Red
        Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
        $allPassed = $false
    }
    Write-Host ""
}

if ($allPassed) {
    Write-Host "=== ✅ ALL CHECKS PASSED ===" -ForegroundColor Green
    exit 0
} else {
    Write-Host "=== ❌ SOME CHECKS FAILED ===" -ForegroundColor Red
    exit 1
}

