@echo off
color 0B
title 🤖 Telegram Bot - Get Chat IDs
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         🤖 TELEGRAM BOT - GET CHAT IDs                   ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo This will help you get chat IDs for automated messaging.
echo.
echo STEP 1: Send a message to your bot first!
echo.
echo Your bot: @[Your bot username]
echo Or search for your bot in Telegram
echo.
echo Press any key after you've sent a message to your bot...
pause >nul

echo.
echo Opening browser to get chat IDs...
echo.

REM Open browser to get chat IDs
start https://api.telegram.org/botREMOVED_TELEGRAM_TOKEN/getUpdates

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  INSTRUCTIONS                                             ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 1. Browser opened with your bot's updates
echo 2. Look for "chat":{"id": followed by a number
echo 3. Copy those numbers (chat IDs)
echo 4. Add them to telegram-auto-send.js
echo.
echo OR use the simpler method:
echo - Just message friends manually in Telegram
echo - Copy/paste from OPTIMIZED_SALES_MESSAGES.md
echo - Works great and is faster!
echo.
echo.
echo ========================================
echo    💡 TIP: Manual method is easier!
echo ========================================
echo.
echo Just open Telegram and message friends manually.
echo Copy message from OPTIMIZED_SALES_MESSAGES.md
echo Send to 20 friends.
echo Get sales!
echo.
pause

