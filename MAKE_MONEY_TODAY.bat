@echo off
color 0A
title 💰 MAKE MONEY TODAY - FULL AUTOMATION
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         💰 MAKE MONEY TODAY - FULL AUTOMATION            ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo This will set up EVERYTHING to make money TODAY!
echo.
echo Press any key to start...
pause >nul

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  PHASE 1: SETUP & LINK (10 min)                          ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

REM Open n8n
echo [1/5] Opening n8n...
start https://app.n8n.cloud
timeout /t 2 /nobreak >nul

REM Open Whop
echo [2/5] Opening Whop...
start https://whop.com
timeout /t 2 /nobreak >nul

REM Open Telegram
echo [3/5] Opening Telegram...
start https://web.telegram.org
timeout /t 2 /nobreak >nul

REM Open Stripe
echo [4/5] Opening Stripe...
start https://dashboard.stripe.com
timeout /t 2 /nobreak >nul

REM Open setup guide
echo [5/5] Opening setup guide...
cd /d "%~dp0"
start "" "DO_THIS_NOW_PHASE2.md"
timeout /t 2 /nobreak >nul

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  SETUP INSTRUCTIONS                                        ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 1. Import workflow in n8n (2 min)
echo 2. Add credentials (3 min)
echo 3. Activate workflow (1 min)
echo 4. Add webhook to Whop (2 min)
echo 5. Test purchase (2 min)
echo.
echo Follow DO_THIS_NOW_PHASE2.md for detailed steps!
echo.
echo Press any key when setup is complete...
pause >nul

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  PHASE 2: MARKETING BLAST (30 min)                        ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Opening ALL marketing platforms...
echo.

REM Open Reddit
echo [1/8] Opening Reddit...
start https://www.reddit.com/r/SideHustle/submit
timeout /t 1 /nobreak >nul
start https://www.reddit.com/r/Entrepreneur/submit
timeout /t 1 /nobreak >nul
start https://www.reddit.com/r/DigitalMarketing/submit
timeout /t 1 /nobreak >nul
start https://www.reddit.com/r/ContentCreator/submit
timeout /t 1 /nobreak >nul

REM Open Twitter
echo [2/8] Opening Twitter...
start https://twitter.com/compose/tweet
timeout /t 1 /nobreak >nul

REM Open Instagram
echo [3/8] Opening Instagram...
start https://www.instagram.com
timeout /t 1 /nobreak >nul

REM Open Facebook
echo [4/8] Opening Facebook...
start https://www.facebook.com
timeout /t 1 /nobreak >nul

REM Open LinkedIn
echo [5/8] Opening LinkedIn...
start https://www.linkedin.com/feed
timeout /t 1 /nobreak >nul

REM Open Discord
echo [6/8] Opening Discord...
start https://discord.com
timeout /t 1 /nobreak >nul

REM Open sales scripts
echo [7/8] Opening sales scripts...
cd /d "%~dp0"
start "" "QUICK_SALES_SCRIPT.md"
timeout /t 1 /nobreak >nul

REM Open marketing templates
echo [8/8] Opening marketing templates...
start "" "marketing-templates\reddit-post.md"
timeout /t 1 /nobreak >nul
start "" "marketing-templates\twitter-thread.md"

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ ALL PLATFORMS OPENED!                                 ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  MARKETING CHECKLIST - DO THESE NOW!                      ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo [ ] Reddit: Post in r/SideHustle (5 min)
echo [ ] Reddit: Post in r/Entrepreneur (5 min)
echo [ ] Reddit: Post in r/DigitalMarketing (5 min)
echo [ ] Reddit: Post in r/ContentCreator (5 min)
echo [ ] Twitter: Post thread (10 min)
echo [ ] Instagram: Post + Stories (10 min)
echo [ ] Facebook: Post in 3 groups (10 min)
echo [ ] LinkedIn: Post (5 min)
echo [ ] Message 20 friends (15 min)
echo [ ] DM 10 potential customers (10 min)
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  PRICING STRATEGY                                           ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 🎯 LAUNCH SPECIAL (First 10 customers):
echo    Price: $75 (50%% OFF - normally $150)
echo    Creates URGENCY!
echo.
echo 💰 REGULAR PRICE:
echo    Price: $150
echo.
echo 🏢 AGENCY PACK:
echo    Price: $400 (3 profiles - Save $50!)
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  EXPECTED RESULTS TODAY                                    ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Friends: 2-3 sales = $150-225
echo Reddit: 2-5 sales = $150-375
echo Twitter: 1-3 sales = $75-225
echo Instagram: 1-2 sales = $75-150
echo Facebook: 1-2 sales = $75-150
echo LinkedIn: 0-1 sales = $0-75
echo.
echo TOTAL TODAY: 7-15 sales = $525-1,200
echo.
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  COPY & PASTE FROM:                                        ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo - QUICK_SALES_SCRIPT.md (all messages ready)
echo - marketing-templates/reddit-post.md (Reddit posts)
echo - marketing-templates/twitter-thread.md (Twitter thread)
echo.
echo.
echo ========================================
echo    🚀 GO POST EVERYWHERE NOW!
echo ========================================
echo.
echo Copy messages from QUICK_SALES_SCRIPT.md
echo Add your Whop store URL
echo Post and get sales!
echo.
echo Press any key to open revenue tracker...
pause >nul

REM Open revenue tracker
cd /d "%~dp0"
start "" "REVENUE_TRACKER.md"

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  💰 REVENUE TRACKER OPENED                                 ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Track your sales in REVENUE_TRACKER.md
echo.
echo Every sale = Money to Skrill! 💰
echo.
echo GO GET THOSE SALES! 🚀
echo.
pause

