@echo off
REM 🚀 Create Fresh Private GitHub Repo (No History)
REM Pre Golo - Vytvorí nový repo bez API kľúčov v histórii

echo ========================================
echo 🚀 Create Fresh Private GitHub Repo
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

if "%REPO_URL%"=="" (
    echo ❌ URL nemôže byť prázdne!
    pause
    exit /b 1
)

echo.
echo 🧹 Vytváram nový git repo bez histórie...
cd /d "%~dp0"

REM Vytvor dočasný adresár
set TEMP_DIR=%TEMP%\p2ba-fresh-repo
if exist "%TEMP_DIR%" rmdir /s /q "%TEMP_DIR%"
mkdir "%TEMP_DIR%"

REM Skopíruj všetky súbory (okrem .git)
echo 📦 Kopírujem súbory...
xcopy /E /I /Y /EXCLUDE:gitignore_exclude.txt . "%TEMP_DIR%\" >nul 2>&1

REM Vytvor .gitignore exclude list
echo .git > gitignore_exclude.txt
echo node_modules >> gitignore_exclude.txt
echo .next >> gitignore_exclude.txt
echo dist >> gitignore_exclude.txt
echo .env >> gitignore_exclude.txt
echo .vercel >> gitignore_exclude.txt

REM Skopíruj súbory (s .gitignore)
xcopy /E /I /Y /EXCLUDE:gitignore_exclude.txt . "%TEMP_DIR%\" >nul 2>&1
del gitignore_exclude.txt

cd "%TEMP_DIR%"

REM Inicializuj nový git repo
echo 🔨 Inicializujem nový git repo...
git init
git add .
git commit -m "Initial commit: P2BA Chiara's World - Complete system"

REM Pridaj remote a pushni
echo 📤 Pushujem na GitHub...
git remote add origin %REPO_URL%
git branch -M main
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Push zlyhal!
    echo.
    echo 💡 Možné riešenia:
    echo    1. Skontroluj GitHub URL
    echo    2. Použi Personal Access Token (nie heslo)
    echo    3. Vytvor token: https://github.com/settings/tokens
    echo    4. Scope: repo (full control)
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
echo 📁 Dočasný adresár: %TEMP_DIR%
echo    (Môžeš ho zmazať po úspešnom deploy)
echo.
pause

