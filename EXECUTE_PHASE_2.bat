@echo off
color 0B
title PHASE 2 - LINK & LAUNCH
cls

echo.
echo ========================================
echo    🚀 PHASE 2 - LINK & LAUNCH
echo ========================================
echo.
echo Opening required tabs...
echo.

REM Open n8n
echo [1/3] Opening n8n...
start https://app.n8n.cloud
timeout /t 2 /nobreak >nul

REM Open Whop
echo [2/3] Opening Whop...
start https://whop.com
timeout /t 2 /nobreak >nul

REM Open Telegram
echo [3/3] Opening Telegram web...
start https://web.telegram.org
timeout /t 2 /nobreak >nul

cls
echo.
echo ========================================
echo    ✅ TABS OPENED!
echo ========================================
echo.
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 1: LINK WHOP TO N8N (5 min)                         ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo In n8n tab:
echo   1. Import Whop workflow:
echo      - Click "Add workflow" → "Import from File"
echo      - Select: whop-integration/Whop_n8n_Workflow.json
echo   2. Add credentials (same as Telegram):
echo      - Telegram: REMOVED_TELEGRAM_TOKEN
echo      - OpenAI: Your API key
echo      - Gmail: Your app password
echo   3. Activate workflow (green toggle)
echo   4. Click "Whop Webhook" node
echo   5. Copy the webhook URL
echo      (Looks like: https://yourname.app.n8n.cloud/webhook/whop-payment)
echo.
echo In Whop tab:
echo   6. Settings → Developers → Webhooks
echo   7. Create Webhook:
echo      - URL: [Paste webhook URL from n8n]
echo      - Events: payment.succeeded, subscription.created
echo      - Authentication: API Key
echo      - API Key: REMOVED_WHOP_KEY
echo   8. Save webhook
echo.
pause

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 2: TEST EVERYTHING (5 min)                          ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Test 1: Telegram Bot
echo   - In Telegram: Send /create test influencer, 25, fitness
echo   - Should get: Confirmation message
echo   - Wait 3-5 min: Check email for influencer details
echo   - ✅ If works → Move to Test 2
echo.
echo Test 2: Whop Purchase (Test Mode)
echo   - In Whop: Enable test mode
echo   - Buy your own product
echo   - Use test card: 4242 4242 4242 4242
echo   - Should trigger n8n workflow
echo   - Should generate influencer automatically
echo   - Should send email
echo   - ✅ If works → GO LIVE!
echo.
pause

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 3: GO LIVE & GET SALES (30 min)                     ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo In Whop:
echo   - Disable test mode
echo   - Make product public
echo   - Copy your store URL
echo.
echo Marketing Push:
echo   1. Message 10 friends (use QUICK_SALES_SCRIPT.md)
echo   2. Post on Reddit (use QUICK_SALES_SCRIPT.md)
echo   3. Post on Twitter (use QUICK_SALES_SCRIPT.md)
echo   4. Share everywhere!
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  EXPECTED RESULTS:                                         ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Today: 3-5 sales = $225-375
echo This Week: 10-20 sales = $750-1,500
echo This Month: 50-100 sales = $3,750-7,500
echo.
pause

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  QUICK REFERENCE:                                          ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Files to use:
echo   - QUICK_SALES_SCRIPT.md (copy & paste messages)
echo   - DO_THIS_NOW.md (detailed steps)
echo   - STATUS_AND_NEXT_STEPS.md (track progress)
echo.
echo.
echo ========================================
echo    💰 YOU'RE READY TO MAKE MONEY!
echo ========================================
echo.
echo Everything is set up. Just execute and sales will flow!
echo.
echo Press any key to open reference files...
pause >nul

REM Open reference files
cd /d "%~dp0"
start "" "QUICK_SALES_SCRIPT.md"
timeout /t 1 /nobreak >nul
start "" "DO_THIS_NOW.md"

echo.
echo Reference files opened!
echo.
echo GO GET THOSE SALES! 💰🚀
echo.
pause

