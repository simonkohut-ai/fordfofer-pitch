@echo off
REM 🚀 Push to New Private GitHub Repo
REM Pre Golo - Automatický push do nového private repo

echo ========================================
echo 🚀 Push to New Private GitHub Repo
echo ========================================
echo.

echo 📋 KROK 1: Vytvor nový private repo na GitHub.com
echo    - Otvor: https://github.com/new
echo    - Názov: p2ba-chiaras-world (alebo akýkoľvek)
echo    - Visibility: PRIVATE
echo    - NEPRIDÁVAJ README/.gitignore/license
echo.
pause

echo.
echo 📋 KROK 2: Zadej GitHub URL nového repo
echo    Príklad: https://github.com/gcapovic/p2ba-chiaras-world.git
echo.
set /p REPO_URL="GitHub URL: "

if "%REO_URL%"=="" (
    echo ❌ URL nemôže byť prázdne!
    pause
    exit /b 1
)

echo.
echo 📦 Pridávam nový remote...
git remote add origin-new %REPO_URL%

if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Remote už existuje, mením URL...
    git remote set-url origin-new %REPO_URL%
)

echo.
echo 📤 Pushujem kód na GitHub...
git push -u origin-new main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Push zlyhal!
    echo.
    echo 💡 Možné riešenia:
    echo    1. Skontroluj GitHub URL
    echo    2. Použi Personal Access Token (nie heslo)
    echo    3. Vytvor token: https://github.com/settings/tokens
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✅ ÚSPECH!
echo ========================================
echo.
echo 📋 Ďalší krok: Vercel Deploy
echo    - Otvor: https://vercel.com/new
echo    - Import: %REPO_URL%
echo    - Root Directory: p2ba-console
echo.
pause

