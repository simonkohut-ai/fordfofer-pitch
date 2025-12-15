@echo off
chcp 65001 >nul
color 0A
title 🔧 AUTO FIX DASHBOARD
cls

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                                                               ║
echo ║         🔧 AUTO FIX DASHBOARD ROOT DIRECTORY                ║
echo ║                                                               ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo Running PowerShell script to fix dashboard...
echo.

powershell -ExecutionPolicy Bypass -File "FIX_DASHBOARD_AUTO.ps1"

echo.
echo ═══════════════════════════════════════════════════════════════
echo MANUAL VERIFICATION NEEDED:
echo ═══════════════════════════════════════════════════════════════
echo.
echo The script attempted to fix the Root Directory.
echo.
echo Please verify in Vercel Dashboard:
echo   1. Go to: https://vercel.com/dashboard
echo   2. Click: ai-studio project
echo   3. Settings → General → Root Directory
echo   4. Should be: dashboard
echo   5. If not, change it manually and redeploy
echo.
pause
