# 🚀 SHIP.ps1 - Local Development & Testing Script
# One-command setup for promo + payments + launch pipeline

Write-Host "🚀 AI Marketing Studio - Local Dev Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "📦 Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion found" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Install from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check Vercel CLI
Write-Host "📦 Checking Vercel CLI..." -ForegroundColor Yellow
try {
    $vercelVersion = vercel --version
    Write-Host "✅ Vercel CLI $vercelVersion found" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
    Write-Host "✅ Vercel CLI installed" -ForegroundColor Green
}

# Install dependencies
Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "✅ node_modules exists, skipping install" -ForegroundColor Green
} else {
    npm install
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
}

# Check environment variables
Write-Host ""
Write-Host "🔐 Environment Variables Check:" -ForegroundColor Yellow

$envVars = @{
    "STRIPE_CHECKOUT_URL" = "Stripe Payment Link (required for checkout)"
    "STRIPE_WEBHOOK_SECRET" = "Stripe webhook secret (required for webhooks)"
    "OPENAI_API_KEY" = "OpenAI API key (optional, for AI features)"
    "META_INTEGRATION_ENABLED" = "Meta integration flag (optional, default: false)"
    "META_POSTING_ENABLED" = "Meta posting flag (optional, default: false)"
}

$missingVars = @()
foreach ($var in $envVars.Keys) {
    $value = [Environment]::GetEnvironmentVariable($var, "Process")
    if ($value) {
        Write-Host "  ✅ $var = [SET]" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  $var = [NOT SET]" -ForegroundColor Yellow
        Write-Host "     $($envVars[$var])" -ForegroundColor Gray
        if ($var -eq "STRIPE_CHECKOUT_URL" -or $var -eq "STRIPE_WEBHOOK_SECRET") {
            $missingVars += $var
        }
    }
}

if ($missingVars.Count -gt 0) {
    Write-Host ""
    Write-Host "⚠️  Required env vars not set. Set them with:" -ForegroundColor Yellow
    foreach ($var in $missingVars) {
        Write-Host "   `$env:$var=`"YOUR_VALUE`"" -ForegroundColor Cyan
    }
    Write-Host ""
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y") {
        exit 1
    }
}

# Start dev server
Write-Host ""
Write-Host "🚀 Starting dev server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "📍 Local URLs:" -ForegroundColor Cyan
Write-Host "   Prelaunch:    http://localhost:3000/prelaunch" -ForegroundColor White
Write-Host "   Pricing:      http://localhost:3000/pricing" -ForegroundColor White
Write-Host "   Dashboard:   http://localhost:3000/dashboard" -ForegroundColor White
Write-Host "   War Room:    http://localhost:3000/war-room" -ForegroundColor White
Write-Host "   Promo Kit:   http://localhost:3000/promo-kit" -ForegroundColor White
Write-Host "   Survey:      http://localhost:3000/survey" -ForegroundColor White
Write-Host "   Social Kit:  http://localhost:3000/social-kit" -ForegroundColor White
Write-Host ""
Write-Host "💡 Console Commands:" -ForegroundColor Cyan
Write-Host "   Health:       curl http://localhost:3000/api/health" -ForegroundColor Gray
Write-Host "   Revenue:      curl http://localhost:3000/api/leads/status" -ForegroundColor Gray
Write-Host "   Launch Email: curl -X POST http://localhost:3000/api/launch/send-launch-email -H 'Content-Type: application/json' -d '{\"force\":\"true\"}'" -ForegroundColor Gray
Write-Host ""
Write-Host "💡 Stripe Testing:" -ForegroundColor Cyan
Write-Host "   stripe listen --forward-to localhost:3000/api/stripe/webhook" -ForegroundColor Gray
Write-Host ""
Write-Host "   Press Ctrl+C to stop the server" -ForegroundColor White
Write-Host ""

# Run dev server
npm run dev

