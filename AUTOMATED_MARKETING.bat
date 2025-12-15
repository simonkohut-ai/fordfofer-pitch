@echo off
color 0E
title 🤖 AUTOMATED MARKETING - GET SALES NOW
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║    🤖 AUTOMATED MARKETING - GET SALES NOW                ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Opening all platforms for automated marketing...
echo.

REM Open Reddit
echo [1/6] Opening Reddit...
start https://www.reddit.com/r/SideHustle/submit
timeout /t 2 /nobreak >nul
start https://www.reddit.com/r/Entrepreneur/submit
timeout /t 2 /nobreak >nul
start https://www.reddit.com/r/DigitalMarketing/submit
timeout /t 2 /nobreak >nul

REM Open Twitter
echo [2/6] Opening Twitter...
start https://twitter.com/compose/tweet
timeout /t 2 /nobreak >nul

REM Open Telegram
echo [3/6] Opening Telegram...
start https://web.telegram.org
timeout /t 2 /nobreak >nul

REM Open automation scripts
echo [4/6] Opening automation scripts...
cd /d "%~dp0"
start "" "automated-marketing\auto-reddit-poster.js"
timeout /t 1 /nobreak >nul
start "" "automated-marketing\auto-twitter-poster.js"
timeout /t 1 /nobreak >nul
start "" "automated-marketing\auto-telegram-messenger.js"

REM Open dashboard
echo [5/6] Opening dashboard...
start "" "dashboard\index.html"
timeout /t 1 /nobreak >nul

REM Open Whop
echo [6/6] Opening Whop store...
start https://whop.com/golo-capo/
timeout /t 1 /nobreak >nul

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ ALL PLATFORMS OPENED!                                 ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  AUTOMATED MARKETING INSTRUCTIONS                          ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo REDDIT (Automated):
echo   1. Go to Reddit submit page (already open)
echo   2. Open browser console (F12)
echo   3. Copy code from: automated-marketing\auto-reddit-poster.js
echo   4. Paste in console and press Enter
echo   5. Post will auto-fill! Just click Submit!
echo   6. Repeat for each subreddit
echo.
echo TWITTER (Automated):
echo   1. Go to Twitter compose (already open)
echo   2. Open browser console (F12)
echo   3. Copy code from: automated-marketing\auto-twitter-poster.js
echo   4. Paste in console and press Enter
echo   5. First tweet auto-fills! Post it!
echo   6. Run script again for next tweet (thread)
echo.
echo TELEGRAM (Semi-Automated):
echo   1. Go to Telegram (already open)
echo   2. Open browser console (F12)
echo   3. Copy code from: automated-marketing\auto-telegram-messenger.js
echo   4. Paste in console - shows message to copy
echo   5. Copy message and send to friends manually
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  QUICK MANUAL METHOD (Faster!)                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Just copy messages from TELEGRAM_SALES_MESSAGES.md
echo Paste and post everywhere!
echo Works great and is faster!
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  EXPECTED RESULTS                                          ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Reddit: 2-5 sales = $150-375
echo Twitter: 1-3 sales = $75-225
echo Telegram: 2-3 sales = $150-225
echo.
echo TOTAL: 5-11 sales = $375-825
echo.
echo.
echo ========================================
echo    🤖 GO POST EVERYWHERE!
echo ========================================
echo.
echo Use automation scripts or copy/paste manually!
echo Get sales!
echo.
pause

