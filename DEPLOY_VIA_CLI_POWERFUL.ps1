# 🚀 POWERFUL AUTO DEPLOYMENT - Dashboard + Console
# This script deploys everything automatically

$ErrorActionPreference = "Stop"

# Configuration
$VERCEL_TOKEN = "REMOVED_VERCEL_TOKEN"
$OPENAI_KEY = "YOUR_OPENAI_API_KEY_HERE"
$TEAM_ID = "golos-projects-e144069f"

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                                                               ║" -ForegroundColor Green
Write-Host "║         🚀 MASTER DEPLOYMENT - EVERYTHING                    ║" -ForegroundColor Green
Write-Host "║         Deploying Dashboard + Console NOW                     ║" -ForegroundColor Green
Write-Host "║                                                               ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

# Check Vercel CLI
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

# Set environment
$env:VERCEL_TOKEN = $VERCEL_TOKEN

# Deploy Dashboard
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "Deploying Dashboard..." -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

if (Test-Path "dashboard") {
    Push-Location "dashboard"
    
    Write-Host "Deploying ai-studio-dashboard..." -ForegroundColor Yellow
    
    $dashboardResult = vercel --prod --token $VERCEL_TOKEN --yes --name ai-studio-dashboard --scope $TEAM_ID 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Dashboard deployed successfully!" -ForegroundColor Green
        
        # Extract URL from output
        $dashboardUrl = $dashboardResult | Select-String -Pattern "https://.*\.vercel\.app" | Select-Object -First 1
        if ($dashboardUrl) {
            Write-Host "Dashboard URL: $($dashboardUrl.Matches.Value)" -ForegroundColor Cyan
            $global:DashboardURL = $dashboardUrl.Matches.Value
        }
    } else {
        Write-Host "⚠️ Dashboard deployment had issues" -ForegroundColor Yellow
        Write-Host $dashboardResult
    }
    
    Pop-Location
} else {
    Write-Host "❌ Dashboard folder not found!" -ForegroundColor Red
}

Write-Host ""

# Deploy Console
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "Deploying p2ba-console..." -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

if (Test-Path "p2ba-console") {
    Push-Location "p2ba-console"
    
    Write-Host "Deploying p2ba-console..." -ForegroundColor Yellow
    
    $consoleResult = vercel --prod --token $VERCEL_TOKEN --yes --name p2ba-console --scope $TEAM_ID 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Console deployed successfully!" -ForegroundColor Green
        
        # Extract URL from output
        $consoleUrl = $consoleResult | Select-String -Pattern "https://.*\.vercel\.app" | Select-Object -First 1
        if ($consoleUrl) {
            Write-Host "Console URL: $($consoleUrl.Matches.Value)" -ForegroundColor Cyan
            $global:ConsoleURL = $consoleUrl.Matches.Value
        }
    } else {
        Write-Host "⚠️ Console deployment had issues" -ForegroundColor Yellow
        Write-Host $consoleResult
    }
    
    Pop-Location
} else {
    Write-Host "❌ p2ba-console folder not found!" -ForegroundColor Red
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "Opening Vercel Dashboard..." -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Start-Process "https://vercel.com/dashboard"

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "✅ DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""

if ($global:DashboardURL) {
    Write-Host "Dashboard URL: $($global:DashboardURL)" -ForegroundColor Cyan
    Start-Process $global:DashboardURL
}

if ($global:ConsoleURL) {
    Write-Host "Console URL: $($global:ConsoleURL)" -ForegroundColor Cyan
    Start-Process $global:ConsoleURL
}

Write-Host ""
Write-Host "📋 NEXT STEPS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Add Environment Variables in Vercel:" -ForegroundColor White
Write-Host "   - Go to each project → Settings → Environment Variables" -ForegroundColor White
Write-Host "   - Add: OPENAI_API_KEY" -ForegroundColor White
Write-Host "   - Value: (your OpenAI key)" -ForegroundColor White
Write-Host "   - Environments: All" -ForegroundColor White
Write-Host ""
Write-Host "2. Redeploy after adding env vars" -ForegroundColor White
Write-Host ""
Write-Host "3. Test:" -ForegroundColor White
Write-Host "   Dashboard: Password = moneymachine25" -ForegroundColor White
Write-Host "   Console: Try 'Create a test business'" -ForegroundColor White
Write-Host ""
