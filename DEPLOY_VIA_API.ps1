# 🚀 Auto Deploy Dashboard + p2ba-console via Vercel API
# This script uses Vercel API to deploy both projects

$ErrorActionPreference = "Stop"

# Configuration
$VERCEL_TOKEN = "REMOVED_VERCEL_TOKEN"
$OPENAI_KEY = "YOUR_OPENAI_API_KEY_HERE"
$TEAM_ID = "golos-projects-e144069f"

Write-Host "🚀 Starting Auto Deployment..." -ForegroundColor Green
Write-Host ""

# Check if Vercel CLI is installed
Write-Host "Checking Vercel CLI..." -ForegroundColor Cyan
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install Vercel CLI" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Vercel CLI ready" -ForegroundColor Green
Write-Host ""

# Set Vercel token
$env:VERCEL_TOKEN = $VERCEL_TOKEN

# Deploy Dashboard
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "Deploying Dashboard..." -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Push-Location "dashboard"

# Create vercel.json if it doesn't exist
if (-not (Test-Path "vercel.json")) {
    $vercelConfig = @{
        version = 2
        routes = @(
            @{
                src = "/api/agent"
                dest = "/api/agent.mjs"
            },
            @{
                src = "/(.*)"
                dest = "/`$1"
            }
        )
    } | ConvertTo-Json -Depth 10
    $vercelConfig | Out-File -FilePath "vercel.json" -Encoding UTF8
}

# Deploy dashboard
Write-Host "Deploying ai-studio-dashboard..." -ForegroundColor Yellow
vercel --prod --token $VERCEL_TOKEN --yes --name ai-studio-dashboard --scope $TEAM_ID

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dashboard deployed successfully!" -ForegroundColor Green
} else {
    Write-Host "⚠️ Dashboard deployment had issues" -ForegroundColor Yellow
}

Pop-Location
Write-Host ""

# Deploy p2ba-console
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "Deploying p2ba-console..." -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Push-Location "p2ba-console"

Write-Host "Deploying p2ba-console..." -ForegroundColor Yellow
vercel --prod --token $VERCEL_TOKEN --yes --name p2ba-console --scope $TEAM_ID

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ p2ba-console deployed successfully!" -ForegroundColor Green
} else {
    Write-Host "⚠️ p2ba-console deployment had issues" -ForegroundColor Yellow
}

Pop-Location
Write-Host ""

# Add environment variables via API
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "Adding Environment Variables..." -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "⚠️ Note: Environment variables need to be added manually in Vercel Dashboard" -ForegroundColor Yellow
Write-Host ""
Write-Host "Go to:" -ForegroundColor Cyan
Write-Host "  1. https://vercel.com/dashboard" -ForegroundColor White
Write-Host "  2. ai-studio-dashboard → Settings → Environment Variables" -ForegroundColor White
Write-Host "  3. Add OPENAI_API_KEY: $OPENAI_KEY" -ForegroundColor White
Write-Host "  4. p2ba-console → Settings → Environment Variables" -ForegroundColor White
Write-Host "  5. Add OPENAI_API_KEY: $OPENAI_KEY" -ForegroundColor White
Write-Host ""

Write-Host "✅ Deployment Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Add OPENAI_API_KEY to both projects in Vercel" -ForegroundColor White
Write-Host "  2. Redeploy both projects" -ForegroundColor White
Write-Host "  3. Test your deployed URLs" -ForegroundColor White
Write-Host ""
Write-Host "Done!"
