@echo off
chcp 65001 >nul
title 🦄 FORDFOFER - META AUTO POST

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║  🦄 FORDFOFER - META BUSINESS SUITE AUTO POST                ║
echo ║  100%% Automatické postovanie na Instagram ZADARMO          ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0fordfofer-pitch\automation"

echo 📋 Kontrolujem nastavenie...
echo.

if not exist "config.js" (
    echo ❌ CHYBA: config.js neexistuje!
    pause
    exit /b 1
)

echo ✅ Config.js nájdený
echo.

echo 🚀 Spúšťam META AUTO POST...
echo.

node META_AUTO_POST.js

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ HOTOVO! Post je online na Instagrame!
    echo.
) else (
    echo.
    echo ❌ CHYBA pri postovaní!
    echo.
    echo 📋 Postupuj podľa: automation\META_BUSINESS_SETUP.md
    echo.
)

pause


