@echo off
chcp 65001 >nul
color 0A
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║     🚀 P2BA DEPLOYMENT CHECK - YES/NO QUESTIONS 🚀         ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo You deployed p2ba as "ai-studio" on Vercel.
echo Let's check what needs to be configured!
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════════
echo QUESTION 1: OpenAI API Key
echo ═══════════════════════════════════════════════════════════════
echo.
set /p OPENAI_NEEDED="Did you add OPENAI_API_KEY to Vercel environment variables? (YES/NO): "
if /i "%OPENAI_NEEDED%"=="NO" (
    echo ⚠️ You need to add OPENAI_API_KEY in Vercel Settings → Environment Variables
    set NEEDS_OPENAI=YES
) else (
    echo ✅ OpenAI key is configured
    set NEEDS_OPENAI=NO
)
echo.

echo.
echo ═══════════════════════════════════════════════════════════════
echo QUESTION 2: Payment Methods
echo ═══════════════════════════════════════════════════════════════
echo.
set /p PAYMENT_NEEDED="Do you want to add payment methods (BTC, ETH, PayPal, etc.)? (YES/NO): "
if /i "%PAYMENT_NEEDED%"=="YES" (
    set NEEDS_PAYMENTS=YES
    echo ✅ Will configure payment methods
) else (
    set NEEDS_PAYMENTS=NO
    echo ✅ Skipping payment configuration
)
echo.

echo.
echo ═══════════════════════════════════════════════════════════════
echo QUESTION 3: Identity Update
echo ═══════════════════════════════════════════════════════════════
echo.
set /p IDENTITY_NEEDED="Do you want to update identity to 'Golo Čapo' everywhere? (YES/NO): "
if /i "%IDENTITY_NEEDED%"=="YES" (
    set NEEDS_IDENTITY=YES
    echo ✅ Will update identity to Golo Čapo
) else (
    set NEEDS_IDENTITY=NO
    echo ✅ Keeping current identity
)
echo.

echo.
echo ═══════════════════════════════════════════════════════════════
echo QUESTION 4: Environment Variables
echo ═══════════════════════════════════════════════════════════════
echo.
set /p ENV_NEEDED="Do you want to add other environment variables (EMAIL, BUFFER, etc.)? (YES/NO): "
if /i "%ENV_NEEDED%"=="YES" (
    set NEEDS_ENV=YES
    echo ✅ Will configure additional environment variables
) else (
    set NEEDS_ENV=NO
    echo ✅ Using basic configuration
)
echo.

echo.
echo ═══════════════════════════════════════════════════════════════
echo QUESTION 5: Root Directory
echo ═══════════════════════════════════════════════════════════════
echo.
set /p ROOT_DIR="Did you set Root Directory to 'p2ba-console' in Vercel? (YES/NO): "
if /i "%ROOT_DIR%"=="NO" (
    echo ⚠️ You need to set Root Directory to 'p2ba-console' in Vercel project settings
    set NEEDS_ROOT_DIR=YES
) else (
    echo ✅ Root Directory is configured
    set NEEDS_ROOT_DIR=NO
)
echo.

echo.
echo ═══════════════════════════════════════════════════════════════
echo SUMMARY
echo ═══════════════════════════════════════════════════════════════
echo.
echo Your answers:
echo   OpenAI Key: %OPENAI_NEEDED%
echo   Payment Methods: %PAYMENT_NEEDED%
echo   Identity Update: %IDENTITY_NEEDED%
echo   Environment Variables: %ENV_NEEDED%
echo   Root Directory: %ROOT_DIR%
echo.

if "%NEEDS_OPENAI%"=="YES" (
    echo ⚠️ ACTION NEEDED: Add OPENAI_API_KEY to Vercel
)
if "%NEEDS_ROOT_DIR%"=="YES" (
    echo ⚠️ ACTION NEEDED: Set Root Directory to 'p2ba-console' in Vercel
)
if "%NEEDS_PAYMENTS%"=="YES" (
    echo 📋 Will configure payment methods
)
if "%NEEDS_IDENTITY%"=="YES" (
    echo 📋 Will update identity to Golo Čapo
)
if "%NEEDS_ENV%"=="YES" (
    echo 📋 Will configure environment variables
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo Creating action plan...
echo ═══════════════════════════════════════════════════════════════
echo.

REM Create summary file
(
    echo # P2BA Deployment Action Plan
    echo.
    echo Generated: %date% %time%
    echo.
    echo ## Your Answers:
    echo - OpenAI Key: %OPENAI_NEEDED%
    echo - Payment Methods: %PAYMENT_NEEDED%
    echo - Identity Update: %IDENTITY_NEEDED%
    echo - Environment Variables: %ENV_NEEDED%
    echo - Root Directory: %ROOT_DIR%
    echo.
    echo ## Actions Needed:
) > "P2BA_DEPLOY_ACTIONS.md"

if "%NEEDS_OPENAI%"=="YES" (
    echo - [ ] Add OPENAI_API_KEY to Vercel Environment Variables >> "P2BA_DEPLOY_ACTIONS.md"
)
if "%NEEDS_ROOT_DIR%"=="YES" (
    echo - [ ] Set Root Directory to 'p2ba-console' in Vercel Project Settings >> "P2BA_DEPLOY_ACTIONS.md"
)
if "%NEEDS_PAYMENTS%"=="YES" (
    echo - [ ] Configure payment methods (run FILL_PAYMENTS_NOW.bat) >> "P2BA_DEPLOY_ACTIONS.md"
)
if "%NEEDS_IDENTITY%"=="YES" (
    echo - [ ] Update identity to Golo Čapo (run REPLACE_IDENTITY.bat) >> "P2BA_DEPLOY_ACTIONS.md"
)
if "%NEEDS_ENV%"=="YES" (
    echo - [ ] Add additional environment variables to Vercel >> "P2BA_DEPLOY_ACTIONS.md"
)

echo ✅ Action plan saved to: P2BA_DEPLOY_ACTIONS.md
echo.
start "" "P2BA_DEPLOY_ACTIONS.md"
echo.
pause
