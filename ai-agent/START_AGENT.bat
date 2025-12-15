@echo off
color 0C
title 🤖 AI AGENT - RUNNING
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         🤖 AI AGENT - RUNNING                            ║
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

echo Starting AI Agent...
echo.
echo Usage examples:
echo   npm start "Launch Telegram campaign"
echo   npm start "Generate Reddit post"
echo   npm start "Check campaign performance"
echo.
echo Press Ctrl+C to stop
echo.

node agent.js %*

pause
