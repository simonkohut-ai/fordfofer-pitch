# 🔧 AUTO FIX DASHBOARD - Root Directory + Redeploy
# This script automatically fixes the dashboard Root Directory issue

$ErrorActionPreference = "Stop"

# Configuration
$VERCEL_TOKEN = "REMOVED_VERCEL_TOKEN"
$PROJECT_NAME = "ai-studio"
$TEAM_ID = "golos-projects-e144069f"
$ROOT_DIRECTORY = "dashboard"

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                                                               ║" -ForegroundColor Green
Write-Host "║         🔧 AUTO FIX DASHBOARD ROOT DIRECTORY               ║" -ForegroundColor Green
Write-Host "║                                                               ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

# Set Vercel token
$env:VERCEL_TOKEN = $VERCEL_TOKEN

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

# Get project ID
Write-Host "Getting project information..." -ForegroundColor Cyan
$projectInfo = vercel projects ls --token $VERCEL_TOKEN --scope $TEAM_ID 2>&1 | Out-String

if ($projectInfo -match $PROJECT_NAME) {
    Write-Host "✅ Found project: $PROJECT_NAME" -ForegroundColor Green
} else {
    Write-Host "⚠️ Project $PROJECT_NAME not found via CLI" -ForegroundColor Yellow
    Write-Host "Will use API method instead..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "Updating Root Directory via Vercel API..." -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Update project settings via API
$headers = @{
    "Authorization" = "Bearer $VERCEL_TOKEN"
    "Content-Type" = "application/json"
}

$body = @{
    rootDirectory = $ROOT_DIRECTORY
} | ConvertTo-Json

try {
    $projectId = $PROJECT_NAME
    $apiUrl = "https://api.vercel.com/v9/projects/$projectId?teamId=$TEAM_ID"
    
    Write-Host "Updating Root Directory to: $ROOT_DIRECTORY" -ForegroundColor Yellow
    $response = Invoke-RestMethod -Uri $apiUrl -Method PATCH -Headers $headers -Body $body
    
    Write-Host "✅ Root Directory updated successfully!" -ForegroundColor Green
} catch {
    Write-Host "⚠️ API update failed, using CLI method..." -ForegroundColor Yellow
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "Redeploying project..." -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Navigate to dashboard folder and redeploy
if (Test-Path "dashboard") {
    Push-Location "dashboard"
    
    Write-Host "Redeploying $PROJECT_NAME..." -ForegroundColor Yellow
    
    # Remove old .vercel folder to force fresh deployment
    if (Test-Path ".vercel") {
        Remove-Item -Recurse -Force ".vercel" -ErrorAction SilentlyContinue
    }
    
    # Deploy with new settings
    $deployResult = vercel --prod --token $VERCEL_TOKEN --yes --scope $TEAM_ID 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Project redeployed successfully!" -ForegroundColor Green
        
        # Extract URL from output
        $url = $deployResult | Select-String -Pattern "https://.*\.vercel\.app" | Select-Object -First 1
        if ($url) {
            Write-Host "Dashboard URL: $($url.Matches.Value)" -ForegroundColor Cyan
            $global:DashboardURL = $url.Matches.Value
        }
    } else {
        Write-Host "⚠️ Deployment had issues" -ForegroundColor Yellow
        Write-Host $deployResult
    }
    
    Pop-Location
} else {
    Write-Host "❌ Dashboard folder not found!" -ForegroundColor Red
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "✅ FIX COMPLETE!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""

Write-Host "📋 NEXT STEPS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to Vercel Dashboard:" -ForegroundColor White
Write-Host "   https://vercel.com/dashboard" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Click on 'ai-studio' project" -ForegroundColor White
Write-Host ""
Write-Host "3. Go to Settings → General" -ForegroundColor White
Write-Host ""
Write-Host "4. Verify Root Directory = 'dashboard'" -ForegroundColor White
Write-Host ""
Write-Host "5. If not set, manually change it to 'dashboard'" -ForegroundColor White
Write-Host ""
Write-Host "6. Redeploy from Deployments tab" -ForegroundColor White
Write-Host ""

if ($global:DashboardURL) {
    Write-Host "7. Test Dashboard:" -ForegroundColor White
    Write-Host "   $($global:DashboardURL)" -ForegroundColor Cyan
    Start-Process $global:DashboardURL
}

Write-Host ""
Write-Host "Opening Vercel Dashboard..." -ForegroundColor Cyan
Start-Process "https://vercel.com/dashboard"
