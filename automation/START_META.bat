@echo off
chcp 65001 >nul
cls

echo ╔═══════════════════════════════════════════════════════════════╗
echo ║  🚀 FORDFOFER META AUTO POST                                  ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.
echo Kontrolujem nastavenie...
echo.

cd /d "%~dp0"

:: Kontrola Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ CHYBA: Node.js nie je nainštalovaný
    echo 👉 Stiahni: https://nodejs.org
    pause
    exit /b 1
)

:: Kontrola dependencies
if not exist "node_modules" (
    echo 📦 Inštalujem dependencies...
    call npm install
    echo.
)

:: Kontrola config
node -e "const c=require('./config');if(c.META_ACCESS_TOKEN==='VLOZ_SEM'){console.error('❌ META_ACCESS_TOKEN nie je nastavený');process.exit(1)}if(c.INSTAGRAM_BUSINESS_ACCOUNT_ID==='VLOZ_SEM'){console.error('❌ INSTAGRAM_BUSINESS_ACCOUNT_ID nie je nastavený');process.exit(1)}"
if %errorlevel% neq 0 (
    echo.
    echo 📋 NASLEDUJ TIETO KROKY:
    echo 1. Otvor: automation\QUICK_META_SETUP.md
    echo 2. Postupuj podľa návodu (15 minút)
    echo 3. Vlož údaje do config.js
    echo 4. Spusti tento skript znova
    echo.
    pause
    exit /b 1
)

echo ✅ Všetko je nastavené správne
echo.
echo 🚀 Spúšťam automation...
echo.

:: Spusti META_AUTO_POST
node META_AUTO_POST.js

echo.
echo ═══════════════════════════════════════════════════════════════
echo.

if %errorlevel% equ 0 (
    echo ✅ ÚSPECH! Post je na Instagrame!
) else (
    echo ❌ Niečo zlyhalo. Skontroluj chyby vyššie.
)

echo.
pause

