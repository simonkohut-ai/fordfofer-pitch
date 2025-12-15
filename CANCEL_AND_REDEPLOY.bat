@echo off
chcp 65001 >nul
color 0A
title CANCEL OLD DEPLOYS AND REDEPLOY
cls

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║         🔄 CANCEL OLD DEPLOYS AND REDEPLOY                  ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo Step 1: Opening Vercel Dashboard...
start https://vercel.com/dashboard
timeout /t 2 >nul

echo Step 2: Opening account settings...
start https://vercel.com/account
timeout /t 2 >nul

echo.
echo ═══════════════════════════════════════════════════════════════
echo CANCEL OLD DEPLOYMENTS:
echo ═══════════════════════════════════════════════════════════════
echo.
echo 1. In Vercel Dashboard, check each project:
echo    - ai-studio
echo    - p2ba
echo    - Any other projects
echo.
echo 2. For each project:
echo    - Go to: Deployments tab
echo    - Click: ... on running deployments
echo    - Click: Cancel (if running)
echo    - Click: Delete (if old/unused)
echo.
echo 3. Check other accounts:
echo    - Click profile (top right)
echo    - Switch to other accounts
echo    - Cancel deployments there too
echo.
echo 4. After cancelling, press any key to redeploy...
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════════
echo REDEPLOYING EVERYTHING...
echo ═══════════════════════════════════════════════════════════════
echo.

powershell -ExecutionPolicy Bypass -File "REDEPLOY_EVERYTHING.ps1"

echo.
echo ═══════════════════════════════════════════════════════════════
echo COMPLETE!
echo ═══════════════════════════════════════════════════════════════
echo.
pause
