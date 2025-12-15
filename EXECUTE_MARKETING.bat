@echo off
color 0E
title MARKETING LAUNCH - GET SALES NOW
cls

echo.
echo ========================================
echo    📢 MARKETING LAUNCH - GET SALES NOW
echo ========================================
echo.
echo Opening marketing platforms...
echo.

REM Open Reddit
echo [1/4] Opening Reddit...
start https://www.reddit.com/r/SideHustle/submit
timeout /t 2 /nobreak >nul

REM Open Twitter
echo [2/4] Opening Twitter...
start https://twitter.com/compose/tweet
timeout /t 2 /nobreak >nul

REM Open Instagram
echo [3/4] Opening Instagram...
start https://www.instagram.com
timeout /t 2 /nobreak >nul

REM Open Facebook
echo [4/4] Opening Facebook...
start https://www.facebook.com
timeout /t 2 /nobreak >nul

cls
echo.
echo ========================================
echo    ✅ ALL PLATFORMS OPENED!
echo ========================================
echo.
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  COPY & PASTE THESE MESSAGES                              ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Opening QUICK_SALES_SCRIPT.md for you to copy...
echo.
timeout /t 2 /nobreak >nul

REM Open sales script
cd /d "%~dp0"
start "" "QUICK_SALES_SCRIPT.md"

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  MARKETING CHECKLIST                                       ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo [ ] Reddit post (r/SideHustle)
echo [ ] Twitter thread
echo [ ] Instagram post
echo [ ] Facebook groups (3-5 groups)
echo [ ] Message 10 friends
echo [ ] DM 10 potential customers
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  PRICING STRATEGY                                           ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Launch Special: $75 (first 10 customers)
echo Regular Price: $150
echo Agency Pack: $400 (3 profiles)
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  EXPECTED RESULTS                                          ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Friends: 2-3 sales = $150-225
echo Reddit: 2-5 sales = $150-375
echo Twitter: 1-3 sales = $75-225
echo Instagram: 1-2 sales = $75-150
echo Facebook: 1-2 sales = $75-150
echo.
echo TOTAL: 7-15 sales = $525-1,125
echo.
echo.
echo ========================================
echo    🚀 GO POST EVERYWHERE!
echo ========================================
echo.
echo Copy messages from QUICK_SALES_SCRIPT.md
echo Add your Whop store URL
echo Post and get sales!
echo.
pause

