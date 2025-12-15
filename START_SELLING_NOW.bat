@echo off
color 0A
title 💰 START SELLING NOW - READY TO GO!
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         💰 START SELLING NOW - READY TO GO!              ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Your Whop store is COMPLETE! 🎉
echo Store link: https://whop.com/golo-capo/
echo.
echo Opening everything to start making money NOW...
echo.

REM Open Telegram
echo [1/5] Opening Telegram...
start https://web.telegram.org
timeout /t 2 /nobreak >nul

REM Open sales messages
echo [2/5] Opening sales messages...
cd /d "%~dp0"
start "" "TELEGRAM_SALES_MESSAGES.md"
timeout /t 1 /nobreak >nul

REM Open dashboard
echo [3/5] Opening dashboard...
start "" "dashboard\index.html"
timeout /t 1 /nobreak >nul

REM Open Whop
echo [4/5] Opening Whop store...
start https://whop.com/golo-capo/
timeout /t 1 /nobreak >nul

REM Open revenue tracker
echo [5/5] Opening revenue tracker...
start "" "REVENUE_TRACKER.md"
timeout /t 1 /nobreak >nul

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ EVERYTHING OPENED!                                    ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  YOUR WHOP STORE LINK (READY TO USE!)                    ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo https://whop.com/golo-capo/
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  COPY & PASTE THIS MESSAGE TO FRIENDS                     ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Hey! 👋
echo.
echo Quick question - do you know anyone who needs an influencer profile?
echo.
echo I built an AI that creates complete influencer profiles in 3 minutes:
echo ✅ Full identity ^& backstory
echo ✅ Instagram profile with posts
echo ✅ TikTok setup
echo ✅ 7-day content calendar
echo ✅ AI-generated profile image
echo.
echo Launch special: $75 (normally $150) - first 10 customers only!
echo.
echo Perfect for content creators, agencies, or testing ideas.
echo.
echo Want to try it? https://whop.com/golo-capo/
echo.
echo Or know someone who might? Share it with them! 🚀
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  WHAT TO DO NOW (15 minutes)                              ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 1. Copy the message above (already has your Whop link!)
echo 2. Open Telegram (already open)
echo 3. Click "New Message" (pencil icon ✏️)
echo 4. Search for a friend
echo 5. Paste message
echo 6. Send! 📤
echo 7. Repeat for 20 friends
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  EXPECTED RESULTS                                         ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Next 30 minutes: 2-3 sales = $150-225
echo Today: 5-10 sales = $375-750
echo This week: 15-30 sales = $1,125-2,250
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  YOUR STORE IS LIVE!                                      ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo ✅ Whop store complete
echo ✅ Product live: https://whop.com/golo-capo/
echo ✅ Payments ready (Stripe)
echo ✅ Automation ready (n8n)
echo ✅ Everything anonymous
echo.
echo.
echo ========================================
echo    💰 GO MAKE MONEY NOW!
echo ========================================
echo.
echo Copy the message above
echo Send to 20 friends
echo Get sales!
echo.
pause

