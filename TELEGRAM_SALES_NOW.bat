@echo off
color 0B
title 💰 TELEGRAM SALES - MESSAGE NOW
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         💰 TELEGRAM SALES - MESSAGE NOW                  ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Opening Telegram...
echo.

REM Open Telegram Web
echo [1/2] Opening Telegram Web...
start https://web.telegram.org
timeout /t 2 /nobreak >nul

REM Open Telegram Desktop (if installed)
echo [2/2] Opening Telegram Desktop (if installed)...
start telegram:
timeout /t 1 /nobreak >nul

REM Open sales script
cd /d "%~dp0"
start "" "TELEGRAM_SALES_SCRIPT.md"
timeout /t 1 /nobreak >nul

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ TELEGRAM OPENED!                                      ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  COPY & PASTE THIS MESSAGE TO FRIENDS                    ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Hey [Name]!
echo.
echo I just built something cool - an AI that creates complete 
echo influencer profiles in 3 minutes.
echo.
echo Want to try it? Launch special: $75 (normally $150)
echo.
echo What you get:
echo ✅ Complete influencer identity
echo ✅ Instagram profile (username, bio, posts)
echo ✅ TikTok setup
echo ✅ 7-day content calendar
echo ✅ AI-generated profile image
echo ✅ Instant delivery
echo.
echo Perfect for content creators, agencies, or just testing ideas!
echo.
echo Interested? [Your Whop store link]
echo.
echo Let me know! 🚀
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  TELEGRAM GROUPS TO POST IN                               ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Search for these groups in Telegram:
echo.
echo - Entrepreneurship groups
echo - Marketing groups
echo - Content Creator groups
echo - Side Hustle groups
echo - Startup groups
echo - Digital Marketing groups
echo.
echo Post the message from TELEGRAM_SALES_SCRIPT.md
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  QUICK ACTIONS                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 1. Message 20 friends (copy message above)
echo 2. Post in 5 Telegram groups
echo 3. Share in your Telegram channel (if you have one)
echo 4. Use your Telegram bot: /create [influencer details]
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  EXPECTED RESULTS                                         ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Friends: 2-3 sales = $150-225
echo Groups: 1-2 sales = $75-150
echo Bot users: 0-1 sales = $0-75
echo.
echo TOTAL: 3-6 sales = $225-450
echo.
echo.
echo ========================================
echo    💰 GO MESSAGE ON TELEGRAM!
echo ========================================
echo.
echo Copy the message above
echo Send to 20 friends
echo Post in groups
echo Get sales!
echo.
pause

