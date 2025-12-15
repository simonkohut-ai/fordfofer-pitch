@echo off
color 0A
title ⚡ AI STUDIO - START LOCAL SERVER
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         ⚡ AI STUDIO - START LOCAL SERVER                ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0\dashboard"

echo Checking for Node.js or Python...
echo.

REM Check for Node.js first
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Node.js found!
    echo.
    echo Starting local server...
    echo Dashboard will open at: http://localhost:3000
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    timeout /t 2 /nobreak >nul
    start http://localhost:3000
    node server.js
    goto :end
)

REM Check for Python
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Python found!
    echo.
    echo Starting local server...
    echo Dashboard will open automatically at: http://localhost:3000
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    timeout /t 2 /nobreak >nul
    python server.py
    goto :end
)

REM Check for Python 3
python3 --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Python 3 found!
    echo.
    echo Starting local server...
    echo Dashboard will open automatically at: http://localhost:3000
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    timeout /t 2 /nobreak >nul
    python3 server.py
    goto :end
)

echo ❌ Node.js or Python not found!
echo.
echo Please install one:
echo   • Node.js: https://nodejs.org (Recommended)
echo   • Python: https://python.org
echo.
echo Or use OPEN_DASHBOARD.bat for simple HTML version
echo.
pause
exit /b 1

:end
pause
