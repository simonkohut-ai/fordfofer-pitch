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

# Fail if files are missing
if (-not $allFilesExist) {
    Write-Host "❌ FAIL - Files missing. Cannot proceed." -ForegroundColor Red
    exit 1
}

# Check /prelaunch specifically
$prelaunchUrl = "https://www.golocapo.com/prelaunch"
$prelaunchStatus = $null

try {
    $prelaunchResponse = Invoke-WebRequest -Uri $prelaunchUrl -Method Head -TimeoutSec 15 -UseBasicParsing
    $prelaunchStatus = $prelaunchResponse.StatusCode
} catch {
    $prelaunchStatus = $_.Exception.Response.StatusCode.value__
}

Write-Host ""
Write-Host "=== Final Result ===" -ForegroundColor Cyan

if ($prelaunchStatus -eq 200) {
    Write-Host "✅ SUCCESS - /prelaunch returns HTTP 200" -ForegroundColor Green
    exit 0
} else {
    Write-Host "❌ FAIL - /prelaunch returned HTTP $prelaunchStatus (expected 200)" -ForegroundColor Red
    exit 1
}

Write-Host ""

