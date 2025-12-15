@echo off
color 0E
title 📱 TELEGRAM - SIMPLE GUIDE
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         📱 TELEGRAM - SIMPLE GUIDE                        ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Opening Telegram and guide...
echo.

REM Open Telegram
echo [1/3] Opening Telegram...
start https://web.telegram.org
timeout /t 2 /nobreak >nul

REM Open simple guide
echo [2/3] Opening simple guide...
cd /d "%~dp0"
start "" "HOW_TO_USE_TELEGRAM.md"
timeout /t 1 /nobreak >nul

REM Open message
echo [3/3] Opening your message...
start "" "TELEGRAM_SALES_MESSAGES.md"

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ EVERYTHING OPENED!                                    ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  EXACT STEPS (FOLLOW THESE!)                              ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo STEP 1: In Telegram (already open):
echo    → Look at the TOP of the screen
echo    → You'll see a SEARCH BAR 🔍
echo    → Click on it
echo.
echo STEP 2: Type "Marketing" or "Entrepreneurship"
echo    → Press Enter
echo.
echo STEP 3: Look below the search results
echo    → You'll see tabs: [All] [Groups] [Channels]
echo    → Click on "Groups" tab
echo.
echo STEP 4: You'll see a list of groups
echo    → Click "Join" button on 10 groups
echo.
echo STEP 5: Open a group (click on its name)
echo    → Look at the BOTTOM of the screen
echo    → You'll see a MESSAGE BOX (where you type)
echo    → Copy message from TELEGRAM_SALES_MESSAGES.md
echo    → Paste it in the message box
echo    → Click "Send" (or press Enter)
echo.
echo STEP 6: Repeat for all 10 groups!
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  WHERE TO FIND THINGS                                      ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo SEARCH BAR: Top of Telegram screen (🔍 icon)
echo GROUPS TAB: Below search results (click "Groups")
echo JOIN BUTTON: Next to each group name
echo MESSAGE BOX: Bottom of group chat (where you type)
echo SEND BUTTON: Next to message box (or press Enter)
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  YOUR MESSAGE (COPY FROM TELEGRAM_SALES_MESSAGES.md)      ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo (Already open in Notepad - just copy and paste!)
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  NEED HELP?                                                ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Open: HOW_TO_USE_TELEGRAM.md (already open)
echo It has pictures and detailed steps!
echo.
echo.
echo ========================================
echo    📱 GO TO TELEGRAM NOW!
echo ========================================
echo.
echo Follow the steps above - it's easy!
echo.
pause

