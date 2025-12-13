@echo off
REM 🚀 P2BA Local Test - Quick Start
REM Pre Golo - Lokálne testovanie aplikácie

echo ========================================
echo 🚀 P2BA Local Test - Quick Start
echo ========================================
echo.

REM Step 1: Build P2BA Core
echo 📦 Step 1: Building P2BA Core...
cd p2ba-core
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm install failed
    pause
    exit /b 1
)

call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)
echo ✅ P2BA Core built successfully
echo.

REM Step 2: Start Console
echo 🖥️  Step 2: Starting P2BA Console...
cd ..\p2ba-console
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm install failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✅ READY!
echo ========================================
echo.
echo 🌐 Opening http://localhost:3000
echo.
echo 📋 Test Command:
echo    Create a test dropshipping store for eco-friendly products
echo.
echo Press Ctrl+C to stop
echo.

start http://localhost:3000
call npm run dev

pause

