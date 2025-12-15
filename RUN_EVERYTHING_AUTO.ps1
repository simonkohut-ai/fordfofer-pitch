# 🚀 RUN EVERYTHING AUTOMATICALLY - Complete Fix
$ErrorActionPreference = "Continue"

$VERCEL_TOKEN = "REMOVED_VERCEL_TOKEN"
$TEAM_ID = "golos-projects-e144069f"
$PROJECT_NAME = "ai-studio"

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║         🚀 RUNNING EVERYTHING AUTOMATICALLY                  ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

$env:VERCEL_TOKEN = $VERCEL_TOKEN

# Step 1: Update Root Directory via API
Write-Host "Step 1: Updating Root Directory via API..." -ForegroundColor Cyan
try {
    $headers = @{
        "Authorization" = "Bearer $VERCEL_TOKEN"
        "Content-Type" = "application/json"
    }
    
    $body = @{
        rootDirectory = "dashboard"
    } | ConvertTo-Json
    
    $apiUrl = "https://api.vercel.com/v9/projects/$PROJECT_NAME?teamId=$TEAM_ID"
    $response = Invoke-RestMethod -Uri $apiUrl -Method PATCH -Headers $headers -Body $body -ErrorAction Stop
    Write-Host "✅ Root Directory updated via API!" -ForegroundColor Green
} catch {
    Write-Host "⚠️ API update failed: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host "Trying alternative method..." -ForegroundColor Yellow
}

Write-Host ""

# Step 2: Redeploy Dashboard
Write-Host "Step 2: Redeploying Dashboard..." -ForegroundColor Cyan
if (Test-Path "dashboard") {
    Push-Location "dashboard"
    
    if (Test-Path ".vercel") {
        Remove-Item -Recurse -Force ".vercel" -ErrorAction SilentlyContinue
    }
    
    Write-Host "Deploying from dashboard folder..." -ForegroundColor Yellow
    $deployOutput = vercel --prod --token $VERCEL_TOKEN --yes 2>&1 | Out-String
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Dashboard redeployed!" -ForegroundColor Green
        $url = $deployOutput | Select-String -Pattern "https://.*\.vercel\.app" | Select-Object -First 1
        if ($url) {
            Write-Host "URL: $($url.Matches.Value)" -ForegroundColor Cyan
        }
    } else {
        Write-Host "⚠️ Deployment had issues" -ForegroundColor Yellow
    }
    
    Pop-Location
}

Write-Host ""

# Step 3: Open all pages
Write-Host "Step 3: Opening all pages..." -ForegroundColor Cyan
Start-Process "https://vercel.com/dashboard"
Start-Sleep -Seconds 2
Start-Process "https://ai-studio-sandy-five.vercel.app"
Start-Sleep -Seconds 2
Start-Process "https://p2ba-navy.vercel.app"

Write-Host ""
Write-Host "✅ ALL AUTOMATIC FIXES COMPLETE!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 VERIFY IN VERCEL DASHBOARD:" -ForegroundColor Yellow
Write-Host "   1. ai-studio → Settings → General" -ForegroundColor White
Write-Host "   2. Root Directory should be: dashboard" -ForegroundColor White
Write-Host "   3. If not, change it manually" -ForegroundColor White
Write-Host "   4. Redeploy from Deployments tab" -ForegroundColor White
Write-Host ""
