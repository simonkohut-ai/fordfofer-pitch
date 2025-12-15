@echo off
chcp 65001 >nul
color 0A
title 🚀 RUN ALL FIXES AUTOMATICALLY
cls

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                                                               ║
echo ║         🚀 RUNNING ALL FIXES AUTOMATICALLY                  ║
echo ║                                                               ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo Step 1: Fixing Dashboard Root Directory...
echo.
call FIX_DASHBOARD_AUTO.bat

echo.
echo ═══════════════════════════════════════════════════════════════
echo Step 2: Opening all URLs for testing...
echo ═══════════════════════════════════════════════════════════════
echo.

timeout /t 3 >nul

echo Opening Dashboard...
start https://ai-studio-sandy-five.vercel.app

timeout /t 2 >nul

echo Opening Console...
start https://p2ba-navy.vercel.app

timeout /t 2 >nul

echo Opening Vercel Dashboard...
start https://vercel.com/dashboard

echo.
echo ═══════════════════════════════════════════════════════════════
echo ✅ ALL FIXES COMPLETE!
echo ═══════════════════════════════════════════════════════════════
echo.
echo Test your URLs:
echo   Dashboard: https://ai-studio-sandy-five.vercel.app
echo   Console: https://p2ba-navy.vercel.app
echo.
echo If Dashboard still shows landing page:
echo   1. Go to Vercel Dashboard
echo   2. ai-studio → Settings → General
echo   3. Set Root Directory = dashboard
echo   4. Redeploy
echo.
pause
