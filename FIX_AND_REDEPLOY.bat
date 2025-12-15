@echo off
chcp 65001 >nul
color 0A
title 🔧 FIX DASHBOARD AUTO
cls

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                                                               ║
echo ║         🔧 AUTO FIX DASHBOARD + REDEPLOY                     ║
echo ║                                                               ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

set VERCEL_TOKEN=REMOVED_VERCEL_TOKEN
set TEAM_ID=golos-projects-e144069f

echo Step 1: Checking Vercel CLI...
where vercel >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing Vercel CLI...
    call npm install -g vercel
)

echo.
echo Step 2: Redeploying Dashboard from dashboard folder...
echo.

if exist "dashboard" (
    cd dashboard
    
    echo Removing old .vercel folder...
    if exist ".vercel" (
        rmdir /s /q ".vercel" 2>nul
    )
    
    echo.
    echo Deploying with Root Directory = dashboard...
    echo.
    
    vercel --prod --token %VERCEL_TOKEN% --yes --scope %TEAM_ID%
    
    if %errorlevel% == 0 (
        echo.
        echo ✅ Dashboard redeployed!
    ) else (
        echo.
        echo ⚠️ Deployment had issues - check output above
    )
    
    cd ..
) else (
    echo ❌ Dashboard folder not found!
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo Step 3: Opening Vercel Dashboard for verification...
echo ═══════════════════════════════════════════════════════════════
echo.

start https://vercel.com/dashboard

timeout /t 2 >nul

echo Opening Dashboard URL...
start https://ai-studio-sandy-five.vercel.app

echo.
echo ═══════════════════════════════════════════════════════════════
echo ✅ FIX COMPLETE!
echo ═══════════════════════════════════════════════════════════════
echo.
echo IMPORTANT: Verify Root Directory in Vercel:
echo   1. Go to: ai-studio project
echo   2. Settings → General → Root Directory
echo   3. Should be: dashboard
echo   4. If not, change it manually and redeploy
echo.
pause
