@echo off
chcp 65001 >nul
color 0A
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║     🚀 FINAL AUTO DEPLOY - DASHBOARD + P2BA-CONSOLE 🚀     ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo This will deploy BOTH projects via GitHub to Vercel!
echo.
pause

cd /d "%~dp0"

set VERCEL_TOKEN=REMOVED_VERCEL_TOKEN
set OPENAI_KEY=REMOVED_OPENAI_KEY

echo.
echo ═══════════════════════════════════════════════════════════════
echo Step 1: Pushing to GitHub...
echo ═══════════════════════════════════════════════════════════════
echo.

git add .
git commit -m "Auto-deploy: Update dashboard and p2ba-console configuration" 2>nul
git push origin delete-old-system 2>nul

if %ERRORLEVEL% EQU 0 (
    echo ✅ Code pushed to GitHub
) else (
    echo ⚠️ GitHub push skipped (may already be up to date)
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo Step 2: Opening Vercel Dashboard...
echo ═══════════════════════════════════════════════════════════════
echo.

start https://vercel.com/new

echo.
echo ═══════════════════════════════════════════════════════════════
echo ✅ READY TO DEPLOY!
echo ═══════════════════════════════════════════════════════════════
echo.
echo 📋 INSTRUCTIONS:
echo.
echo 1. DASHBOARD PROJECT:
echo    - Click "Import Git Repository"
echo    - Select: simonkohut-ai/p2ba
echo    - Project Name: ai-studio-dashboard
echo    - Root Directory: dashboard
echo    - Framework: Other
echo    - Click "Deploy"
echo    - After deployment: Settings → Environment Variables
echo      → Add OPENAI_API_KEY: %OPENAI_KEY%
echo.
echo 2. P2BA-CONSOLE PROJECT:
echo    - Click "Add New..." → "Project"
echo    - Click "Import Git Repository"
echo    - Select: simonkohut-ai/p2ba
echo    - Project Name: p2ba-console
echo    - Root Directory: p2ba-console
echo    - Framework: Next.js (auto-detected)
echo    - Click "Deploy"
echo    - After deployment: Settings → Environment Variables
echo      → Add OPENAI_API_KEY: %OPENAI_KEY%
echo.
echo 3. REDEPLOY BOTH:
echo    - After adding environment variables, redeploy both projects
echo.
echo ═══════════════════════════════════════════════════════════════
echo Opening deployment guide...
echo ═══════════════════════════════════════════════════════════════
echo.

start "" "DEPLOY_BOTH_FROM_GITHUB.md"

echo.
echo ✅ Vercel dashboard and guide opened!
echo.
echo 🎯 Your code is ready on GitHub!
echo    Repository: simonkohut-ai/p2ba
echo    Branch: delete-old-system
echo.
pause
