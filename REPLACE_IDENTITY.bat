@echo off
REM 🦄 Replace all real names with "Golo Čapo" pseudonym
color 0C
title 🔄 REPLACING IDENTITY - Golo Čapo
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         🔄 REPLACING IDENTITY - Golo Čapo                ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo ⚠️  This will replace all instances of:
echo    - "Šimon Kohút" → "Golo Čapo"
echo    - "Simon Kohut" → "Golo Čapo"
echo    - "Goliáš Čapovič" → "Golo Čapo"
echo    - "simonkohut21@gmail.com" → "gcapovic.biz@proton.me"
echo.

echo Searching for files...
echo.

REM Find all files with real name
findstr /S /I /M "Šimon Kohút" *.* > temp_files.txt 2>nul
findstr /S /I /M "Simon Kohut" *.* >> temp_files.txt 2>nul
findstr /S /I /M "Goliáš Čapovič" *.* >> temp_files.txt 2>nul
findstr /S /I /M "simonkohut21@gmail.com" *.* >> temp_files.txt 2>nul

echo Found files with real identity:
type temp_files.txt 2>nul | findstr /V "^$"
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ⚠️  MANUAL REPLACEMENT REQUIRED                          ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Due to file encoding (UTF-8), manual replacement is safer.
echo.
echo Use your code editor's Find & Replace:
echo   1. Open file
echo   2. Ctrl+H (Find & Replace)
echo   3. Find: "Šimon Kohút"
echo   4. Replace: "Golo Čapo"
echo   5. Replace All
echo.

echo Opening file list...
timeout /t 2 /nobreak >nul
if exist "temp_files.txt" (
    start "" "temp_files.txt"
)

echo.
echo See PLACEHOLDER_CHECKLIST.md for complete list
echo.
pause

del temp_files.txt 2>nul
