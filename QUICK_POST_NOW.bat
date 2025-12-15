@echo off
REM 🦄 Quick Post - Copy Marketing Content
color 0B
title 📝 QUICK POST NOW
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         📝 QUICK POST - COPY & PASTE                       ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo Opening marketing posts...
if exist "MARKETING_POSTS_READY.txt" (
    start "" "MARKETING_POSTS_READY.txt"
    echo ✅ Marketing posts opened
    echo.
    echo Copy and paste to:
    echo   - Telegram groups
    echo   - Reddit subreddits
    echo   - Twitter/X
    echo   - Other platforms
) else (
    echo ⚠️  Marketing posts file not found
    echo    Creating now...
    call AUTO_MONEY_MAKER.bat
)

echo.
echo Opening platforms...
start https://web.telegram.org/
timeout /t 1 /nobreak >nul
start https://www.reddit.com/
timeout /t 1 /nobreak >nul
start https://twitter.com/
timeout /t 1 /nobreak >nul

echo.
echo ✅ Platforms opened!
echo    Copy posts and paste them!
echo.

pause
