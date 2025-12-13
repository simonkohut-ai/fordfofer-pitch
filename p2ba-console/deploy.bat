@echo off
REM 🚀 P2BA Console - Deployment Script (Windows)
REM Automatizuje proces nasadenia na Vercel

echo 🚀 P2BA Console - Deployment Script
echo ====================================
echo.

REM Check if Vercel CLI is installed
where vercel >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Vercel CLI not found. Installing...
    npm install -g vercel
)

REM Check if logged in
vercel whoami >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Not logged in to Vercel. Please login...
    vercel login
)

echo ✅ Vercel CLI ready
echo.

REM Build p2ba-core first
echo 📦 Building p2ba-core...
cd ..\p2ba-core
call npm install
call npm run build
echo ✅ p2ba-core built
echo.

REM Return to p2ba-console
cd ..\p2ba-console

echo 📋 Environment Variables Checklist:
echo Make sure you have set these in Vercel:
echo   - EMAIL_PROVIDER
echo   - MAILGUN_API_KEY
echo   - MAILGUN_DOMAIN
echo   - OPENAI_API_KEY
echo   - BUFFER_ACCESS_TOKEN
echo   - BUFFER_INSTAGRAM_PROFILE_ID
echo   - BUFFER_TWITTER_PROFILE_ID
echo   - SHOPIFY_SHOP_NAME
echo   - SHOPIFY_ACCESS_TOKEN
echo   - ANTHROPIC_API_KEY
echo   - EMAIL_FROM
echo   - EMAIL_FROM_NAME
echo.

set /p confirm="Have you set all environment variables in Vercel? (y/n): "
if /i not "%confirm%"=="y" (
    echo ⚠️  Please set environment variables first:
    echo   1. Go to Vercel Dashboard
    echo   2. Select your project
    echo   3. Go to Settings → Environment Variables
    echo   4. Add all required variables
    echo.
    echo Or use: vercel env add VARIABLE_NAME production
    exit /b 1
)

REM Deploy to production
echo 🚀 Deploying to Vercel...
call vercel --prod

echo.
echo ✅ Deployment complete!
echo.
echo Next steps:
echo   1. Visit your Vercel URL
echo   2. Test the P2BA Console
echo   3. Run your first command!
echo.

pause

