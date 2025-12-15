@echo off
chcp 65001 >nul
color 0A
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║     🌐 OPEN DASHBOARD & CONSOLE NOW 🌐                     ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo Opening Vercel Dashboard to get your URLs...
echo.
start https://vercel.com/dashboard
timeout /t 3 >nul

echo.
echo ═══════════════════════════════════════════════════════════════
echo HOW TO FIND YOUR URLS:
echo ═══════════════════════════════════════════════════════════════
echo.
echo 1. In Vercel Dashboard, look for your projects
echo 2. Click on each project name
echo 3. Click the "Visit" button (or copy the URL)
echo.
echo Your projects might be named:
echo   - ai-studio
echo   - ai-studio-dashboard
echo   - p2ba-console
echo   - p2ba
echo.
echo ═══════════════════════════════════════════════════════════════
echo ENTER YOUR URLS BELOW:
echo ═══════════════════════════════════════════════════════════════
echo.
set /p DASHBOARD_URL="Enter Dashboard URL (or press Enter to skip): "
set /p CONSOLE_URL="Enter Console URL (or press Enter to skip): "

echo.
echo ═══════════════════════════════════════════════════════════════
echo Opening your projects...
echo ═══════════════════════════════════════════════════════════════
echo.

if not "%DASHBOARD_URL%"=="" (
    echo Opening Dashboard: %DASHBOARD_URL%
    start %DASHBOARD_URL%
    timeout /t 2 >nul
)

if not "%CONSOLE_URL%"=="" (
    echo Opening Console: %CONSOLE_URL%
    start %CONSOLE_URL%
    timeout /t 2 >nul
)

echo.
echo ✅ Projects opened!
echo.
echo 📋 QUICK TEST:
echo.
echo Dashboard:
echo   - Password: moneymachine25
echo   - Test AI Chat: Type "Hello"
echo.
echo Console:
echo   - Test command: "Create a test business"
echo.
pause
