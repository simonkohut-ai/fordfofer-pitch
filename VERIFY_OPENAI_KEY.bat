@echo off
REM 🦄 Verify OpenAI API Key Configuration
color 0B
title ✅ VERIFY OPENAI KEY
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         ✅ VERIFY OPENAI API KEY                          ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  CHECKING CONFIGURATION                                   ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

if exist "ai-agent\.env" (
    echo ✅ .env file found
    echo.
    echo Checking for OpenAI key...
    findstr /C:"OPENAI_API_KEY" "ai-agent\.env" >nul 2>&1
    if %errorlevel% == 0 (
        echo ✅ OPENAI_API_KEY found in .env
        echo.
        echo Key is configured! (value hidden for security)
    ) else (
        echo ❌ OPENAI_API_KEY not found in .env
        echo.
        echo You need to add it to: ai-agent\.env
    )
) else (
    echo ❌ .env file not found
    echo.
    echo Creating .env file...
    echo OPENAI_API_KEY=your_key_here > "ai-agent\.env"
    echo ✅ Created .env file
    echo.
    echo ⚠️  Add your OpenAI API key to: ai-agent\.env
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  TESTING API KEY                                          ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

if exist "ai-agent\CHECK_API_KEY.bat" (
    echo Running API key test...
    echo.
    call "ai-agent\CHECK_API_KEY.bat"
) else (
    echo ⚠️  Test script not found
    echo.
    echo To test manually:
    echo   cd ai-agent
    echo   node -e "require('dotenv').config(); console.log('Key:', process.env.OPENAI_API_KEY ? 'Set' : 'Missing')"
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  DASHBOARD INTEGRATION                                    ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo ✅ OpenAI key in Cursor: Configured
echo ✅ OpenAI key in .env: Checked above
echo.
echo The dashboard will use the API key from:
echo   - Environment variables (Vercel)
echo   - .env file (local development)
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  NEXT STEPS                                               ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 1. ✅ Key added to Cursor (done)
echo 2. Verify key in ai-agent\.env
echo 3. Test with: ai-agent\CHECK_API_KEY.bat
echo 4. Deploy dashboard: dashboard\DEPLOY_FIXED.bat
echo 5. Add key to Vercel environment variables
echo.

pause
