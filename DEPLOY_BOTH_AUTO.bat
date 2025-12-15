@echo off
chcp 65001 >nul
color 0A
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║     🚀 AUTO DEPLOY DASHBOARD + P2BA-CONSOLE 🚀             ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo This will deploy BOTH projects automatically!
echo.
pause

cd /d "%~dp0"

echo.
echo ═══════════════════════════════════════════════════════════════
echo Step 1: Checking Vercel CLI...
echo ═══════════════════════════════════════════════════════════════
echo.

where vercel >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Installing Vercel CLI...
    call npm install -g vercel
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Failed to install Vercel CLI
        echo Please install manually: npm install -g vercel
        pause
        exit /b 1
    )
) else (
    echo ✅ Vercel CLI found
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo Step 2: Setting Vercel API Key...
echo ═══════════════════════════════════════════════════════════════
echo.

set VERCEL_TOKEN=REMOVED_VERCEL_TOKEN
setx VERCEL_TOKEN %VERCEL_TOKEN% >nul 2>&1
echo ✅ Vercel API key set

echo.
echo ═══════════════════════════════════════════════════════════════
echo Step 3: Deploying Dashboard...
echo ═══════════════════════════════════════════════════════════════
echo.

cd dashboard
if not exist "vercel.json" (
    echo Creating vercel.json for dashboard...
    (
        echo {
        echo   "version": 2,
        echo   "routes": [
        echo     {
        echo       "src": "/api/agent",
        echo       "dest": "/api/agent.mjs"
        echo     },
        echo     {
        echo       "src": "/(.*)",
        echo       "dest": "/$1"
        echo     }
        echo   ]
        echo }
    ) > vercel.json
)

echo Deploying dashboard...
vercel --prod --token %VERCEL_TOKEN% --yes --name ai-studio-dashboard
if %ERRORLEVEL% EQU 0 (
    echo ✅ Dashboard deployed!
) else (
    echo ⚠️ Dashboard deployment had issues, but continuing...
)
cd ..

echo.
echo ═══════════════════════════════════════════════════════════════
echo Step 4: Deploying p2ba-console...
echo ═══════════════════════════════════════════════════════════════
echo.

cd p2ba-console
echo Deploying p2ba-console...
vercel --prod --token %VERCEL_TOKEN% --yes --name p2ba-console
if %ERRORLEVEL% EQU 0 (
    echo ✅ p2ba-console deployed!
) else (
    echo ⚠️ p2ba-console deployment had issues
)
cd ..

echo.
echo ═══════════════════════════════════════════════════════════════
echo Step 5: Adding Environment Variables...
echo ═══════════════════════════════════════════════════════════════
echo.

echo Adding OPENAI_API_KEY to ai-studio-dashboard...
vercel env add OPENAI_API_KEY production --token %VERCEL_TOKEN% --scope golos-projects-e144069f
echo.
echo Adding OPENAI_API_KEY to p2ba-console...
vercel env add OPENAI_API_KEY production --token %VERCEL_TOKEN% --scope golos-projects-e144069f

echo.
echo ═══════════════════════════════════════════════════════════════
echo ✅ DEPLOYMENT COMPLETE!
echo ═══════════════════════════════════════════════════════════════
echo.
echo 📋 Next Steps:
echo    1. Go to Vercel Dashboard
echo    2. Check both projects are deployed
echo    3. Add OPENAI_API_KEY manually if needed:
echo       - ai-studio-dashboard → Settings → Environment Variables
echo       - p2ba-console → Settings → Environment Variables
echo    4. Redeploy both projects after adding keys
echo.
pause
