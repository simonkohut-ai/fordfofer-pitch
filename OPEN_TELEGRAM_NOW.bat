@echo off
color 0B
title 📱 TELEGRAM - QUICK START
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         📱 TELEGRAM - QUICK START                         ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Opening Telegram and sales messages...
echo.

REM Open Telegram
echo [1/4] Opening Telegram...
start https://web.telegram.org
timeout /t 2 /nobreak >nul

REM Open sales messages
echo [2/4] Opening sales messages...
cd /d "%~dp0"
start "" "TELEGRAM_SALES_MESSAGES.md"
timeout /t 1 /nobreak >nul

REM Open quick steps
echo [3/4] Opening quick steps guide...
start "" "TELEGRAM_QUICK_STEPS.md"
timeout /t 1 /nobreak >nul

REM Open dashboard
echo [4/4] Opening dashboard...
start "" "dashboard\index.html"

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ EVERYTHING OPENED!                                    ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ANONYMOUS MARKETING (5 MINUTES!)                          ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 1. In Telegram (already open):
echo    → Click Search 🔍
echo    → Type: "Entrepreneurship" or "Marketing" or "Side Hustle"
echo    → Click "Groups" tab
echo    → Join 10 groups
echo.
echo 2. Copy message from TELEGRAM_SALES_MESSAGES.md
echo    (already open in Notepad)
echo.
echo 3. Open each group → Paste message → Send! 📤
echo.
echo 4. Repeat for all 10 groups!
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  YOUR MESSAGE (READY TO COPY!)                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 🚀 NEW: AI Influencer Generator - 3 Minute Complete Profile
echo.
echo I built an AI system that creates everything you need:
echo.
echo ✅ Complete influencer identity
echo ✅ Instagram profile (username, bio, posts)
echo ✅ TikTok setup
echo ✅ 7-day content calendar
echo ✅ AI-generated profile image
echo.
echo All delivered via email in 3-5 minutes - fully automated!
echo.
echo LAUNCH SPECIAL: $75 (first 10 customers - 50% OFF!)
echo Regular: $150 ^| Agency Pack: $400 (3 profiles)
echo.
echo Perfect for content creators, agencies, or testing concepts.
echo.
echo 👉 https://whop.com/golo-capo/
echo.
echo Questions? Ask below! 💬
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  EXPECTED RESULTS                                          ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 10 groups = 2-5 sales = $150-375
echo.
echo.
echo ========================================
echo    📱 GO MESSAGE YOUR FRIENDS!
echo ========================================
echo.
pause

