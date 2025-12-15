@echo off
REM 🦄 Deploy Dashboard with Vercel API Key
color 0A
title 🚀 DEPLOY WITH API KEY
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         🚀 DEPLOY DASHBOARD - WITH API KEY                ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 1: Set Vercel API Key                               ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

set VERCEL_TOKEN=REMOVED_VERCEL_TOKEN
echo ✅ Vercel API key set

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 2: Verify Authentication                             ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

vercel whoami
if %errorlevel% == 0 (
    echo ✅ Authenticated with Vercel
) else (
    echo ⚠️  Not authenticated, logging in...
    vercel login --token %VERCEL_TOKEN%
)

echo.
pause

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 3: Deploy Dashboard                                  ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo Deploying dashboard to Vercel Pro...
echo.
echo ⚠️  Follow prompts:
echo   1. Link to existing project? NO (create new)
echo   2. Project name: ai-studio-dashboard
echo   3. Directory: . (current)
echo   4. Override settings? NO
echo.

vercel --prod --token %VERCEL_TOKEN%

if %errorlevel% == 0 (
    echo.
    echo ╔═══════════════════════════════════════════════════════════╗
    echo ║  ✅ DEPLOYMENT SUCCESSFUL!                                 ║
    echo ╚═══════════════════════════════════════════════════════════╝
    echo.
    echo Your dashboard is live!
    echo.
    echo ╔═══════════════════════════════════════════════════════════╗
    echo ║  NEXT STEPS                                               ║
    echo ╚═══════════════════════════════════════════════════════════╝
    echo.
    echo 1. Copy your Vercel URL (shown above)
    echo 2. Go to: https://vercel.com/dashboard
    echo 3. Settings → Environment Variables
    echo 4. Add: OPENAI_API_KEY = your OpenAI key
    echo 5. Redeploy
    echo.
) else (
    echo.
    echo ╔═══════════════════════════════════════════════════════════╗
    echo ║  ❌ DEPLOYMENT ERROR                                       ║
    echo ╚═══════════════════════════════════════════════════════════╝
    echo.
    echo Check error above
    echo Try: vercel login
    echo.
)

echo.
pause
