@echo off
chcp 65001 >nul
color 0A
title 🚀 AUTO FIX EVERYTHING
cls

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                                                               ║
echo ║         🚀 AUTO FIX DASHBOARD - OPENING ALL PAGES            ║
echo ║                                                               ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

echo Opening Vercel Dashboard...
start https://vercel.com/dashboard

timeout /t 2 >nul

echo Opening Dashboard URL...
start https://ai-studio-sandy-five.vercel.app

timeout /t 2 >nul

echo Opening Console URL...
start https://p2ba-navy.vercel.app

timeout /t 2 >nul

echo.
echo ═══════════════════════════════════════════════════════════════
echo ✅ ALL PAGES OPENED!
echo ═══════════════════════════════════════════════════════════════
echo.
echo QUICK FIX INSTRUCTIONS:
echo.
echo 1. In Vercel Dashboard (first tab):
echo    - Click: ai-studio project
echo    - Click: Settings → General
echo    - Find: Root Directory
echo    - Change to: dashboard
echo    - Click: Save
echo.
echo 2. Redeploy:
echo    - Go to: Deployments tab
echo    - Click: ... on latest deployment
echo    - Click: Redeploy
echo    - Wait 1-2 minutes
echo.
echo 3. Test Dashboard (second tab):
echo    - Refresh the page
echo    - Should show password prompt
echo    - Password: moneymachine25
echo.
echo ═══════════════════════════════════════════════════════════════
echo All pages are open! Follow instructions above.
echo ═══════════════════════════════════════════════════════════════
echo.
pause
