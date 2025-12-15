@echo off
color 0A
title 🤖 AI AGENT SETUP
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         🤖 AI AGENT SETUP                                ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found!
    echo.
    echo Install Node.js: https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js found!
echo.

echo Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Installation failed!
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies installed!
echo.

if not exist ".env" (
    echo Creating .env file...
    copy .env.example .env >nul
    echo.
    echo ⚠️  IMPORTANT: Edit .env and add your OpenAI API key!
    echo.
    echo Get API key: https://platform.openai.com/api-keys
    echo.
    pause
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ SETUP COMPLETE!                                       ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Next steps:
echo   1. Edit .env file - Add OpenAI API key
echo   2. Run: npm start "Launch Telegram campaign"
echo   3. Agent will execute automatically!
echo.
pause
