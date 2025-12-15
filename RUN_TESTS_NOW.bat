@echo off
chcp 65001 >nul
color 0A
title TESTING EVERYTHING
cls

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║         🧪 TESTING EVERYTHING - COMPLETE CHECK              ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo Step 1: Opening all URLs for testing...
start https://ai-studio-sandy-five.vercel.app
timeout /t 2 >nul
start https://p2ba-navy.vercel.app
timeout /t 2 >nul
start https://vercel.com/dashboard
timeout /t 2 >nul

echo.
echo ═══════════════════════════════════════════════════════════════
echo TESTING CHECKLIST:
echo ═══════════════════════════════════════════════════════════════
echo.

echo DASHBOARD TEST (first tab):
echo   [ ] URL loads: https://ai-studio-sandy-five.vercel.app
echo   [ ] Shows password prompt OR dashboard
echo   [ ] Can enter password: moneymachine25
echo   [ ] Dashboard loads after login
echo   [ ] AI Chat section visible
echo   [ ] Can type in AI Chat
echo   [ ] AI responds (test: "Hello")
echo   [ ] No errors in browser console (F12)
echo.

echo CONSOLE TEST (second tab):
echo   [ ] URL loads: https://p2ba-navy.vercel.app
echo   [ ] Chat interface appears
echo   [ ] Can type commands
echo   [ ] Command executes (test: "Create a test business")
echo   [ ] Response appears
echo   [ ] No errors in browser console (F12)
echo.

echo VERCEL DASHBOARD CHECK (third tab):
echo   [ ] ai-studio project: Latest deployment Ready
echo   [ ] ai-studio: Root Directory = dashboard
echo   [ ] ai-studio: OPENAI_API_KEY set
echo   [ ] p2ba project: Latest deployment Ready
echo   [ ] p2ba: OPENAI_API_KEY set
echo   [ ] No build errors in logs
echo.

echo ═══════════════════════════════════════════════════════════════
echo TEST NOW:
echo ═══════════════════════════════════════════════════════════════
echo.
echo 1. Check Dashboard (first tab):
echo    - Enter password: moneymachine25
echo    - Test AI Chat: Type "Hello"
echo    - Press F12: Check for errors
echo.
echo 2. Check Console (second tab):
echo    - Type: "Create a test business"
echo    - Press Enter
echo    - Press F12: Check for errors
echo.
echo 3. Check Vercel (third tab):
echo    - Verify deployments are Ready
echo    - Check Root Directory settings
echo    - Check Environment Variables
echo.
pause
