@echo off
REM 🦄 Personal Brand Signature
color 0A
title 🚀 START MAKING SALES NOW
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         🚀 START MAKING SALES NOW                         ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo ✅ Status Check:
echo    ✅ OpenAI: $10 credit ready
echo    ✅ Dashboard: Ready
echo    ✅ AI Agent: Ready
echo    ✅ Marketing Templates: Ready
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  OPENING EVERYTHING YOU NEED...                           ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

REM Open Dashboard
echo [1/6] Opening Dashboard...
cd dashboard
start "" "index.html"
cd ..
timeout /t 1 /nobreak >nul

REM Open Sales Scripts
echo [2/6] Opening Sales Scripts...
if exist "QUICK_SALES_SCRIPT.md" (
    start "" "QUICK_SALES_SCRIPT.md"
)
timeout /t 1 /nobreak >nul

REM Open Revenue Tracker
echo [3/6] Opening Revenue Tracker...
if exist "REVENUE_TRACKER.md" (
    start "" "REVENUE_TRACKER.md"
)
timeout /t 1 /nobreak >nul

REM Open Marketing Platforms
echo [4/6] Opening Marketing Platforms...
start https://www.reddit.com/r/SideHustle/submit
timeout /t 1 /nobreak >nul
start https://www.reddit.com/r/Entrepreneur/submit
timeout /t 1 /nobreak >nul
start https://twitter.com/compose/tweet
timeout /t 1 /nobreak >nul
start https://web.telegram.org
timeout /t 1 /nobreak >nul

REM Open AI Agent (optional - for automated campaigns)
echo [5/6] AI Agent ready (use when needed)...
if exist "ai-agent\RUN_AGENT_NOW.bat" (
    echo    Location: ai-agent\RUN_AGENT_NOW.bat
)
timeout /t 1 /nobreak >nul

REM Open Whop Store
echo [6/6] Opening Whop Store...
start https://whop.com/golo-capo/
timeout /t 1 /nobreak >nul

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ EVERYTHING IS OPEN!                                   ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 📋 QUICK ACTION PLAN:
echo.
echo 1. DASHBOARD (Password: moneymachine25)
echo    - Track sales & revenue
echo    - Use AI Chat for automation
echo    - Monitor campaigns
echo.
echo 2. SALES SCRIPTS
echo    - Copy templates from QUICK_SALES_SCRIPT.md
echo    - Post to Reddit, Twitter, Telegram
echo    - Use launch special: $75 (first 10 customers)
echo.
echo 3. AI AGENT (Optional - Automated)
echo    - Run: ai-agent\RUN_AGENT_NOW.bat
echo    - Command: "Launch Telegram campaign"
echo    - Uses your $10 OpenAI credit
echo.
echo 4. TRACK SALES
echo    - Update REVENUE_TRACKER.md after each sale
echo    - Dashboard auto-updates
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  💰 GOAL: Make First Sale ($75) Today!                   ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 🚀 You're ready to make sales!
echo.
pause
