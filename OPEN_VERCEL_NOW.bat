@echo off
chcp 65001 >nul
color 0A
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║     🚀 READY TO UPLOAD TO VERCEL! 🚀                       ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo Your zip files are on the desktop:
echo   ✅ dashboard.zip
echo   ✅ p2ba-console.zip
echo.
echo Opening Vercel website...
echo.
start https://vercel.com
timeout /t 2 >nul
echo.
echo ═══════════════════════════════════════════════════════════════
echo Opening upload guide...
echo ═══════════════════════════════════════════════════════════════
echo.
start "" "%~dp0UPLOAD_TO_VERCEL_NOW.md"
echo.
echo ✅ Vercel website and guide opened!
echo.
echo 📋 QUICK STEPS:
echo    1. Log in to Vercel (simonkohut21-4119)
echo    2. Click "Add New..." → "Project"
echo    3. Upload dashboard.zip first
echo    4. Then upload p2ba-console.zip
echo    5. Add OPENAI_API_KEY to both projects
echo.
echo 📖 Full guide is now open in your text editor!
echo.
pause
