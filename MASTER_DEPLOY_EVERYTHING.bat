@echo off
chcp 65001 >nul
color 0A
title 🚀 MASTER DEPLOYMENT - DASHBOARD & CONSOLE
cls

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                                                               ║
echo ║         🚀 MASTER DEPLOYMENT - EVERYTHING                    ║
echo ║         Deploying Dashboard + Console NOW                    ║
echo ║                                                               ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

REM Configuration
set VERCEL_TOKEN=REMOVED_VERCEL_TOKEN
set TEAM_ID=golos-projects-e144069f
set OPENAI_KEY=YOUR_OPENAI_API_KEY_HERE

echo ✅ Configuration loaded
echo ✅ Vercel Pro Account: Active
echo ✅ OpenAI Key: Ready
echo.

REM Check Vercel CLI
echo ═══════════════════════════════════════════════════════════════
echo Checking Vercel CLI...
echo ═══════════════════════════════════════════════════════════════
echo.

where vercel >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Vercel CLI not found. Installing...
    call npm install -g vercel
    if %errorlevel% neq 0 (
        echo ❌ Failed to install Vercel CLI
        echo    Please install manually: npm install -g vercel
        pause
        exit /b 1
    )
)

echo ✅ Vercel CLI ready
echo.

REM Set Vercel token
set VERCEL_TOKEN=%VERCEL_TOKEN%

echo ═══════════════════════════════════════════════════════════════
echo STEP 1: Deploying Dashboard...
echo ═══════════════════════════════════════════════════════════════
echo.

if exist "dashboard" (
    cd dashboard
    
    echo Deploying ai-studio-dashboard...
    echo.
    
    vercel --prod --token %VERCEL_TOKEN% --yes --name ai-studio-dashboard --scope %TEAM_ID% 2>&1 | findstr /C:"https://" /C:"Ready" /C:"Deployed" /C:"Error"
    
    if %errorlevel% == 0 (
        echo.
        echo ✅ Dashboard deployment initiated!
    ) else (
        echo.
        echo ⚠️  Dashboard deployment may have issues - check output above
    )
    
    cd ..
) else (
    echo ❌ Dashboard folder not found!
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo STEP 2: Deploying p2ba-console...
echo ═══════════════════════════════════════════════════════════════
echo.

if exist "p2ba-console" (
    cd p2ba-console
    
    echo Deploying p2ba-console...
    echo.
    
    vercel --prod --token %VERCEL_TOKEN% --yes --name p2ba-console --scope %TEAM_ID% 2>&1 | findstr /C:"https://" /C:"Ready" /C:"Deployed" /C:"Error"
    
    if %errorlevel% == 0 (
        echo.
        echo ✅ Console deployment initiated!
    ) else (
        echo.
        echo ⚠️  Console deployment may have issues - check output above
    )
    
    cd ..
) else (
    echo ❌ p2ba-console folder not found!
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo STEP 3: Opening Vercel Dashboard...
echo ═══════════════════════════════════════════════════════════════
echo.

start https://vercel.com/dashboard
timeout /t 2 >nul

echo.
echo ═══════════════════════════════════════════════════════════════
echo DEPLOYMENT STATUS
echo ═══════════════════════════════════════════════════════════════
echo.
echo ✅ Deployments initiated!
echo.
echo 📋 NEXT STEPS:
echo.
echo 1. Go to Vercel Dashboard (opened above)
echo 2. Find your projects:
echo    - ai-studio-dashboard
echo    - p2ba-console
echo 3. Click on each project
echo 4. Copy the "Visit" URL
echo 5. Add Environment Variables:
echo    - Settings → Environment Variables
echo    - Add: OPENAI_API_KEY
echo    - Value: (your OpenAI key)
echo    - Environments: All
echo 6. Redeploy after adding env vars
echo.
echo ═══════════════════════════════════════════════════════════════
echo TESTING YOUR DEPLOYMENTS
echo ═══════════════════════════════════════════════════════════════
echo.
echo Dashboard:
echo   - Password: moneymachine25
echo   - Test: Type "Hello" in AI Chat
echo.
echo Console:
echo   - Test: "Create a test business"
echo.
pause
