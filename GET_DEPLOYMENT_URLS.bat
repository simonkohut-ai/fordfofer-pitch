@echo off
chcp 65001 >nul
color 0A
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║     🌐 GET YOUR DEPLOYMENT URLS 🌐                         ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo Opening Vercel Dashboard to get your URLs...
echo.
start https://vercel.com/dashboard
timeout /t 3 >nul

echo.
echo ═══════════════════════════════════════════════════════════════
echo INSTRUCTIONS:
echo ═══════════════════════════════════════════════════════════════
echo.
echo 1. In Vercel Dashboard, find your projects
echo 2. Click on each project
echo 3. Copy the "Visit" URL (looks like: https://project-name.vercel.app)
echo 4. Save the URLs somewhere
echo.
echo Your projects should be:
echo   - ai-studio-dashboard (or your dashboard project name)
echo   - p2ba-console (or your console project name)
echo   - ai-studio (if you deployed whole folder)
echo.
echo ═══════════════════════════════════════════════════════════════
echo Opening testing guide...
echo ═══════════════════════════════════════════════════════════════
echo.
start "" "%~dp0HEALTH_CHECK_COMPLETE.md"

echo.
echo ✅ Vercel Dashboard and testing guide opened!
echo.
pause
