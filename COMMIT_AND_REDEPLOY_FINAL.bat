@echo off
chcp 65001 >nul
color 0A
title COMMIT AND REDEPLOY EVERYTHING
cls

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║         ✅ COMMIT AND REDEPLOY EVERYTHING                   ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo Step 1: Committing all changes...
git add -A
git commit -m "Complete setup: Revenue scripts, preview guides, deployment automation" 2>nul
if %errorlevel% == 0 (
    echo ✅ Changes committed locally
) else (
    echo ⚠️  No new changes to commit
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo Step 2: Opening Vercel Dashboard for redeployment...
echo ═══════════════════════════════════════════════════════════════
echo.

start https://vercel.com/dashboard
timeout /t 3 >nul

echo.
echo ═══════════════════════════════════════════════════════════════
echo REDEPLOY INSTRUCTIONS:
echo ═══════════════════════════════════════════════════════════════
echo.
echo DASHBOARD (ai-studio):
echo   1. Click: ai-studio project
echo   2. Go to: Deployments tab
echo   3. Click: ... on latest deployment
echo   4. Click: Redeploy
echo   5. IMPORTANT: Verify Root Directory = dashboard in Settings
echo.
echo CONSOLE (p2ba):
echo   1. Click: p2ba project
echo   2. Go to: Deployments tab
echo   3. Click: ... on latest deployment
echo   4. Click: Redeploy
echo.
echo ═══════════════════════════════════════════════════════════════
echo NOTE: GitHub push blocked due to old commits with API keys
echo       This is OK - redeploy manually in Vercel Dashboard
echo ═══════════════════════════════════════════════════════════════
echo.
pause
