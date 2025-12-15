@echo off
chcp 65001 >nul
color 0A
title 🚀 COMPLETE AUTO FIX - EVERYTHING
cls

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                                                               ║
echo ║         🚀 COMPLETE AUTO FIX - RUNNING EVERYTHING            ║
echo ║                                                               ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo Step 1: Opening Vercel Dashboard...
start https://vercel.com/dashboard
timeout /t 2 >nul

echo Step 2: Opening Dashboard URL...
start https://ai-studio-sandy-five.vercel.app
timeout /t 2 >nul

echo Step 3: Opening Console URL...
start https://p2ba-navy.vercel.app
timeout /t 2 >nul

echo.
echo ═══════════════════════════════════════════════════════════════
echo ✅ ALL PAGES OPENED!
echo ═══════════════════════════════════════════════════════════════
echo.
echo AUTOMATIC FIX INSTRUCTIONS:
echo.
echo In Vercel Dashboard (first tab):
echo   1. Click: ai-studio project
echo   2. Click: Settings → General
echo   3. Find: Root Directory
echo   4. Change to: dashboard
echo   5. Click: Save
echo   6. Go to: Deployments tab
echo   7. Click: ... → Redeploy
echo   8. Wait 1-2 minutes
echo.
echo Then refresh Dashboard URL (second tab)
echo Should show password prompt!
echo.
echo ═══════════════════════════════════════════════════════════════
echo All pages are open! Follow instructions above.
echo ═══════════════════════════════════════════════════════════════
echo.
timeout /t 10

echo.
echo Creating summary document...
echo.

(
echo # ✅ COMPLETE AUTO FIX - SUMMARY
echo.
echo **All pages opened automatically!**
echo.
echo ## 📋 **WHAT TO DO NOW:**
echo.
echo ### **Fix Dashboard Root Directory:**
echo.
echo 1. **In Vercel Dashboard:**
echo    - Click: `ai-studio` project
echo    - Click: `Settings` → `General`
echo    - Find: `Root Directory`
echo    - Change to: `dashboard`
echo    - Click: `Save`
echo.
echo 2. **Redeploy:**
echo    - Go to: `Deployments` tab
echo    - Click: `...` on latest deployment
echo    - Click: `Redeploy`
echo    - Wait: 1-2 minutes
echo.
echo 3. **Test:**
echo    - Refresh: https://ai-studio-sandy-five.vercel.app
echo    - Should show: Password prompt
echo    - Password: `moneymachine25`
echo.
echo ## ✅ **YOUR URLS:**
echo.
echo - **Dashboard:** https://ai-studio-sandy-five.vercel.app
echo - **Console:** https://p2ba-navy.vercel.app
echo.
echo ## 🎯 **STATUS:**
echo.
echo - ✅ All pages opened
echo - ✅ Scripts created
echo - ⚠️ Root Directory needs manual fix in Vercel
echo.
) > COMPLETE_FIX_SUMMARY.md

echo ✅ Summary created: COMPLETE_FIX_SUMMARY.md
echo.
pause
