@echo off
chcp 65001 >nul
title PREVIEW YOUR MONEY MAKERS
cls

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║         💰 PREVIEW YOUR MONEY MAKERS                         ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

echo Opening Dashboard...
start https://ai-studio-sandy-five.vercel.app
timeout /t 2 >nul

echo Opening Console...
start https://p2ba-navy.vercel.app
timeout /t 2 >nul

echo Opening Vercel Dashboard...
start https://vercel.com/dashboard
timeout /t 2 >nul

echo Opening Whop...
start https://whop.com
timeout /t 2 >nul

echo Opening Preview Guide...
start "" "%~dp0SEE_YOUR_MONEY_MAKERS.md"

echo.
echo ═══════════════════════════════════════════════════════════════
echo ✅ ALL PAGES OPENED!
echo ═══════════════════════════════════════════════════════════════
echo.
echo WHAT TO CHECK:
echo.
echo Dashboard (first tab):
echo   - Does it show password prompt? (Good!)
echo   - OR does it show landing page? (Need to fix Root Directory)
echo.
echo Console (second tab):
echo   - Does it show chat interface? (Good!)
echo   - Can you type commands? (Good!)
echo.
echo ═══════════════════════════════════════════════════════════════
echo TO FIX DASHBOARD (if showing landing page):
echo ═══════════════════════════════════════════════════════════════
echo.
echo 1. Go to Vercel Dashboard (third tab)
echo 2. Click: ai-studio project
echo 3. Click: Settings → General
echo 4. Find: Root Directory
echo 5. Change to: dashboard
echo 6. Click: Save
echo 7. Go to: Deployments tab
echo 8. Click: ... → Redeploy
echo 9. Wait 1-2 minutes
echo 10. Refresh Dashboard URL
echo.
echo ═══════════════════════════════════════════════════════════════
echo YOUR MONEY MAKERS:
echo ═══════════════════════════════════════════════════════════════
echo.
echo Dashboard: https://ai-studio-sandy-five.vercel.app
echo Console: https://p2ba-navy.vercel.app
echo.
echo These are what you're selling!
echo.
pause
