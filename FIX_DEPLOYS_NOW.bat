@echo off
echo ========================================
echo FIXING OLD WEBSITE DEPLOYMENTS
echo ========================================
echo.

echo Opening deployed URLs to check...
start https://ai-studio-sandy-five.vercel.app
timeout /t 2 /nobreak >nul
start https://p2ba-navy.vercel.app
timeout /t 2 /nobreak >nul
start https://vercel.com/dashboard
timeout /t 2 /nobreak >nul

echo.
echo Opening fix guide...
start FIX_OLD_WEBSITE.md

echo.
echo ========================================
echo QUICK FIX STEPS:
echo ========================================
echo.
echo 1. CHECK WHAT'S SHOWING:
echo    - Dashboard URL opened
echo    - Console URL opened
echo    - Is it old website or correct content?
echo.
echo 2. FIX ROOT DIRECTORY (ai-studio):
echo    - Vercel Dashboard opened
echo    - Click ai-studio project
echo    - Settings ^> General
echo    - Root Directory = dashboard
echo    - Save
echo.
echo 3. REDEPLOY:
echo    - Deployments tab
echo    - Click ... on latest
echo    - Redeploy
echo.
echo 4. CHECK AGAIN:
echo    - Wait 1-2 minutes
echo    - Refresh URLs
echo    - Should show correct content now
echo.
pause
