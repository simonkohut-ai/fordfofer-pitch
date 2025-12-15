@echo off
REM 🦄 Deploy Dashboard Live - One App for Everything
color 0A
title 🚀 DEPLOY DASHBOARD LIVE
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         🚀 DEPLOY DASHBOARD LIVE                         ║
echo ║         One App - Everything Integrated                  ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo ✅ This will deploy your dashboard live to Vercel
echo    - Password protected (moneymachine25)
echo    - AI Agent integrated
echo    - Full automation
echo    - One app for everything
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
echo Follow the prompts:
echo   - Login to Vercel (if needed)
echo   - Link to existing project? NO (create new)
echo   - Project name: ai-studio-dashboard (or your choice)
echo   - Directory: . (current)
echo   - Override settings? NO
echo.

vercel --prod

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ DEPLOYMENT COMPLETE!                                   ║
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
echo.
pause
