@echo off
title AUTO MARKETING MACHINE
color 0A

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║     🦄 AUTO MARKETING MACHINE                                  ║
echo ║     Všetko automaticky - Instagram + Influencers              ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo 🚀 Spúšťam AUTO MARKETING MACHINE...
echo.
echo ✅ Generuje Instagram posts každé 2h
echo ✅ Generuje influencer emails
echo ✅ Všetko smeruje na Skrill platby
echo ✅ Všetko automaticky!
echo.

start "Auto Marketing" cmd /k "cd automation && node AUTO_MARKETING_MACHINE.js"

echo.
echo ✅ Systém beží!
echo.
echo 📁 Content nájdeš v: auto-marketing/
echo.
pause

