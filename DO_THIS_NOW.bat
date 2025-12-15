@echo off
REM 🦄 Simple Step-by-Step Guide
color 0A
title ✅ DO THIS NOW - SIMPLE STEPS
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         ✅ SIMPLE STEP-BY-STEP GUIDE                     ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 1: Get Dashboard URL                                ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo 1. Go to: https://vercel.com/dashboard
echo 2. Find: ai-studio-dashboard
echo 3. Copy the URL
echo 4. Bookmark it
echo.

echo Opening Vercel Dashboard...
start https://vercel.com/dashboard
timeout /t 2 /nobreak >nul

pause

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 2: Add OpenAI Key                                   ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo For Dashboard Project:
echo   1. Click ai-studio-dashboard
echo   2. Settings → Environment Variables
echo   3. Add: OPENAI_API_KEY = your key
echo   4. Save → Redeploy
echo.
echo For p2ba Project:
echo   1. Click p2ba
echo   2. Settings → Environment Variables
echo   3. Add: OPENAI_API_KEY = same key
echo   4. Save → Redeploy
echo.

pause

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 3: Test Dashboard                                   ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo 1. Open your dashboard URL
echo 2. Password: moneymachine25
echo 3. Click AI Chat
echo 4. Type: Hello
echo 5. Should get response
echo.

echo Opening simple guide...
timeout /t 2 /nobreak >nul
if exist "SIMPLE_STEPS.md" (
    start "" "SIMPLE_STEPS.md"
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ DONE!                                                  ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

pause
