@echo off
REM 🦄 Quick Payment Setup
color 0B
title 💳 FILL PAYMENT PLACEHOLDERS
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         💳 FILL PAYMENT PLACEHOLDERS                      ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo 📋 QUICK SETUP:
echo.
echo 1. I'll open PAYMENT_CONFIG.js
echo 2. You fill in your payment addresses
echo 3. Change "pending" to "active"
echo 4. Save and done!
echo.

pause

echo Opening PAYMENT_CONFIG.js...
if exist "PAYMENT_CONFIG.js" (
    start "" "PAYMENT_CONFIG.js"
    echo ✅ Opened!
) else (
    echo ❌ File not found!
    pause
    exit /b 1
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  WHAT TO FILL                                              ═
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Find these in the file:
echo.
echo 🔴 Priority 1 (Most Important):
echo    - YOUR_BTC_WALLET_ADDRESS → Your Bitcoin address
echo    - YOUR_ETH_WALLET_ADDRESS → Your Ethereum address
echo.
echo 🟡 Priority 2 (Nice to Have):
echo    - YOUR_USDT_WALLET_ADDRESS → Your USDT address
echo    - YOUR_IBAN_HERE → Your bank IBAN
echo.
echo 🟢 Priority 3 (Optional):
echo    - YOUR_REVOLUT_PAYMENT_LINK
echo    - YOUR_CASHAPP_TAG
echo    - Others...
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  HOW TO FILL                                               ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 1. Find: "YOUR_BTC_WALLET_ADDRESS"
echo 2. Replace with: "bc1q..." (your actual address)
echo 3. Find: "status: \"pending\""
echo 4. Replace with: "status: \"active\""
echo 5. Save file (Ctrl+S)
echo.
echo Repeat for each payment method you want to add!
echo.

echo Opening guide...
timeout /t 2 /nobreak >nul
if exist "QUICK_SETUP_GUIDE.md" (
    start "" "QUICK_SETUP_GUIDE.md"
)

echo.
echo ✅ File is open! Fill in your addresses and save.
echo.
pause
