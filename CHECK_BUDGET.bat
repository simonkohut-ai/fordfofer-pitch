@echo off
REM 🦄 Check Budget and Account Status
color 0B
title 💰 BUDGET CHECK
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         💰 BUDGET & ACCOUNT STATUS                        ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  💳 CURRENT BUDGET                                        ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo Skrill Balance: 20 EUR
echo.
echo This is your working capital for:
echo   - OpenAI API costs
echo   - Additional services
echo   - Scaling the business
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ YOUR PRO ACCOUNTS                                     ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo 1. Vercel Pro: ✅ Active ($20/month - already paid)
echo    - Unlimited bandwidth
echo    - Unlimited functions
echo    - Advanced analytics
echo.

echo 2. Gemini Pro: ✅ Active
echo    - Advanced AI capabilities
echo    - Use for some tasks (save OpenAI costs)
echo.

echo 3. OpenAI Pro: ✅ Active
echo    - Higher rate limits
echo    - Priority access
echo    - Better rates than free tier
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  💰 BUDGET ALLOCATION                                     ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo Recommended split:
echo   OpenAI API: ~15 EUR (1-2 months)
echo   Reserve: ~5 EUR (emergency buffer)
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  📊 COST TRACKING                                         ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo Fixed Costs (Already Paid):
echo   ✅ Vercel Pro: $20/month
echo   ✅ Gemini Pro: (check your plan)
echo   ✅ OpenAI Pro: (check your plan)
echo.

echo Variable Costs (From 20 EUR):
echo   OpenAI API usage: ~$5-15/month
echo   Other services: As needed
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  🎯 STRATEGY                                              ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo 1. Use Pro accounts first (unlimited/cheaper)
echo 2. Use 20 EUR for OpenAI API costs
echo 3. Monitor usage weekly
echo 4. Generate revenue to fund operations
echo.

echo Opening budget tracker...
timeout /t 2 /nobreak >nul
if exist "BUDGET_TRACKER.md" (
    start "" "BUDGET_TRACKER.md"
)

echo.
echo Opening accounts to check:
start https://platform.openai.com/usage
timeout /t 1 /nobreak >nul
start https://vercel.com/dashboard
timeout /t 1 /nobreak >nul

echo.
pause
