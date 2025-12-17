# Check Stripe Payment Status
# Requires STRIPE_SECRET_KEY in environment

param(
    [string]$StripeKey = $env:STRIPE_SECRET_KEY
)

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  STRIPE STATUS CHECK" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

if (-not $StripeKey) {
    Write-Host "❌ STRIPE_SECRET_KEY not set" -ForegroundColor Red
    Write-Host "`nSet it in Vercel or locally:" -ForegroundColor Yellow
    Write-Host "  Vercel: Settings → Environment Variables" -ForegroundColor Gray
    Write-Host "  Local:  `$env:STRIPE_SECRET_KEY='sk_test_...'" -ForegroundColor Gray
    exit 1
}

try {
    # Check Payment Links
    Write-Host "Checking Payment Links..." -ForegroundColor Yellow
    $paymentLinks = Invoke-RestMethod -Uri "https://api.stripe.com/v1/payment_links" `
        -Method Get `
        -Headers @{
            Authorization = "Bearer $StripeKey"
        }
    
    Write-Host "  ✅ Found $($paymentLinks.data.Count) payment links" -ForegroundColor Green
    foreach ($link in $paymentLinks.data) {
        Write-Host "    - $($link.url) (Active: $($link.active))" -ForegroundColor Gray
    }
    
    # Check Customers (last 5)
    Write-Host "`nChecking Recent Customers..." -ForegroundColor Yellow
    $customers = Invoke-RestMethod -Uri "https://api.stripe.com/v1/customers?limit=5" `
        -Method Get `
        -Headers @{
            Authorization = "Bearer $StripeKey"
        }
    
    Write-Host "  ✅ Found $($customers.data.Count) recent customers" -ForegroundColor Green
    foreach ($customer in $customers.data) {
        $email = if ($customer.email) { $customer.email } else { "No email" }
        Write-Host "    - $email (Created: $($customer.created))" -ForegroundColor Gray
    }
    
    # Check Payment Intents (last 5)
    Write-Host "`nChecking Recent Payments..." -ForegroundColor Yellow
    $payments = Invoke-RestMethod -Uri "https://api.stripe.com/v1/payment_intents?limit=5" `
        -Method Get `
        -Headers @{
            Authorization = "Bearer $StripeKey"
        }
    
    Write-Host "  ✅ Found $($payments.data.Count) recent payments" -ForegroundColor Green
    foreach ($payment in $payments.data) {
        $amount = [math]::Round($payment.amount / 100, 2)
        $status = $payment.status
        Write-Host "    - €$amount ($status)" -ForegroundColor Gray
    }
    
    Write-Host "`n✅ Stripe Status Check Complete" -ForegroundColor Green
    
} catch {
    Write-Host "`n❌ ERROR: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody" -ForegroundColor Gray
    }
    exit 1
}

