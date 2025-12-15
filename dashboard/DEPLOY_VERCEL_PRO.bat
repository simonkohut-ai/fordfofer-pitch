@echo off
REM 🦄 Deploy Dashboard with Vercel Pro
color 0A
title 🚀 DEPLOY WITH VERCEL PRO
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         🚀 DEPLOY DASHBOARD - VERCEL PRO                  ║
echo ║         Account: simonkohut21-4119                        ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo ✅ Vercel Pro Account Active
echo    Account: simonkohut21-4119
echo    Plan: Pro ($20/month)
echo    Benefits: Unlimited bandwidth, functions, analytics
echo.

pause

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 1: Verify Vercel Login                               ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

vercel whoami 2>nul
if %errorlevel% == 0 (
    echo ✅ Logged in to Vercel
    vercel whoami
) else (
    echo ⚠️  Not logged in
    echo    Logging in...
    vercel login
)

echo.
pause

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 2: Deploy to Vercel Pro                              ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo Deploying dashboard with Vercel Pro...
echo.
echo ⚠️  Follow prompts:
echo   1. Link to existing project? NO (create new)
echo   2. Project name: ai-studio-dashboard
echo   3. Directory: . (current)
echo   4. Override settings? NO
echo.

vercel --prod

if %errorlevel% == 0 (
    echo.
    echo ╔═══════════════════════════════════════════════════════════╗
    echo ║  ✅ DEPLOYMENT SUCCESSFUL!                                 ║
    echo ╚═══════════════════════════════════════════════════════════╝
    echo.
    echo Your dashboard is live on Vercel Pro!
    echo.
    echo ╔═══════════════════════════════════════════════════════════╗
    echo ║  NEXT STEPS                                               ║
    echo ╚═══════════════════════════════════════════════════════════╝
    echo.
    echo 1. Copy your Vercel URL (shown above)
    echo 2. Go to: https://vercel.com/dashboard
    echo 3. Settings → Environment Variables
    echo 4. Add: OPENAI_API_KEY = your key
    echo 5. Redeploy (Deployments → ... → Redeploy)
    echo.
    echo ╔═══════════════════════════════════════════════════════════╗
    echo ║  VERCEL PRO FEATURES                                      ║
    echo ╚═══════════════════════════════════════════════════════════╝
    echo.
    echo ✅ Unlimited bandwidth
    echo ✅ Unlimited serverless functions
    echo ✅ Advanced analytics
    echo ✅ Password protection (built-in)
    echo ✅ Custom domains
    echo ✅ Priority support
    echo.
) else (
    echo.
    echo ╔═══════════════════════════════════════════════════════════╗
    echo ║  ❌ DEPLOYMENT ERROR                                       ║
    echo ╚═══════════════════════════════════════════════════════════╝
    echo.
    echo Check error above and try:
    echo   1. Make sure you're logged in: vercel login
    echo   2. Check account: vercel whoami
    echo   3. Try again: vercel --prod
    echo.
)

echo.
pause
