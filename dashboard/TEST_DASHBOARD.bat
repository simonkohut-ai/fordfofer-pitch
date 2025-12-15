@echo off
REM 🦄 Test Dashboard - Health Check & Get Link
color 0B
title 🧪 TEST DASHBOARD & GET LINK
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         🧪 DASHBOARD HEALTH CHECK & TESTING               ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ HEALTH CHECK                                          ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

set "allGood=1"

if exist "index.html" (
    echo ✅ index.html - OK
) else (
    echo ❌ index.html - MISSING
    set "allGood=0"
)

if exist "dashboard.js" (
    echo ✅ dashboard.js - OK
) else (
    echo ❌ dashboard.js - MISSING
    set "allGood=0"
)

if exist "styles.css" (
    echo ✅ styles.css - OK
) else (
    echo ❌ styles.css - MISSING
    set "allGood=0"
)

if exist "auth.js" (
    echo ✅ auth.js - OK
) else (
    echo ❌ auth.js - MISSING
    set "allGood=0"
)

if exist "api\agent.mjs" (
    echo ✅ api/agent.mjs - OK
) else (
    echo ❌ api/agent.mjs - MISSING
    set "allGood=0"
)

if exist "vercel.json" (
    echo ✅ vercel.json - OK
) else (
    echo ❌ vercel.json - MISSING
    set "allGood=0"
)

echo.
if "%allGood%"=="1" (
    echo ✅ ALL FILES PRESENT - Ready for deployment!
) else (
    echo ❌ SOME FILES MISSING - Check above
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  🔗 GET DASHBOARD LINK                                     ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo Checking Vercel deployments...
echo.

vercel ls 2>nul
if %errorlevel% == 0 (
    echo.
    echo ✅ Found deployments above!
    echo.
    echo Look for the URL marked "Production"
    echo Format: https://ai-studio-dashboard-*.vercel.app
) else (
    echo.
    echo ⚠️  No deployments found or not logged in
    echo.
    echo To get your dashboard link:
    echo   1. Go to: https://vercel.com/dashboard
    echo   2. Find project: ai-studio-dashboard
    echo   3. Copy the production URL
    echo.
    echo Or deploy now:
    echo   Run: DEPLOY_FIXED.bat
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  🧪 TESTING CHECKLIST                                     ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Once you have your dashboard URL:
echo.
echo [ ] 1. Open URL in browser
echo [ ] 2. Password prompt appears
echo [ ] 3. Enter: moneymachine25
echo [ ] 4. Dashboard loads
echo [ ] 5. Click "AI Chat" in sidebar
echo [ ] 6. Send test message: "Hello"
echo [ ] 7. Should get response from API
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  📋 CONFIGURATION                                         ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Password: moneymachine25
echo API Endpoint: /api/agent
echo CORS: Enabled
echo Status: Ready
echo.

echo Opening Vercel Dashboard...
start https://vercel.com/dashboard
timeout /t 2 /nobreak >nul

echo.
pause
