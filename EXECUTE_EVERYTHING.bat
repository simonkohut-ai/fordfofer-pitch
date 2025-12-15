@echo off
color 0A
title MAKE MONEY NOW - FULL EXECUTION
cls

echo.
echo ========================================
echo    💰 MAKE MONEY NOW - FULL EXECUTION
echo ========================================
echo.
echo Opening all tabs...
echo.

REM Open Whop
echo [1/5] Opening Whop store...
start https://whop.com
timeout /t 2 /nobreak >nul

REM Open n8n
echo [2/5] Opening n8n for Telegram bot...
start https://app.n8n.cloud
timeout /t 2 /nobreak >nul

REM Open Reddit
echo [3/5] Opening Reddit for marketing...
start https://www.reddit.com/r/SideHustle/submit
timeout /t 2 /nobreak >nul

REM Open Twitter
echo [4/5] Opening Twitter for marketing...
start https://twitter.com/compose/tweet
timeout /t 2 /nobreak >nul

REM Open Gmail App Passwords
echo [5/5] Opening Gmail app passwords...
start https://myaccount.google.com/apppasswords
timeout /t 2 /nobreak >nul

cls
echo.
echo ========================================
echo    ✅ ALL TABS OPENED!
echo ========================================
echo.
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 1: WHOP SETUP (15 min)                             ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo In Whop tab:
echo   1. Settings → Payments → Connect Stripe
echo   2. Create Product:
echo      - Name: AI Influencer - Complete Profile
echo      - Price: $150
echo      - Type: Digital Product
echo      - Description: [Copy from DO_THIS_NOW.md]
echo   3. Copy your store URL
echo.
pause

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 2: TELEGRAM BOT (10 min)                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo In n8n tab:
echo   1. Open Telegram workflow
echo   2. Add Telegram credential:
echo      Token: REMOVED_TELEGRAM_TOKEN
echo   3. Add OpenAI credential (your API key)
echo   4. Add Gmail credential:
echo      - Get app password from Gmail tab
echo      - User: simonkohut21@gmail.com
echo      - Password: [16-char app password]
echo      - Host: smtp.gmail.com
echo      - Port: 587
echo      - Secure: NO
echo   5. Activate workflow (green toggle)
echo   6. Test in Telegram: /create test influencer
echo.
pause

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 3: GET SALES (30 min)                               ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Option A: Message 10 Friends (FASTEST)
echo   - Copy message from QUICK_SALES_SCRIPT.md
echo   - Send to 10 friends
echo   - Include your Whop store URL
echo   - Goal: 2-3 sales = $150-225
echo.
echo Option B: Post on Reddit (QUICK)
echo   - Copy post from QUICK_SALES_SCRIPT.md
echo   - Post in r/SideHustle
echo   - Add your Whop link
echo   - Goal: 2-5 sales = $150-375
echo.
echo Option C: Post on Twitter (QUICK)
echo   - Copy thread from QUICK_SALES_SCRIPT.md
echo   - Post thread
echo   - Add your Whop link
echo   - Goal: 1-3 sales = $75-225
echo.
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  EXPECTED RESULTS:                                         ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Time: 55 minutes
echo Sales: 5-11
echo Revenue: $375-825
echo Profit: $370-820
echo.
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  QUICK REFERENCE FILES:                                    ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo - DO_THIS_NOW.md (step-by-step guide)
echo - QUICK_SALES_SCRIPT.md (copy & paste messages)
echo - MAKE_MONEY_NOW.md (full plan)
echo.
echo.
echo ========================================
echo    🚀 GO MAKE MONEY!
echo ========================================
echo.
echo Execute these steps and money will flow!
echo.
echo Press any key to open reference files...
pause >nul

REM Open reference files
start "" "fordfofer-pitch\DO_THIS_NOW.md"
timeout /t 1 /nobreak >nul
start "" "fordfofer-pitch\QUICK_SALES_SCRIPT.md"

echo.
echo Reference files opened!
echo.
echo Good luck! 💰🚀
echo.
pause

