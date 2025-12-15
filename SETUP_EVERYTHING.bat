@echo off
REM 🦄 Complete Setup - Golo Čapo Anonymous Configuration
color 0A
title 🚀 SETUP EVERYTHING - Golo Čapo
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         🚀 SETUP EVERYTHING - Golo Čapo                  ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo ✅ This script will:
echo    1. Show you what's configured
echo    2. Show you what needs payment info
echo    3. Guide you through filling placeholders
echo    4. Open all necessary files
echo.

pause

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 1: Opening Configuration Files                     ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

REM Open main config files
if exist "CONFIG.js" (
    start "" "CONFIG.js"
    echo ✅ Opened: CONFIG.js
)
if exist "PAYMENT_CONFIG.js" (
    start "" "PAYMENT_CONFIG.js"
    echo ✅ Opened: PAYMENT_CONFIG.js
)
if exist "COMPLETE_PLACEHOLDER_STATUS.md" (
    start "" "COMPLETE_PLACEHOLDER_STATUS.md"
    echo ✅ Opened: COMPLETE_PLACEHOLDER_STATUS.md
)

timeout /t 2 /nobreak >nul

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 2: Quick Setup Guide                                ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo 📋 EASIEST WAY TO SETUP:
echo.
echo 1. PAYMENT METHODS (5 minutes):
echo    - Open PAYMENT_CONFIG.js
echo    - Find "YOUR_BTC_WALLET_ADDRESS"
echo    - Replace with your Bitcoin address
echo    - Repeat for ETH, USDT, etc.
echo    - Change "status: pending" to "status: active"
echo.
echo 2. IDENTITY REPLACEMENT (10 minutes):
echo    - Run: REPLACE_IDENTITY.bat (finds all files)
echo    - Or use VS Code/Cursor Find & Replace:
echo      * Ctrl+Shift+F (search all files)
echo      * Find: "Šimon Kohút"
echo      * Replace: "Golo Čapo"
echo      * Replace All
echo.
echo 3. TEST (2 minutes):
echo    - Run: START_MAKING_SALES.bat
echo    - Check dashboard works
echo    - Test payment links
echo.

echo Opening quick guide...
timeout /t 2 /nobreak >nul
if exist "QUICK_SETUP_GUIDE.md" (
    start "" "QUICK_SETUP_GUIDE.md"
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ READY!                                                ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Follow the steps above or see QUICK_SETUP_GUIDE.md
echo.
pause
