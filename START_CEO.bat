@echo off
title FORDFOFER FULL AUTO CEO
color 0A

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║     🦄 FORDFOFER FULL AUTO CEO                                 ║
echo ║     ROBÍM VŠETKO ZA TEBA - TERAZ LEN ČAKAJ!                   ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo 🚀 Spúšťam FULL AUTO CEO systém...
echo.
echo ✅ Automaticky generuje posty každé 2 hodiny
echo ✅ Automaticky commitne
echo ✅ Automaticky deployne
echo ✅ Všetko sa robí za teba!
echo.

start "FULL AUTO CEO" cmd /k "cd automation && node FULL_AUTO_CEO.js"

echo.
echo ✅ Systém beží na pozadí!
echo.
echo 📝 Posty sa ukladajú do: generated-posts\
echo 💾 Automaticky sa commitnú a pushnú
echo 🌐 Automaticky sa deploynú
echo.
echo Teraz len čakaj a všetko sa robí automaticky! 🦄
echo.
pause


