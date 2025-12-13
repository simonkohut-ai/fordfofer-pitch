@echo off
title FORDFOFER INFLUENCER SYSTEM
color 0A

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║     🦄 INFLUENCER SYSTEM                                      ║
echo ║     Vytvára influencer content a posiela emaily              ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo 🚀 Spúšťam INFLUENCER systém...
echo.
echo ✅ Vytvára influencer databázu
echo ✅ Generuje emaily pre všetkých influencerov
echo ✅ Ukladá emaily do súborov
echo ✅ Automaticky posiela každý deň o 9:00
echo.

start "Influencer System" cmd /k "cd automation && node INFLUENCER_SYSTEM.js"

echo.
echo ✅ Systém beží!
echo.
echo 📧 Emaily nájdeš v: emails\
echo 📋 Influencer list: influencers\
echo.
pause


