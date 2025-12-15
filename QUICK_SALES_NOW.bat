@echo off
color 0C
title 💰 QUICK SALES - MESSAGE FRIENDS NOW
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         💰 QUICK SALES - MESSAGE FRIENDS NOW              ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Opening messaging platforms...
echo.

REM WhatsApp
echo [1/4] Opening WhatsApp...
start https://web.whatsapp.com
timeout /t 2 /nobreak >nul

REM Telegram
echo [2/4] Opening Telegram...
start https://web.telegram.org
timeout /t 2 /nobreak >nul

REM Facebook Messenger
echo [3/4] Opening Facebook Messenger...
start https://www.messenger.com
timeout /t 2 /nobreak >nul

REM Sales script
echo [4/4] Opening sales script...
cd /d "%~dp0"
start "" "QUICK_SALES_SCRIPT.md"
timeout /t 2 /nobreak >nul

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ ALL PLATFORMS OPENED!                                 ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  COPY & PASTE THIS MESSAGE TO 20 FRIENDS                  ║
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
echo ║  QUICK TIPS                                               ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 1. Personalize: Add their name
echo 2. Add urgency: "Launch special ends soon!"
echo 3. Add your Whop link
echo 4. Send to 20 people
echo 5. Expected: 2-3 sales = $150-225
echo.
echo.
echo ========================================
echo    💰 GO MESSAGE YOUR FRIENDS!
echo ========================================
echo.
echo Copy the message above
echo Send to 20 friends
echo Get sales!
echo.
pause

