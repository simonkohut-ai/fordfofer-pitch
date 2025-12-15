@echo off
chcp 65001 >nul
color 0A
title 🌐 OPEN DASHBOARD & CONSOLE
cls

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                                                               ║
echo ║         🌐 OPENING YOUR DEPLOYED PROJECTS                   ║
echo ║                                                               ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

echo Opening Dashboard...
start https://ai-studio-sandy-five.vercel.app
timeout /t 2 >nul

echo Opening Console...
start https://p2ba-navy.vercel.app
timeout /t 2 >nul

echo.
echo ═══════════════════════════════════════════════════════════════
echo YOUR URLs:
echo ═══════════════════════════════════════════════════════════════
echo.
echo 📊 DASHBOARD:
echo    https://ai-studio-sandy-five.vercel.app
echo    Password: moneymachine25
echo.
echo 🎮 CONSOLE:
echo    https://p2ba-navy.vercel.app
echo.
echo ═══════════════════════════════════════════════════════════════
echo TESTING:
echo ═══════════════════════════════════════════════════════════════
echo.
echo Dashboard:
echo   1. Enter password: moneymachine25
echo   2. Test AI Chat: Type "Hello"
echo.
echo Console:
echo   1. Test command: "Create a test business"
echo.
pause
