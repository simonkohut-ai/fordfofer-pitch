@echo off
title MARKETING STORM BLITZ
color 0C

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║     🌪️ MARKETING STORM BLITZ                                  ║
echo ║     MASÍVNA KAMPAŇ - VŠETOK CONTENT NARAZ!                    ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo 🚀 Spúšťam MARKETING STORM BLITZ...
echo.
echo ✅ Generuje 10 Instagram Posts
echo ✅ Generuje 10 Stories
echo ✅ Generuje 3 Twitter Threads
echo ✅ Generuje 10 DM Templates
echo ✅ Generuje LinkedIn Post
echo ✅ Všetko naraz!
echo.

cd automation
node MARKETING_STORM_BLITZ.js

echo.
echo ✅ BLITZ COMPLETE!
echo.
echo 📁 Content nájdeš v: blitz-content\
echo.
pause


