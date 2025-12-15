@echo off
chcp 65001 >nul
color 0A
title 🚀 DEPLOY EVERYTHING NOW
cls

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                                                               ║
echo ║         🚀 DEPLOY DASHBOARD + CONSOLE NOW                   ║
echo ║                                                               ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

echo Opening Vercel Dashboard...
start https://vercel.com/dashboard
timeout /t 2 >nul

echo Opening GitHub Repository...
start https://github.com/simonkohut-ai/p2ba
timeout /t 2 >nul

echo Opening Deployment Guide...
start "" "%~dp0DEPLOY_EVERYTHING_NOW.md"

echo.
echo ═══════════════════════════════════════════════════════════════
echo QUICK STEPS:
echo ═══════════════════════════════════════════════════════════════
echo.
echo 1. In Vercel Dashboard, click "Add New..." → "Project"
echo 2. Import Git Repository: simonkohut-ai/p2ba
echo 3. For Dashboard:
echo    - Root Directory: dashboard
echo    - Framework: Other
echo 4. For Console:
echo    - Root Directory: p2ba-console
echo    - Framework: Next.js
echo 5. Add OPENAI_API_KEY to both projects
echo 6. Redeploy both
echo.
echo ═══════════════════════════════════════════════════════════════
echo All pages opened! Follow the guide above.
echo ═══════════════════════════════════════════════════════════════
echo.
pause
