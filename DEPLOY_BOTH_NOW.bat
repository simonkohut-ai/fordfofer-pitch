@echo off
chcp 65001 >nul
color 0A
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║     🚀 DEPLOY DASHBOARD & P2BA-CONSOLE 🚀                   ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo This will guide you to deploy BOTH projects from GitHub.
echo.
echo You'll create TWO separate Vercel projects:
echo   1. Dashboard (Root Directory: dashboard)
echo   2. p2ba-console (Root Directory: p2ba-console)
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════════
echo Opening Vercel dashboard...
echo ═══════════════════════════════════════════════════════════════
echo.
start https://vercel.com/new
timeout /t 2 >nul

echo.
echo ═══════════════════════════════════════════════════════════════
echo Opening deployment guide...
echo ═══════════════════════════════════════════════════════════════
echo.
start "" "%~dp0DEPLOY_BOTH_FROM_GITHUB.md"

echo.
echo ✅ Vercel and guide opened!
echo.
echo 📋 QUICK STEPS:
echo.
echo 1. DASHBOARD:
echo    - Import: simonkohut-ai/p2ba
echo    - Root Directory: dashboard
echo    - Framework: Other
echo    - Deploy
echo.
echo 2. P2BA-CONSOLE:
echo    - Import: simonkohut-ai/p2ba
echo    - Root Directory: p2ba-console
echo    - Framework: Next.js
echo    - Deploy
echo.
echo 3. ADD OPENAI_KEY to both projects
echo.
echo 📖 Full guide is now open!
echo.
pause
