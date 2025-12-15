@echo off
color 0E
title 🔍 CHECK OPENAI API KEY STATUS
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         🔍 CHECKING OPENAI API KEY STATUS                ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

if not exist ".env" (
    echo ❌ .env file not found!
    echo.
    echo Run SETUP_AGENT.bat first!
    echo.
    pause
    exit /b 1
)

echo Checking API key...
echo.

REM Read API key from .env
for /f "tokens=2 delims==" %%a in ('findstr "OPENAI_API_KEY" .env') do set API_KEY=%%a

if "%API_KEY%"=="" (
    echo ❌ API key not found in .env file!
    echo.
    pause
    exit /b 1
)

echo ✅ API Key found: %API_KEY:~0,20%...
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  TESTING API KEY...                                       ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

node -e "import('dotenv').then(dotenv => { dotenv.default.config(); import('axios').then(axios => axios.default.get('https://api.openai.com/v1/models', { headers: { 'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY } }).then(r => console.log('✅ API Key is VALID and has quota!')).catch(e => { if(e.response?.status === 401) console.log('❌ API Key is INVALID'); else if(e.response?.status === 429) console.log('❌ API Key has NO QUOTA - Add credits at: https://platform.openai.com/account/billing'); else console.log('❌ Error:', e.message); })); });"

echo.
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  NEXT STEPS                                               ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo If quota error:
echo   1. Go to: https://platform.openai.com/account/billing
echo   2. Add payment method
echo   3. Add credits ($10 minimum)
echo   4. Wait 2-3 minutes
echo   5. Run agent again
echo.
echo See FIX_QUOTA_ERROR.md for detailed guide
echo.
pause
