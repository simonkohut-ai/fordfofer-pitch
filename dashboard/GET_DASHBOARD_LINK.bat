@echo off
REM 🦄 Get Dashboard Link - Health Check & Testing
color 0B
title 🔍 HEALTH CHECK & DASHBOARD LINK
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         🔍 HEALTH CHECK & DASHBOARD LINK                 ║
echo ║         Testing & Getting Your URL                       ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 1: Health Check                                    ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo Checking files...
if exist "index.html" (
    echo ✅ index.html
) else (
    echo ❌ index.html missing
)

if exist "dashboard.js" (
    echo ✅ dashboard.js
) else (
    echo ❌ dashboard.js missing
)

if exist "api\agent.mjs" (
    echo ✅ api/agent.mjs
) else (
    echo ❌ api/agent.mjs missing
)

if exist "vercel.json" (
    echo ✅ vercel.json
) else (
    echo ❌ vercel.json missing
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 2: Get Dashboard Link                               ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo Checking Vercel deployments...
vercel ls 2>nul
if %errorlevel% == 0 (
    echo.
    echo ✅ Vercel CLI connected
    echo.
    echo Your deployments are listed above.
    echo Copy the production URL (marked with "Production")
) else (
    echo.
    echo ⚠️  Vercel CLI not connected or no deployments found
    echo.
    echo To get your dashboard link:
    echo   1. Go to: https://vercel.com/dashboard
    echo   2. Find project: ai-studio-dashboard
    echo   3. Copy the production URL
    echo.
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 3: Test Dashboard                                   ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo Opening Vercel Dashboard...
start https://vercel.com/dashboard
timeout /t 2 /nobreak >nul

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  TESTING CHECKLIST                                        ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Once you have your dashboard URL:
echo.
echo 1. Open URL in browser
echo 2. Password: moneymachine25
echo 3. Click "AI Chat"
echo 4. Send test message: "Hello"
echo 5. Should get response from API
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  QUICK TEST                                                ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo To test API endpoint (if you have URL):
echo   curl -X POST https://YOUR-URL.vercel.app/api/agent ^
echo        -H "Content-Type: application/json" ^
echo        -d "{\"message\":\"test\"}"
echo.

pause
