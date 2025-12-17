# Complete Test Suite - Local, GitHub, Vercel, API
# Run all tests and report status

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  COMPLETE TEST SUITE" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$baseUrl = "https://www.golocapo.com"
$testResults = @()

function Test-Endpoint {
    param($name, $url, $expectedStatus = 200, $expectedContent = $null)
    
    Write-Host "Testing: $name" -ForegroundColor Yellow
    Write-Host "  URL: $url" -ForegroundColor Gray
    
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
        $status = $response.StatusCode
        $content = $response.Content
        
        if ($status -eq $expectedStatus) {
            Write-Host "  ✅ Status: $status (Expected: $expectedStatus)" -ForegroundColor Green
            
            if ($expectedContent) {
                if ($content -match $expectedContent) {
                    Write-Host "  ✅ Content: Found expected pattern" -ForegroundColor Green
                    $testResults += @{Name=$name; Status="PASS"; Details="Status $status, content OK"}
                } else {
                    Write-Host "  ⚠️  Content: Expected pattern not found" -ForegroundColor Yellow
                    $testResults += @{Name=$name; Status="WARN"; Details="Status $status, content mismatch"}
                }
            } else {
                $testResults += @{Name=$name; Status="PASS"; Details="Status $status"}
            }
        } else {
            Write-Host "  ❌ Status: $status (Expected: $expectedStatus)" -ForegroundColor Red
            $testResults += @{Name=$name; Status="FAIL"; Details="Status $status, expected $expectedStatus"}
        }
    } catch {
        Write-Host "  ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
        $testResults += @{Name=$name; Status="FAIL"; Details=$_.Exception.Message}
    }
    Write-Host ""
}

function Test-API {
    param($name, $url, $expectedJson = $null)
    
    Write-Host "Testing API: $name" -ForegroundColor Yellow
    Write-Host "  URL: $url" -ForegroundColor Gray
    
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
        $data = $response.Content | ConvertFrom-Json
        
        if ($response.StatusCode -eq 200) {
            Write-Host "  ✅ Status: 200" -ForegroundColor Green
            
            if ($expectedJson) {
                $match = $true
                foreach ($key in $expectedJson.Keys) {
                    $actualValue = $data.$key
                    $expectedValue = $expectedJson[$key]
                    if ($actualValue -ne $expectedValue) {
                        $match = $false
                        Write-Host "  ⚠️  $key : $actualValue (Expected: $expectedValue)" -ForegroundColor Yellow
                    }
                }
                if ($match) {
                    Write-Host "  ✅ JSON: All fields match" -ForegroundColor Green
                    $testResults += @{Name=$name; Status="PASS"; Details="Status 200, JSON OK"}
                } else {
                    $testResults += @{Name=$name; Status="WARN"; Details="Status 200, JSON mismatch"}
                }
            } else {
                Write-Host "  ✅ JSON: Valid response" -ForegroundColor Green
                $testResults += @{Name=$name; Status="PASS"; Details="Status 200, JSON valid"}
            }
        } else {
            Write-Host "  ❌ Status: $($response.StatusCode)" -ForegroundColor Red
            $testResults += @{Name=$name; Status="FAIL"; Details="Status $($response.StatusCode)"}
        }
    } catch {
        Write-Host "  ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
        $testResults += @{Name=$name; Status="FAIL"; Details=$_.Exception.Message}
    }
    Write-Host ""
}

# ============================================
# LOCAL TESTS
# ============================================
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  LOCAL TESTS" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "1. Checking local files..." -ForegroundColor Yellow
$localTests = @()

# Check index.html
if (Test-Path "index.html") {
    $content = Get-Content "index.html" -Raw
    if ($content -match "GoLoCapo" -and $content -notmatch "Chiara") {
        Write-Host "  ✅ index.html: GoLoCapo content, no Chiara" -ForegroundColor Green
        $localTests += "index.html: PASS"
    } else {
        Write-Host "  ❌ index.html: Content issue" -ForegroundColor Red
        $localTests += "index.html: FAIL"
    }
} else {
    Write-Host "  ❌ index.html: Not found" -ForegroundColor Red
    $localTests += "index.html: NOT FOUND"
}

# Check vercel.json
if (Test-Path "vercel.json") {
    $json = Get-Content "vercel.json" -Raw | ConvertFrom-Json
    Write-Host "  ✅ vercel.json: Valid JSON, $($json.routes.Count) routes" -ForegroundColor Green
    $localTests += "vercel.json: PASS"
} else {
    Write-Host "  ❌ vercel.json: Not found" -ForegroundColor Red
    $localTests += "vercel.json: NOT FOUND"
}

# Check API files
$apiFiles = @("api/checkout-url.mjs", "api/health.mjs", "api/stripe/webhook.mjs")
foreach ($file in $apiFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file : Exists" -ForegroundColor Green
        $localTests += "$file : PASS"
    } else {
        Write-Host "  ❌ $file : Not found" -ForegroundColor Red
        $localTests += "$file : NOT FOUND"
    }
}

Write-Host ""

# ============================================
# GITHUB TESTS
# ============================================
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  GITHUB TESTS" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "2. Checking Git status..." -ForegroundColor Yellow
try {
    $gitStatus = git status --short 2>&1
    $uncommitted = ($gitStatus | Where-Object { $_ -match "^\s*M\s+" }).Count
    $untracked = ($gitStatus | Where-Object { $_ -match "^\?\?" }).Count
    
    Write-Host "  Modified files: $uncommitted" -ForegroundColor Gray
    Write-Host "  Untracked files: $untracked" -ForegroundColor Gray
    
    if ($uncommitted -eq 0 -and $untracked -eq 0) {
        Write-Host "  ✅ Git: All changes committed" -ForegroundColor Green
        $testResults += @{Name="Git Status"; Status="PASS"; Details="All committed"}
    } else {
        Write-Host "  ⚠️  Git: Uncommitted changes" -ForegroundColor Yellow
        $testResults += @{Name="Git Status"; Status="WARN"; Details="$uncommitted modified, $untracked untracked"}
    }
    
    # Check remote
    $remote = git remote get-url origin 2>&1
    if ($remote) {
        Write-Host "  ✅ Remote: $remote" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Remote: Not configured" -ForegroundColor Red
    }
} catch {
    Write-Host "  ❌ Git: Error checking status" -ForegroundColor Red
    $testResults += @{Name="Git Status"; Status="FAIL"; Details=$_.Exception.Message}
}
Write-Host ""

# ============================================
# VERCEL TESTS (Production)
# ============================================
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  VERCEL PRODUCTION TESTS" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "3. Testing production endpoints..." -ForegroundColor Yellow
Write-Host ""

# Homepage
Test-Endpoint "Homepage" "$baseUrl/" 200 "GoLoCapo"

# Pricing Page
Test-Endpoint "Pricing Page" "$baseUrl/pricing" 200 "Get Early Access"

# Portfolio
Test-Endpoint "Portfolio" "$baseUrl/portfolio" 200

# ============================================
# API TESTS
# ============================================
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  API TESTS" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Health API
Test-API "Health Check" "$baseUrl/api/health" @{status="ok"}

# Checkout URL API
Test-API "Checkout URL" "$baseUrl/api/checkout-url" @{success=$true}

# Launch Status API
Test-API "Launch Status" "$baseUrl/api/launch/status"

# ============================================
# SUMMARY
# ============================================
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TEST SUMMARY" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$passed = ($testResults | Where-Object { $_.Status -eq "PASS" }).Count
$warned = ($testResults | Where-Object { $_.Status -eq "WARN" }).Count
$failed = ($testResults | Where-Object { $_.Status -eq "FAIL" }).Count
$total = $testResults.Count

Write-Host "Total Tests: $total" -ForegroundColor White
Write-Host "  ✅ Passed: $passed" -ForegroundColor Green
Write-Host "  ⚠️  Warnings: $warned" -ForegroundColor Yellow
Write-Host "  ❌ Failed: $failed" -ForegroundColor Red
Write-Host ""

if ($failed -eq 0) {
    Write-Host "✅ ALL CRITICAL TESTS PASSED" -ForegroundColor Green
} else {
    Write-Host "❌ SOME TESTS FAILED - See details above" -ForegroundColor Red
}

Write-Host "`nLocal File Tests:" -ForegroundColor Cyan
foreach ($test in $localTests) {
    Write-Host "  $test" -ForegroundColor Gray
}

Write-Host "`nDetailed Results:" -ForegroundColor Cyan
foreach ($result in $testResults) {
    $color = switch ($result.Status) {
        "PASS" { "Green" }
        "WARN" { "Yellow" }
        "FAIL" { "Red" }
    }
    Write-Host "  [$($result.Status)] $($result.Name): $($result.Details)" -ForegroundColor $color
}

Write-Host ""

