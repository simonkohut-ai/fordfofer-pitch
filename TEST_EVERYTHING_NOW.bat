@echo off
chcp 65001 >nul
color 0A
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║     🧪 TEST DASHBOARD & CONSOLE - HEALTH CHECK 🧪          ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo This will help you test your deployed projects!
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════════
echo Step 1: Getting your Vercel project URLs...
echo ═══════════════════════════════════════════════════════════════
echo.
echo Go to Vercel Dashboard and copy your project URLs.
echo.
set /p DASHBOARD_URL="Enter Dashboard URL (or press Enter to skip): "
set /p CONSOLE_URL="Enter p2ba-console URL (or press Enter to skip): "

echo.
echo ═══════════════════════════════════════════════════════════════
echo Step 2: Opening URLs for testing...
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
echo ═══════════════════════════════════════════════════════════════
echo Step 3: Opening Vercel Dashboard...
echo ═══════════════════════════════════════════════════════════════
echo.
start https://vercel.com/dashboard

echo.
echo ═══════════════════════════════════════════════════════════════
echo Step 4: Opening testing guide...
echo ═══════════════════════════════════════════════════════════════
echo.
start "" "%~dp0HEALTH_CHECK_COMPLETE.md"

echo.
echo ✅ Testing environment ready!
echo.
echo 📋 TEST CHECKLIST:
echo.
echo DASHBOARD:
echo   [ ] URL loads
echo   [ ] Password prompt appears (password: moneymachine25)
echo   [ ] Can log in
echo   [ ] AI chat works (test: "Hello")
echo   [ ] Dashboard stats display
echo.
echo CONSOLE:
echo   [ ] URL loads
echo   [ ] Chat interface appears
echo   [ ] Can type commands
echo   [ ] Commands execute
echo.
pause
