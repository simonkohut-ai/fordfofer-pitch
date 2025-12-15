@echo off
REM 🦄 Deploy Dashboard Live - FIXED VERSION
color 0A
title 🚀 DEPLOY DASHBOARD LIVE (FIXED)
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         🚀 DEPLOY DASHBOARD LIVE (FIXED)                 ║
echo ║         One App - Everything Integrated                  ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo ✅ Fixed deployment configuration
echo    - Simplified Vercel config
echo    - Fixed API endpoint
echo    - Ready to deploy
echo.

pause

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 1: Check Vercel CLI                                 ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

where vercel >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Vercel CLI installed
    vercel --version
) else (
    echo ❌ Vercel CLI not found
    echo.
    echo Installing Vercel CLI...
    npm install -g vercel
    echo.
    echo ✅ Vercel CLI installed!
    echo.
)

pause

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 2: Deploy to Vercel                                 ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo Deploying dashboard...
echo.
echo ⚠️  IMPORTANT: Follow these prompts carefully:
echo.
echo   1. Login to Vercel (if needed)
echo   2. "Link to existing project?" → NO (create new)
echo   3. "Project name:" → ai-studio-dashboard (or press Enter)
echo   4. "Directory:" → . (current, press Enter)
echo   5. "Override settings?" → NO (press Enter)
echo.

vercel --prod

if %errorlevel% == 0 (
    echo.
    echo ╔═══════════════════════════════════════════════════════════╗
    echo ║  ✅ DEPLOYMENT SUCCESSFUL!                                 ║
    echo ╚═══════════════════════════════════════════════════════════╝
    echo.
    echo Your dashboard is now live!
    echo.
    echo ╔═══════════════════════════════════════════════════════════╗
    echo ║  NEXT STEPS                                               ║
    echo ╚═══════════════════════════════════════════════════════════╝
    echo.
    echo 1. Copy your Vercel URL (shown above)
    echo 2. Bookmark it - this is your ONE APP
    echo 3. Password: moneymachine25
    echo 4. Use AI Chat to control everything
    echo.
    echo ╔═══════════════════════════════════════════════════════════╗
    echo ║  COMMUNICATION                                            ║
    echo ╚═══════════════════════════════════════════════════════════╝
    echo.
    echo You can now communicate through:
    echo   ✅ Cursor (this chat)
    echo   ✅ Dashboard AI Chat (live app)
    echo.
    echo Everything is automated - just type commands!
) else (
    echo.
    echo ╔═══════════════════════════════════════════════════════════╗
    echo ║  ❌ DEPLOYMENT ERROR                                       ║
    echo ╚═══════════════════════════════════════════════════════════╝
    echo.
    echo Check the error above and try:
    echo   1. Make sure you're logged in: vercel login
    echo   2. Check your internet connection
    echo   3. Try again: vercel --prod
    echo.
    echo If error persists, check:
    echo   - Vercel dashboard: https://vercel.com/dashboard
    echo   - Error logs above
    echo.
)

echo.
pause
