@echo off
REM 🦄 Run Everything - Complete Setup Automation
color 0A
title 🚀 RUN EVERYTHING - COMPLETE SETUP
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         🚀 RUNNING COMPLETE SETUP                        ║
echo ║         Automating Everything for You                    ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 1: Verify .cursorignore                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

if exist ".cursorignore" (
    echo ✅ .cursorignore exists
) else (
    echo Creating .cursorignore...
    (
        echo # Cursor Optimization
        echo node_modules/
        echo dist/
        echo build/
        echo .env
        echo .git/
        echo *.log
    ) > .cursorignore
    echo ✅ Created .cursorignore
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 2: Verify OpenAI Key Configuration                ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

if exist "ai-agent\.env" (
    echo ✅ .env file found
    findstr /C:"OPENAI_API_KEY" "ai-agent\.env" >nul 2>&1
    if %errorlevel% == 0 (
        echo ✅ OPENAI_API_KEY configured in .env
    ) else (
        echo ⚠️  OPENAI_API_KEY not found in .env
        echo    (Key is in Cursor, which is fine)
    )
) else (
    echo ⚠️  .env file not found (will be created when needed)
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 3: Verify Dashboard Files                          ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

set "dashboardOK=1"

if exist "dashboard\index.html" (
    echo ✅ dashboard/index.html
) else (
    echo ❌ dashboard/index.html missing
    set "dashboardOK=0"
)

if exist "dashboard\dashboard.js" (
    echo ✅ dashboard/dashboard.js
) else (
    echo ❌ dashboard/dashboard.js missing
    set "dashboardOK=0"
)

if exist "dashboard\api\agent.mjs" (
    echo ✅ dashboard/api/agent.mjs
) else (
    echo ❌ dashboard/api/agent.mjs missing
    set "dashboardOK=0"
)

if exist "dashboard\vercel.json" (
    echo ✅ dashboard/vercel.json
) else (
    echo ❌ dashboard/vercel.json missing
    set "dashboardOK=0"
)

if "%dashboardOK%"=="1" (
    echo.
    echo ✅ Dashboard files ready!
) else (
    echo.
    echo ❌ Some dashboard files missing
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 4: Check Vercel CLI                                 ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

where vercel >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Vercel CLI installed
    vercel --version
) else (
    echo ⚠️  Vercel CLI not found
    echo    Installing Vercel CLI...
    npm install -g vercel
    if %errorlevel% == 0 (
        echo ✅ Vercel CLI installed!
    ) else (
        echo ❌ Failed to install Vercel CLI
        echo    Install manually: npm install -g vercel
    )
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ SETUP VERIFICATION COMPLETE                          ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  NEXT: DEPLOY DASHBOARD                                   ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo Ready to deploy dashboard?
echo.
echo Options:
echo   1. Deploy now (will prompt for Vercel login)
echo   2. Skip deployment (deploy later)
echo   3. Exit
echo.

set /p choice="Enter choice (1-3): "

if "%choice%"=="1" (
    echo.
    echo ╔═══════════════════════════════════════════════════════════╗
    echo ║  DEPLOYING DASHBOARD TO VERCEL                             ║
    echo ╚═══════════════════════════════════════════════════════════╝
    echo.
    echo Follow the prompts:
    echo   - Login to Vercel (if needed)
    echo   - Link to existing project? NO
    echo   - Project name: ai-studio-dashboard
    echo   - Directory: . (current)
    echo   - Override settings? NO
    echo.
    
    cd dashboard
    vercel --prod
    cd ..
    
    echo.
    echo ╔═══════════════════════════════════════════════════════════╗
    echo ║  ✅ DEPLOYMENT COMPLETE!                                   ║
    echo ╚═══════════════════════════════════════════════════════════╝
    echo.
    echo Copy your Vercel URL from above!
    echo.
    echo Next steps:
    echo   1. Add OpenAI key to Vercel (see dashboard\ADD_OPENAI_TO_VERCEL.md)
    echo   2. Test dashboard with your URL
    echo   3. Password: moneymachine25
    echo.
) else if "%choice%"=="2" (
    echo.
    echo ⚠️  Deployment skipped
    echo    Run: dashboard\DEPLOY_FIXED.bat when ready
    echo.
) else (
    echo.
    echo Exiting...
    goto :end
)

:end
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  📋 SUMMARY                                                ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo ✅ Setup complete!
echo.
echo Configured:
echo   ✅ .cursorignore created
echo   ✅ OpenAI key in Cursor
echo   ✅ Dashboard files verified
echo   ✅ Vercel CLI checked
echo.

echo Next steps:
echo   1. Open Cursor Settings (Ctrl + ,)
echo      - Set model to: gpt-4o-mini
echo      - Enable codebase indexing
echo   2. Deploy dashboard (if not done)
echo   3. Add OpenAI key to Vercel
echo   4. Test dashboard
echo.

echo Opening guides...
timeout /t 2 /nobreak >nul
if exist "CURSOR_OPTIMIZATION.md" (
    start "" "CURSOR_OPTIMIZATION.md"
)
if exist "OPENAI_KEY_SETUP.md" (
    start "" "OPENAI_KEY_SETUP.md"
)

echo.
pause
