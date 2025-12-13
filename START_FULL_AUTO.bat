@echo off
title FULL AUTO WITH OPENAI
color 0A

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║     🚀 FULL AUTO WITH OPENAI                                  ║
echo ║     100% AUTOMATIZÁCIA - GENERUJE A POSTUJE                  ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo 🤖 Spúšťam FULL AUTO systém...
echo.
echo ✅ Generuje content cez OpenAI
echo ✅ Ukladá do súborov
echo ✅ Postuje na Buffer (ak máš token)
echo ✅ Commitne automaticky
echo ✅ Všetko 100% automaticky!
echo.

start "FULL AUTO" cmd /k "cd automation && node FULL_AUTO_OPENAI.js"

echo.
echo ✅ Systém beží!
echo.
echo 📁 Posty nájdeš v: generated-posts\
echo.
pause


