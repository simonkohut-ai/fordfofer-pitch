@echo off
title BUFFER EXTENSION AUTO
color 0A

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║     📱 BUFFER EXTENSION AUTO                                  ║
echo ║     Generuje → Kopíruje → Ty len klikneš Buffer extension    ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo 🤖 Spúšťam BUFFER EXTENSION AUTO...
echo.
echo ✅ Generuje content cez OpenAI
echo ✅ Kopíruje do schránky
echo ✅ Otvára súbor
echo ✅ Ty len klikneš Buffer extension a postneš
echo.

start "Buffer Extension Auto" cmd /k "cd automation && node BUFFER_EXTENSION_AUTO.js"

echo.
echo ✅ Systém beží!
echo.
echo 📋 Post je v schránke - klikni Buffer extension!
echo.
pause

