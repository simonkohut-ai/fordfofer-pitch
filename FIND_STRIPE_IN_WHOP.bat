@echo off
REM 🦄 Find Stripe in Whop Dashboard
color 0B
title 🔍 FIND STRIPE IN WHOP
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         🔍 FIND STRIPE IN WHOP                           ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo ⚠️  IMPORTANT: Stripe is NOT in "Payment Methods"!
echo    Stripe is in SETTINGS → Payment Processing
echo.

echo Opening Whop Dashboard...
start https://whop.com/dashboard/biz_Xbc1GqyFkzAX43/settings
timeout /t 2 /nobreak >nul

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  WHERE TO FIND STRIPE                                      ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo ✅ CORRECT PATH:
echo    1. Click "Settings" (gear icon, top right)
echo    2. Look for "Payments" or "Payment Processing"
echo    3. Find "Stripe" or "Connect Stripe"
echo    4. Click "Connect" or "Set Up"
echo.
echo ❌ WRONG PATH:
echo    Payments → Payment Methods (this is for customers)
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  WHAT YOU'LL SEE                                           ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo In Settings → Payments, you should see:
echo   - "Stripe" section
echo   - "Connect Stripe" button
echo   - Or "Stripe Account" settings
echo.
echo NOT in Payment Methods (that's for customers):
echo   - Visa, Mastercard (these USE Stripe, but Stripe isn't listed)
echo   - PayPal, Crypto, etc.
echo.

echo Opening guide...
timeout /t 2 /nobreak >nul
if exist "WHOP_STRIPE_SETUP.md" (
    start "" "WHOP_STRIPE_SETUP.md"
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ALTERNATIVE: Use Skrill                                   ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo If you can't find Stripe, use Skrill instead:
echo   - Already configured: gcapovic.biz@proton.me
echo   - Accepts cards (lower fees: 1.9%% vs 2.9%%)
echo   - Accepts crypto (BTC, ETH, USDT)
echo   - Accepts bank transfers
echo.
echo Skrill can be your PRIMARY payment account!
echo.

pause
