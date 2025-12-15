# REDEPLOY EVERYTHING - Dashboard + Console
$ErrorActionPreference = "Continue"

$VERCEL_TOKEN = "REMOVED_VERCEL_TOKEN"
$TEAM_ID = "golos-projects-e144069f"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "REDEPLOYING EVERYTHING" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

$env:VERCEL_TOKEN = $VERCEL_TOKEN

# Redeploy Dashboard
Write-Host "Redeploying Dashboard..." -ForegroundColor Cyan
if (Test-Path "dashboard") {
    Push-Location "dashboard"
    
    if (Test-Path ".vercel") {
        Remove-Item -Recurse -Force ".vercel" -ErrorAction SilentlyContinue
    }
    
    Write-Host "Deploying ai-studio-dashboard..." -ForegroundColor Yellow
    vercel --prod --token $VERCEL_TOKEN --yes 2>&1 | Out-Null
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Dashboard redeployed!" -ForegroundColor Green
    } else {
        Write-Host "Dashboard deployment had issues" -ForegroundColor Yellow
    }
    
    Pop-Location
}

Write-Host ""

# Redeploy Console
Write-Host "Redeploying Console..." -ForegroundColor Cyan
if (Test-Path "p2ba-console") {
    Push-Location "p2ba-console"
    
    if (Test-Path ".vercel") {
        Remove-Item -Recurse -Force ".vercel" -ErrorAction SilentlyContinue
    }
    
    Write-Host "Deploying p2ba-console..." -ForegroundColor Yellow
    vercel --prod --token $VERCEL_TOKEN --yes 2>&1 | Out-Null
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Console redeployed!" -ForegroundColor Green
    } else {
        Write-Host "Console deployment had issues" -ForegroundColor Yellow
    }
    
    Pop-Location
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "REDEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Opening Vercel Dashboard to verify..." -ForegroundColor Cyan
Start-Process "https://vercel.com/dashboard"
Start-Sleep -Seconds 2

Write-Host "Opening Dashboard URL..." -ForegroundColor Cyan
Start-Process "https://ai-studio-sandy-five.vercel.app"
Start-Sleep -Seconds 2

Write-Host "Opening Console URL..." -ForegroundColor Cyan
Start-Process "https://p2ba-navy.vercel.app"

Write-Host ""
Write-Host "IMPORTANT: Verify Root Directory in Vercel:" -ForegroundColor Yellow
Write-Host "  ai-studio → Settings → General → Root Directory = dashboard" -ForegroundColor Cyan
Write-Host ""
