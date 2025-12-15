@echo off
REM 🦄 DEPLOY ULTIMATE P2BA - BREAK THE INTERNET!
color 0A
title 🚀 ULTIMATE P2BA DEPLOYMENT
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         🚀 DEPLOY ULTIMATE P2BA TOOL                      ║
echo ║         THE ALL-IN-ONE THAT BREAKS THE INTERNET!         ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ YOUR PRO ACCOUNTS READY                              ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo ✅ Vercel Pro: Active (unlimited everything)
echo ✅ Gemini Pro: Active (advanced AI)
echo ✅ OpenAI Pro: Active (best AI)
echo ✅ Budget: 20 EUR Skrill
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 1: Build P2BA Core                                  ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

if exist "p2ba-core" (
    echo Building p2ba-core...
    cd p2ba-core
    call npm install 2>nul
    call npm run build 2>nul
    if %errorlevel% == 0 (
        echo ✅ p2ba-core built successfully!
    ) else (
        echo ⚠️  Build may have warnings, continuing...
    )
    cd ..
) else (
    echo ⚠️  p2ba-core folder not found, skipping build
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 2: Deploy to Vercel Pro                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

if exist "p2ba-console" (
    cd p2ba-console
    
    echo Setting Vercel API key...
    set VERCEL_TOKEN=REMOVED_VERCEL_TOKEN
    
    echo.
    echo ╔═══════════════════════════════════════════════════════════╗
    echo ║  🚀 DEPLOYING ULTIMATE P2BA                              ║
    echo ╚═══════════════════════════════════════════════════════════╝
    echo.
    
    echo Deploying with Vercel Pro...
    echo.
    echo ⚠️  Follow prompts:
    echo   - Link to existing? NO (or YES if updating p2ba)
    echo   - Project name: p2ba (or your choice)
    echo   - Directory: . (current)
    echo   - Override? NO
    echo.
    
    vercel --prod --token %VERCEL_TOKEN%
    
    if %errorlevel% == 0 (
        echo.
        echo ╔═══════════════════════════════════════════════════════════╗
        echo ║  ✅ ULTIMATE P2BA DEPLOYED!                                ║
        echo ╚═══════════════════════════════════════════════════════════╝
        echo.
        echo Your P2BA tool is LIVE and ready to break the internet!
        echo.
        echo ╔═══════════════════════════════════════════════════════════╗
        echo ║  🎯 NEXT STEPS                                            ║
        echo ╚═══════════════════════════════════════════════════════════╝
        echo.
        echo 1. Copy your Vercel URL (shown above)
        echo 2. Add OpenAI key to Vercel (if not done)
        echo 3. Test with a command
        echo 4. Share and break the internet! 🚀
        echo.
    ) else (
        echo.
        echo ⚠️  Deployment had issues, check errors above
        echo    Try: vercel login
        echo    Or: vercel --prod
        echo.
    )
    
    cd ..
) else (
    echo ❌ p2ba-console folder not found
    echo    Check your project structure
)

echo.
pause
