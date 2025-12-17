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
Write-Host "=== Brand Assets Check ===" -ForegroundColor Cyan
Write-Host ""

$brandUrls = @(
    "https://www.golocapo.com/assets/brand/brand.css",
    "https://www.golocapo.com/assets/brand/og.png"
)

$allBrandPass = $true

foreach ($url in $brandUrls) {
    try {
        $response = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 15 -UseBasicParsing
        $status = $response.StatusCode
        
        if ($status -eq 200) {
            Write-Host "✅ $status  $url" -ForegroundColor Green
        } else {
            Write-Host "⚠️  $status  $url" -ForegroundColor Yellow
            $allBrandPass = $false
        }
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        if ($statusCode -eq 404) {
            Write-Host "❌ 404 NOT_FOUND  $url" -ForegroundColor Red
            $allBrandPass = $false
        } else {
            Write-Host "❌ ERROR  $url" -ForegroundColor Red
            Write-Host "   $($_.Exception.Message)" -ForegroundColor Gray
            $allBrandPass = $false
        }
    }
}

Write-Host ""
Write-Host "=== Rewrite URL Checks ===" -ForegroundColor Cyan
Write-Host ""

$rewriteUrls = @(
    "https://www.golocapo.com/prelaunch",
    "https://www.golocapo.com/pricing",
    "https://www.golocapo.com/thank-you"
)

$allRewritePass = $true

foreach ($url in $rewriteUrls) {
    try {
        $response = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 15 -UseBasicParsing
        $status = $response.StatusCode
        
        if ($status -eq 200) {
            Write-Host "✅ $status  $url" -ForegroundColor Green
        } else {
            Write-Host "⚠️  $status  $url" -ForegroundColor Yellow
            $allRewritePass = $false
        }
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        if ($statusCode -eq 404) {
            Write-Host "❌ 404 NOT_FOUND  $url" -ForegroundColor Red
            $allRewritePass = $false
        } else {
            Write-Host "❌ ERROR  $url" -ForegroundColor Red
            Write-Host "   $($_.Exception.Message)" -ForegroundColor Gray
            $allRewritePass = $false
        }
    }
}

Write-Host ""
Write-Host "=== Final Result ===" -ForegroundColor Cyan

# Fail if files are missing
if (-not $allFilesExist) {
    Write-Host "❌ FAIL - Files missing. Cannot proceed." -ForegroundColor Red
    exit 1
}

# Check all URLs pass
if ($allRewritePass -and $allBrandPass) {
    Write-Host "✅ SUCCESS - All rewrite URLs and brand assets return HTTP 200" -ForegroundColor Green
    exit 0
} else {
    Write-Host "❌ FAIL - Some URLs did not return HTTP 200" -ForegroundColor Red
    if (-not $allBrandPass) {
        Write-Host "   Brand assets failed" -ForegroundColor Yellow
    }
    if (-not $allRewritePass) {
        Write-Host "   Rewrite URLs failed" -ForegroundColor Yellow
    }
    exit 1
}

Write-Host ""

