@echo off
color 0C
title 🤖 FULLY AUTOMATED MARKETING - RUNNING NOW
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║    🤖 FULLY AUTOMATED MARKETING - RUNNING                ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo ⚠️  IMPORTANT: Make sure you're logged into:
echo    ✅ Reddit (reddit.com)
echo    ✅ Twitter (twitter.com)
echo.
echo Press any key to start FULL automation...
pause >nul

cd /d "%~dp0"

echo.
echo 🚀 Starting fully automated posting...
echo    (This will open browser windows - don't close them!)
echo.

node fully-automated-poster.js

if %errorlevel% neq 0 (
    echo.
    echo ❌ Error running script!
    echo.
    echo Make sure you:
    echo 1. Ran SETUP_FULL_AUTOMATION.bat first
    echo 2. Are logged into Reddit and Twitter
    echo 3. Have Node.js installed
    echo.
    pause
) else (
    echo.
    echo ✅ Automation complete!
    echo.
    pause
)

