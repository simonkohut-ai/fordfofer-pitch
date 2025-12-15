@echo off
REM 🦄 Automated Identity Replacement
color 0C
title 🔄 REPLACE ALL IDENTITY - Golo Čapo
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         🔄 REPLACE ALL IDENTITY - Golo Čapo               ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo ⚠️  This will help you replace identity in all files
echo.
echo Replacements:
echo    "Šimon Kohút" → "Golo Čapo"
echo    "Simon Kohut" → "Golo Čapo"
echo    "Goliáš Čapovič" → "Golo Čapo"
echo    "simonkohut21@gmail.com" → "gcapovic.biz@proton.me"
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  EASIEST METHOD: VS Code/Cursor                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 1. Open VS Code/Cursor in this folder
echo 2. Press Ctrl+Shift+F (Search in all files)
echo 3. Click "Replace" tab
echo 4. Find: "Šimon Kohút"
echo 5. Replace: "Golo Čapo"
echo 6. Click "Replace All"
echo.
echo This replaces in ALL files at once! (2 minutes)
echo.

echo Opening VS Code instructions...
timeout /t 2 /nobreak >nul

REM Try to open VS Code if available
where code >nul 2>&1
if %errorlevel% == 0 (
    echo Opening folder in VS Code...
    code .
    echo ✅ VS Code opened! Use Ctrl+Shift+F to replace all.
) else (
    echo VS Code not found. Opening folder instead...
    explorer .
    echo.
    echo Manual method:
    echo 1. Open files in any text editor
    echo 2. Use Find & Replace (Ctrl+H)
    echo 3. Replace one by one
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ALTERNATIVE: Manual File List                             ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

REM Create file list
echo Creating file list...
findstr /S /I /M "Šimon Kohút" *.* > files_to_replace.txt 2>nul
findstr /S /I /M "Simon Kohut" *.* >> files_to_replace.txt 2>nul
findstr /S /I /M "Goliáš Čapovič" *.* >> files_to_replace.txt 2>nul
findstr /S /I /M "simonkohut21@gmail.com" *.* >> files_to_replace.txt 2>nul

if exist "files_to_replace.txt" (
    echo ✅ Found files with real identity:
    type files_to_replace.txt | findstr /V "^$" | findstr /V "files_to_replace.txt"
    echo.
    echo Opening file list...
    start "" "files_to_replace.txt"
    echo.
    echo Replace identity in these files manually.
) else (
    echo ✅ No files found with real identity!
    echo    (Maybe already replaced?)
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ DONE!                                                   ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Use VS Code Find & Replace All for fastest method!
echo.
pause

del files_to_replace.txt 2>nul
