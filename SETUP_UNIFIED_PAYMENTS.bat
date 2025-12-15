@echo off
REM 🦄 Unified Payment Setup - One Account for Everything
color 0A
title 💳 SETUP UNIFIED PAYMENTS
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         💳 UNIFIED PAYMENT SETUP                          ║
echo ║         One Account for All Payments                      ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo ✅ RECOMMENDATION: Stripe (via Whop) as Primary
echo    - Most secure
echo    - Already integrated
echo    - Accepts cards (most customers)
echo.
echo ✅ Secondary: Skrill (for crypto & international)
echo    - Lower fees
echo    - Crypto support
echo    - Already configured
echo.

pause

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 1: Verify Stripe Account (Via Whop)                ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo Opening Whop dashboard...
start https://whop.com/golo-capo/
timeout /t 2 /nobreak >nul

echo.
echo Instructions:
echo   1. Go to Settings → Payments → Stripe
echo   2. Complete verification:
echo      - Business name: "Golo Čapo Studio"
echo      - Business type: Individual/Sole Proprietor
echo      - Use anonymous details (Golo Čapo)
echo   3. Add bank account for payouts
echo   4. Enable automatic payouts
echo.

pause

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 2: Configure Skrill (For Crypto)                   ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo Opening Skrill...
start https://www.skrill.com
timeout /t 2 /nobreak >nul

echo.
echo Instructions:
echo   1. Login: gcapovic.biz@proton.me
echo   2. Enable crypto wallet (if available)
echo   3. Add bank account for withdrawals
echo   4. Set up automatic withdrawals
echo.

pause

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 3: Payment Routing                                  ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo Payment Routing Strategy:
echo.
echo PRIMARY (Stripe via Whop):
echo   ✅ Credit/Debit cards
echo   ✅ Apple Pay / Google Pay
echo   ✅ Most customers
echo.
echo SECONDARY (Skrill):
echo   ✅ Crypto (BTC, ETH, USDT)
echo   ✅ Bank transfers
echo   ✅ International payments
echo.

echo Opening configuration files...
timeout /t 2 /nobreak >nul
if exist "UNIFIED_PAYMENT_CONFIG.js" (
    start "" "UNIFIED_PAYMENT_CONFIG.js"
    echo ✅ Opened: UNIFIED_PAYMENT_CONFIG.js
)
if exist "UNIFIED_PAYMENT_SETUP.md" (
    start "" "UNIFIED_PAYMENT_SETUP.md"
    echo ✅ Opened: UNIFIED_PAYMENT_SETUP.md
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ SETUP COMPLETE!                                        ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo All payments will route to:
echo   PRIMARY: Stripe (via Whop) - Cards, most payments
echo   SECONDARY: Skrill - Crypto, bank transfers
echo.
echo See UNIFIED_PAYMENT_SETUP.md for details
echo.
pause
