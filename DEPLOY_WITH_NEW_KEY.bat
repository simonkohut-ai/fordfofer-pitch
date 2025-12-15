@echo off
chcp 65001 >nul
color 0A
title 🚀 DEPLOY WITH AI GATEWAY KEY
cls

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                                                               ║
echo ║         🚀 DEPLOY WITH AI GATEWAY KEY                       ║
echo ║                                                               ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

REM New AI Gateway Vercel Key
set VERCEL_TOKEN=REMOVED_VERCEL_TOKEN
set TEAM_ID=golos-projects-e144069f

echo ✅ Using AI Gateway Vercel Key
echo.

REM Check Vercel CLI
where vercel >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Vercel CLI not found. Installing...
    call npm install -g vercel
    if %errorlevel% neq 0 (
        echo ❌ Failed to install Vercel CLI
        pause
        exit /b 1
    )
)

echo ✅ Vercel CLI ready
echo.

echo ═══════════════════════════════════════════════════════════════
echo Deploying Dashboard...
echo ═══════════════════════════════════════════════════════════════
echo.

if exist "dashboard" (
    cd dashboard
    
    REM Remove old .vercel folder if exists
    if exist ".vercel" (
        rmdir /s /q ".vercel" 2>nul
    )
    
    echo Deploying ai-studio-dashboard...
    vercel --prod --token %VERCEL_TOKEN% --yes
    
    cd ..
    echo.
) else (
    echo ❌ Dashboard folder not found!
)

echo ═══════════════════════════════════════════════════════════════
echo Deploying Console...
echo ═══════════════════════════════════════════════════════════════
echo.

if exist "p2ba-console" (
    cd p2ba-console
    
    REM Remove old .vercel folder if exists
    if exist ".vercel" (
        rmdir /s /q ".vercel" 2>nul
    )
    
    echo Deploying p2ba-console...
    vercel --prod --token %VERCEL_TOKEN% --yes
    
    cd ..
    echo.
) else (
    echo ❌ p2ba-console folder not found!
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo Opening Vercel Dashboard...
echo ═══════════════════════════════════════════════════════════════
echo.

start https://vercel.com/dashboard

echo.
echo ✅ Deployment complete! Check Vercel Dashboard for URLs.
echo.
pause
