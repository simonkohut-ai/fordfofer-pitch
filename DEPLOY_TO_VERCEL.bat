@echo off
REM 🚀 Automatický Deploy na Vercel
REM Pre Golo - Kompletný deploy pipeline

echo ========================================
echo 🚀 Automatický Deploy na Vercel
echo ========================================
echo.

REM Krok 1: GitHub Repo
echo 📋 KROK 1: GitHub Private Repo
echo.
echo Máš už vytvorený private GitHub repo?
set /p HAS_REPO="(y/n): "

if /i "%HAS_REPO%"=="n" (
    echo.
    echo 📝 Vytvor repo teraz:
    echo    1. Otvor: https://github.com/new
    echo    2. Názov: p2ba-chiaras-world
    echo    3. Visibility: PRIVATE
    echo    4. NEPRIDÁVAJ README/.gitignore/license
    echo.
    pause
)

echo.
set /p GITHUB_URL="Zadej GitHub URL (napr. https://github.com/gcapovic/p2ba-chiaras-world.git): "

if "%GITHUB_URL%"=="" (
    echo ❌ GitHub URL je povinný!
    pause
    exit /b 1
)

REM Krok 2: Git Setup
echo.
echo 📦 KROK 2: Git Setup
cd /d "%~dp0"

REM Skontroluj, či už existuje remote
git remote get-url origin >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ⚠️  Remote 'origin' už existuje
    set /p CHANGE_REMOTE="Chceš zmeniť URL? (y/n): "
    if /i "!CHANGE_REMOTE!"=="y" (
        git remote set-url origin "%GITHUB_URL%"
    ) else (
        git remote add origin-new "%GITHUB_URL%"
        set PUSH_REMOTE=origin-new
    )
) else (
    git remote add origin "%GITHUB_URL%"
    set PUSH_REMOTE=origin
)

REM Push na GitHub
echo.
echo 📤 Pushujem na GitHub...
git add .
git commit -m "Deploy: P2BA Chiara's World - Complete system" 2>nul
git push -u %PUSH_REMOTE% main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Push zlyhal!
    echo.
    echo 💡 Riešenie:
    echo    1. Skontroluj GitHub URL
    echo    2. Použi Personal Access Token (nie heslo)
    echo    3. Vytvor token: https://github.com/settings/tokens
    echo    4. Scope: repo (full control)
    echo.
    pause
    exit /b 1
)

echo ✅ Kód pushnutý na GitHub
echo.

REM Krok 3: Vercel CLI Check
echo 📋 KROK 3: Vercel Deploy
echo.

where vercel >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Vercel CLI nie je nainštalované
    echo.
    set /p INSTALL_VERCEL="Chceš nainštalovať Vercel CLI? (y/n): "
    if /i "!INSTALL_VERCEL!"=="y" (
        echo 📦 Inštalujem Vercel CLI...
        call npm install -g vercel
        if %ERRORLEVEL% NEQ 0 (
            echo ❌ Inštalácia zlyhala!
            echo.
            echo 💡 Manuálne: npm install -g vercel
            pause
            exit /b 1
        )
    ) else (
        echo.
        echo 📝 Deploy cez Vercel Web UI:
        echo    1. Otvor: https://vercel.com/new
        echo    2. Import: %GITHUB_URL%
        echo    3. Root Directory: p2ba-console
        echo    4. Build Command: cd ../p2ba-core ^&^& npm install ^&^& npm run build ^&^& cd ../p2ba-console ^&^& npm install ^&^& npm run build
        echo    5. Pridaj Environment Variables (pozri DEPLOY_ENV_VARS.txt)
        echo.
        pause
        exit /b 0
    )
)

REM Vercel Login
echo 🔐 Vercel Login...
vercel login

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Vercel login zlyhal!
    pause
    exit /b 1
)

REM Vercel Link
echo.
echo 🔗 Linkujem projekt...
cd p2ba-console
vercel link

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Vercel link zlyhal!
    pause
    exit /b 1
)

REM Environment Variables
echo.
echo 📋 KROK 4: Environment Variables
echo.
echo Teraz pridaj Environment Variables do Vercel:
echo    - Otvor: https://vercel.com/dashboard
echo    - Vyber projekt
echo    - Settings → Environment Variables
echo    - Pridaj premenné z DEPLOY_ENV_VARS.txt
echo.
set /p ADD_ENV="Pridal si Environment Variables? (y/n): "

if /i "!ADD_ENV!"=="n" (
    echo.
    echo ⚠️  Pridaj Environment Variables pred deploy!
    echo    Pozri: DEPLOY_ENV_VARS.txt
    echo.
    pause
)

REM Deploy
echo.
echo 🚀 Deployujem na Vercel...
vercel --prod

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Deploy zlyhal!
    echo.
    echo 💡 Skontroluj:
    echo    1. Environment Variables sú pridané
    echo    2. p2ba-core je buildnutý
    echo    3. Vercel má prístup k GitHub repo
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✅ ÚSPECH!
echo ========================================
echo.
echo 🌐 Tvoj P2BA Console je online!
echo    URL: (pozri výstup vyššie)
echo.
echo 📋 Ďalšie kroky:
echo    1. Otestuj P2BA Console
echo    2. Pridaj všetky API kľúče do Environment Variables
echo    3. Spusti test príkaz v konzole
echo.
pause

