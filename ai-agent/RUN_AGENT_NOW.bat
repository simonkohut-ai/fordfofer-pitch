@echo off
REM 🦄 Personal Brand Signature
color 0A
title 🤖 AI AGENT - LAUNCHING CAMPAIGN
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         🤖 AI AGENT - LAUNCHING CAMPAIGN                 ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

if not exist ".env" (
    echo ❌ .env file not found!
    echo.
    echo Run SETUP_AGENT.bat first!
    echo.
    pause
    exit /b 1
)

echo ✅ Starting AI Agent...
echo.
echo 🎯 Command: Launch Telegram campaign
echo.
echo This will:
echo   1. Generate marketing content
echo   2. Post to Telegram groups
echo   3. Update dashboard
echo.
echo Starting in 3 seconds...
timeout /t 3 /nobreak >nul

node agent.js "Launch Telegram campaign"

echo.
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ Agent execution complete!                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
pause
