@echo off
color 0C
title 💰 GET MONEY NOW - AUTOMATED MARKETING
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         💰 GET MONEY NOW - AUTOMATED MARKETING           ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo This will automate marketing and get you sales FAST!
echo.
echo Press any key to start...
pause >nul

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  OPENING ALL MARKETING PLATFORMS...                       ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

REM Reddit - Multiple subreddits
echo [1/8] Opening Reddit subreddits...
start https://www.reddit.com/r/SideHustle/submit
timeout /t 1 /nobreak >nul
start https://www.reddit.com/r/Entrepreneur/submit
timeout /t 1 /nobreak >nul
start https://www.reddit.com/r/DigitalMarketing/submit
timeout /t 1 /nobreak >nul
start https://www.reddit.com/r/ContentCreator/submit
timeout /t 1 /nobreak >nul

REM Twitter
echo [2/8] Opening Twitter...
start https://twitter.com/compose/tweet
timeout /t 1 /nobreak >nul

REM Telegram
echo [3/8] Opening Telegram...
start https://web.telegram.org
timeout /t 1 /nobreak >nul

REM Automation scripts
echo [4/8] Opening automation scripts...
cd /d "%~dp0"
start "" "automated-marketing\auto-reddit-poster.js"
timeout /t 1 /nobreak >nul
start "" "automated-marketing\auto-twitter-poster.js"
timeout /t 1 /nobreak >nul

REM Sales messages
echo [5/8] Opening sales messages...
start "" "TELEGRAM_SALES_MESSAGES.md"
timeout /t 1 /nobreak >nul

REM Dashboard
echo [6/8] Opening dashboard...
start "" "dashboard\index.html"
timeout /t 1 /nobreak >nul

REM Whop
echo [7/8] Opening Whop store...
start https://whop.com/golo-capo/
timeout /t 1 /nobreak >nul

REM Revenue tracker
echo [8/8] Opening revenue tracker...
start "" "REVENUE_TRACKER.md"

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ EVERYTHING OPENED!                                    ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  AUTOMATION OPTIONS                                        ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  OPTION 1: SEMI-AUTOMATED (Current - Auto-fills)          ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo REDDIT (5 min - Auto-fill):
echo   1. In Reddit tab: Open console (F12)
echo   2. Copy code from: auto-reddit-poster.js (already open)
echo   3. Paste in console, press Enter
echo   4. Post auto-fills! Click Submit!
echo   5. Repeat for each subreddit
echo.
echo TWITTER (3 min - Auto-fill):
echo   1. In Twitter tab: Open console (F12)
echo   2. Copy code from: auto-twitter-poster.js (already open)
echo   3. Paste in console, press Enter
echo   4. Tweet auto-fills! Post it!
echo   5. Run again for next tweet (thread)
echo.
echo TELEGRAM (15 min - Copy/Paste):
echo   1. Copy message from TELEGRAM_SALES_MESSAGES.md
echo   2. Message 20 friends
echo   3. Get sales!
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  OPTION 2: FULLY AUTOMATED (No clicks needed!)            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo For FULL automation (posts automatically):
echo   1. First time: Run SETUP_FULL_AUTOMATION.bat (5 min)
echo   2. Make sure you're logged into Reddit & Twitter
echo   3. Run: RUN_FULL_AUTOMATION.bat
echo   4. Watch it post to 4 subreddits + Twitter automatically!
echo.
echo See: automated-marketing\AUTOMATION_STATUS.md for details
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  YOUR STORE LINK (READY!)                                 ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo https://whop.com/golo-capo/
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  EXPECTED RESULTS (TODAY)                                 ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Reddit: 2-5 sales = $150-375
echo Twitter: 1-3 sales = $75-225
echo Telegram: 2-3 sales = $150-225
echo.
echo TOTAL: 5-11 sales = $375-825 TODAY
echo.
echo.
echo ========================================
echo    💰 GO GET MONEY NOW!
echo ========================================
echo.
echo Use automation scripts or copy/paste!
echo Post everywhere!
echo Get sales!
echo.
pause

