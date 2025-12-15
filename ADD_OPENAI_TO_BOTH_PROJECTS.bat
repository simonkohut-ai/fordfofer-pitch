@echo off
REM 🦄 Add OpenAI Key to Both Vercel Projects
color 0B
title 🔑 ADD OPENAI KEY TO VERCEL
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         🔑 ADD OPENAI KEY TO VERCEL                       ║
echo ║         Both Projects (Dashboard + p2ba)                  ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 1: Get Your OpenAI Key                              ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo Your OpenAI key is in Cursor Settings
echo.
echo To find it:
echo   1. Open Cursor Settings (Ctrl + ,)
echo   2. Search: "API key" or "OpenAI"
echo   3. Copy your key
echo.

pause

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 2: Open Vercel Dashboard                             ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo Opening Vercel Dashboard...
start https://vercel.com/dashboard
timeout /t 2 /nobreak >nul

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 3: Add Key to Dashboard Project                      ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo In Vercel Dashboard:
echo   1. Find project: ai-studio-dashboard
echo   2. Click project → Settings
echo   3. Click "Environment Variables"
echo   4. Click "Add New"
echo   5. Name: OPENAI_API_KEY
echo   6. Value: (paste your OpenAI key)
echo   7. Environments: Production, Preview, Development (all)
echo   8. Click "Save"
echo   9. Go to Deployments → ... → Redeploy
echo.

pause

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 4: Add Key to p2ba Project                          ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo In Vercel Dashboard:
echo   1. Find project: p2ba
echo   2. Click project → Settings
echo   3. Click "Environment Variables"
echo   4. Click "Add New"
echo   5. Name: OPENAI_API_KEY
echo   6. Value: (paste same OpenAI key)
echo   7. Environments: Production, Preview, Development (all)
echo   8. Click "Save"
echo   9. Go to Deployments → ... → Redeploy
echo.

pause

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ KEYS ADDED                                             ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo Next steps:
echo   1. Wait for redeployments to complete
echo   2. Test dashboard: Open your dashboard URL
echo   3. Password: moneymachine25
echo   4. Test AI Chat: Send a message
echo   5. Test p2ba: https://p2ba-navy.vercel.app
echo.

echo Opening dashboard test guide...
timeout /t 2 /nobreak >nul
if exist "DASHBOARD_DEPLOYED_NEXT.md" (
    start "" "DASHBOARD_DEPLOYED_NEXT.md"
)

echo.
pause
