# Test Stripe Payment Setup
# Run this after Vercel deployment completes

Write-Host "`n=== STRIPE PAYMENT SETUP TEST ===" -ForegroundColor Cyan
Write-Host "Testing after Vercel deployment...`n" -ForegroundColor Yellow

$baseUrl = "https://www.golocapo.com"
$expectedCheckoutUrl = "https://buy.stripe.com/test_dRm14mcasaIZ6450rk1RC00"

# Test 1: Checkout URL API
Write-Host "Test 1: Checkout URL API" -ForegroundColor Green
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/checkout-url" -UseBasicParsing -ErrorAction Stop
    $data = $response.Content | ConvertFrom-Json
    
    if ($data.success -and $data.url -eq $expectedCheckoutUrl) {
        Write-Host "  ✅ PASS: Checkout URL returned correctly" -ForegroundColor Green
        Write-Host "  URL: $($data.url)" -ForegroundColor Gray
    } elseif ($data.success) {
        Write-Host "  ⚠️  WARNING: URL mismatch" -ForegroundColor Yellow
        Write-Host "  Expected: $expectedCheckoutUrl" -ForegroundColor Gray
        Write-Host "  Got: $($data.url)" -ForegroundColor Gray
    } else {
        Write-Host "  ❌ FAIL: API returned success=false" -ForegroundColor Red
        Write-Host "  Error: $($data.error)" -ForegroundColor Gray
    }
} catch {
    Write-Host "  ❌ FAIL: Request failed" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Gray
}

Write-Host ""

# Test 2: Health Check (verify Stripe is detected)
Write-Host "Test 2: Health Check (Stripe detection)" -ForegroundColor Green
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/health" -UseBasicParsing -ErrorAction Stop
    $data = $response.Content | ConvertFrom-Json
    
    if ($data.services.stripe) {
        Write-Host "  ✅ PASS: Stripe detected in health check" -ForegroundColor Green
    } else {
        Write-Host "  ❌ FAIL: Stripe not detected" -ForegroundColor Red
        Write-Host "  Services: $($data.services | ConvertTo-Json -Compress)" -ForegroundColor Gray
    }
} catch {
    Write-Host "  ❌ FAIL: Health check failed" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Gray
}

Write-Host ""

# Test 3: Pricing Page (check if accessible)
Write-Host "Test 3: Pricing Page Accessibility" -ForegroundColor Green
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/pricing" -UseBasicParsing -ErrorAction Stop
    if ($response.StatusCode -eq 200) {
        Write-Host "  ✅ PASS: Pricing page accessible" -ForegroundColor Green
        if ($response.Content -match "Get Early Access") {
            Write-Host "  ✅ PASS: Checkout button found on page" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  WARNING: Checkout button not found" -ForegroundColor Yellow
        }
    } else {
        Write-Host "  ❌ FAIL: Pricing page returned status $($response.StatusCode)" -ForegroundColor Red
    }
} catch {
    Write-Host "  ❌ FAIL: Pricing page not accessible" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Gray
}

Write-Host ""

# Summary
Write-Host "=== TEST SUMMARY ===" -ForegroundColor Cyan
Write-Host "`nNext Steps:" -ForegroundColor Yellow
Write-Host "1. Visit: $baseUrl/pricing" -ForegroundColor White
Write-Host "2. Click 'Get Early Access — €49' button" -ForegroundColor White
Write-Host "3. Verify redirects to: $expectedCheckoutUrl" -ForegroundColor White
Write-Host "4. Test payment with card: 4242 4242 4242 4242" -ForegroundColor White
Write-Host "`nOptional: Set STRIPE_WEBHOOK_SECRET for payment tracking" -ForegroundColor Gray
Write-Host ""

