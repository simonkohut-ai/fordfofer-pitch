@echo off
color 0B
title 🆓 START FREE - Manual Marketing
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         🆓 START FREE - Manual Marketing                  ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0\.."

echo ✅ Bootstrap Strategy: Start FREE, Make Sale, Then Add AI
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 1: Manual Marketing (FREE)                         ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Opening marketing resources...
echo.

REM Open sales scripts
if exist "QUICK_SALES_SCRIPT.md" (
    start "" "QUICK_SALES_SCRIPT.md"
    echo ✅ Opened: QUICK_SALES_SCRIPT.md
)

REM Open marketing templates
if exist "marketing-templates" (
    start "" "marketing-templates"
    echo ✅ Opened: marketing-templates folder
)

REM Open revenue tracker
if exist "REVENUE_TRACKER.md" (
    start "" "REVENUE_TRACKER.md"
    echo ✅ Opened: REVENUE_TRACKER.md
)

REM Open bootstrap plan
if exist "ai-agent\BOOTSTRAP_PLAN.md" (
    start "" "ai-agent\BOOTSTRAP_PLAN.md"
    echo ✅ Opened: BOOTSTRAP_PLAN.md
)

timeout /t 2 /nobreak >nul

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 2: Post Manually                                    ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Opening platforms...
echo.

start https://www.reddit.com/r/SideHustle/submit
timeout /t 1 /nobreak >nul
start https://www.reddit.com/r/Entrepreneur/submit
timeout /t 1 /nobreak >nul
start https://twitter.com/compose/tweet
timeout /t 1 /nobreak >nul
start https://web.telegram.org

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ READY TO START!                                       ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 📋 Action Plan:
echo   1. Copy templates from QUICK_SALES_SCRIPT.md
echo   2. Post to Reddit, Twitter, Telegram
echo   3. Track sales in REVENUE_TRACKER.md
echo   4. Make first sale ($75)
echo   5. Then add AI with sale revenue!
echo.
echo 💰 One $75 sale = Months of API costs!
echo.
echo See BOOTSTRAP_PLAN.md for full strategy
echo.
pause
