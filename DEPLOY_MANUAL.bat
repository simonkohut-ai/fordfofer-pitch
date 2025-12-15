@echo off
chcp 65001 >nul
color 0A
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║     🚀 MANUAL VERCEL DEPLOYMENT GUIDE (Web UI) 🚀          ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo This script will help you prepare files for manual Vercel deployment.
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════════
echo STEP 1: Opening Dashboard folder...
echo ═══════════════════════════════════════════════════════════════
echo.
start explorer "%~dp0dashboard"
echo.
echo ✅ Dashboard folder opened!
echo.
echo 📋 INSTRUCTIONS:
echo    1. Select ALL files in the dashboard folder (Ctrl+A)
echo    2. Right-click → Send to → Compressed (zipped) folder
echo    3. Name it: dashboard.zip
echo    4. Remember where you saved it
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════════
echo STEP 2: Opening p2ba-console folder...
echo ═══════════════════════════════════════════════════════════════
echo.
start explorer "%~dp0p2ba-console"
echo.
echo ✅ p2ba-console folder opened!
echo.
echo 📋 INSTRUCTIONS:
echo    1. Select ALL files in the p2ba-console folder (Ctrl+A)
echo    2. Right-click → Send to → Compressed (zipped) folder
echo    3. Name it: p2ba-console.zip
echo    4. Remember where you saved it
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════════
echo STEP 3: Opening Vercel website...
echo ═══════════════════════════════════════════════════════════════
echo.
start https://vercel.com
echo.
echo ✅ Vercel website opened!
echo.
echo 📋 NEXT STEPS:
echo    1. Log in with: simonkohut21-4119
echo    2. Click "Add New..." → "Project"
echo    3. Upload dashboard.zip first
echo    4. Then upload p2ba-console.zip
echo    5. Add OPENAI_API_KEY to both projects
echo.
echo 📖 Full guide: DEPLOY_MANUAL_VERCEL_UI.md
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════════
echo Opening full deployment guide...
echo ═══════════════════════════════════════════════════════════════
echo.
start "" "%~dp0DEPLOY_MANUAL_VERCEL_UI.md"
echo.
echo ✅ Guide opened!
echo.
echo 🎉 Ready to deploy manually via Vercel Web UI!
echo.
pause
