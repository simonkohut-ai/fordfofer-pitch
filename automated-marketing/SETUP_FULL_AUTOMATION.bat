@echo off
color 0A
title 🤖 SETUP FULLY AUTOMATED MARKETING
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║    🤖 SETUP FULLY AUTOMATED MARKETING                     ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo This will install everything needed for FULL automation!
echo (No manual clicks required - posts automatically!)
echo.
echo Press any key to start setup...
pause >nul

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  CHECKING NODE.JS...                                       ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found!
    echo.
    echo Installing Node.js...
    echo.
    start https://nodejs.org/
    echo.
    echo ⚠️  Please install Node.js from the website that just opened.
    echo    Then run this script again.
    echo.
    pause
    exit /b 1
) else (
    echo ✅ Node.js found!
    node --version
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  INSTALLING DEPENDENCIES...                                ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"
call npm install puppeteer

if %errorlevel% neq 0 (
    echo.
    echo ❌ Installation failed!
    echo    Try running: npm install puppeteer
    echo.
    pause
    exit /b 1
) else (
    echo.
    echo ✅ Installation complete!
)

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ SETUP COMPLETE!                                        ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  HOW TO USE FULLY AUTOMATED POSTER                        ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 1. Make sure you're logged into Reddit and Twitter
echo    (in your default browser)
echo.
echo 2. Run: RUN_FULL_AUTOMATION.bat
echo    OR: node fully-automated-poster.js
echo.
echo 3. The script will:
echo    ✅ Open browser windows
echo    ✅ Auto-fill all posts
echo    ✅ Click Submit automatically
echo    ✅ Post to 4 Reddit subreddits
echo    ✅ Post Twitter thread (7 tweets)
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  IMPORTANT NOTES                                           ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo ⚠️  You MUST be logged into Reddit and Twitter first!
echo ⚠️  The script uses your browser session
echo ⚠️  Don't close browser windows while it's running
echo.
echo.
echo ========================================
echo    ✅ READY TO AUTOMATE!
echo ========================================
echo.
pause

