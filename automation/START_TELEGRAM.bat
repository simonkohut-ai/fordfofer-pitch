@echo off
chcp 65001 >nul
cls

echo ╔═══════════════════════════════════════════════════════════════╗
echo ║  🤖 TELEGRAM AUTO POST BOT                                    ║
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
node -e "const c=require('./config');if(c.TELEGRAM_BOT_TOKEN==='VLOZ_TOKEN_SEM'){console.error('❌ TELEGRAM_BOT_TOKEN nie je nastavený');process.exit(1)}"
if %errorlevel% neq 0 (
    echo.
    echo 📋 NASLEDUJ TIETO KROKY:
    echo 1. Otvor: automation\TELEGRAM_BOT_SETUP.md
    echo 2. Postupuj podľa návodu (10 minút)
    echo 3. Vlož údaje do config.js
    echo 4. Spusti tento skript znova
    echo.
    pause
    exit /b 1
)

echo ✅ Všetko je nastavené správne
echo.
echo 🚀 Spúšťam Telegram bota...
echo.

:: Spusti TELEGRAM_AUTO_BOT
node TELEGRAM_AUTO_BOT.js

echo.
echo ═══════════════════════════════════════════════════════════════
echo.
pause

