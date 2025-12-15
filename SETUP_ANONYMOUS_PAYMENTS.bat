@echo off
color 0C
title 💰 SETUP ANONYMOUS PAYMENTS - GET MONEY NOW
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║    💰 SETUP ANONYMOUS PAYMENTS - GET MONEY NOW           ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo This will guide you through setting up anonymous payments
echo and getting money to Stripe/Skrill TODAY!
echo.
echo Press any key to start...
pause >nul

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  PHASE 1: STRIPE SETUP (15 min)                           ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Opening Stripe Dashboard...
echo.

REM Open Stripe
start https://dashboard.stripe.com
timeout /t 2 /nobreak >nul

REM Open guide
cd /d "%~dp0"
start "" "ANONYMOUS_PAYMENT_PLAN.md"
timeout /t 2 /nobreak >nul

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STRIPE BUSINESS SETUP                                    ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo In Stripe Dashboard:
echo.
echo 1. Go to: Settings → Business Settings
echo.
echo 2. Business Name (USE ANONYMOUS):
echo    ✅ "AI Studio Solutions"
echo    ✅ "Digital Content Services"
echo    ✅ "Tech Services LLC"
echo    ❌ NOT your personal name!
echo.
echo 3. Business Type:
echo    ✅ "Sole Proprietorship" or "Individual"
echo.
echo 4. Industry:
echo    ✅ "Software/Technology Services"
echo.
echo 5. Statement Descriptor (what customers see):
echo    ✅ "AI INFLUENCER"
echo    ✅ "DIGITAL SERVICES"
echo    ❌ NOT your name!
echo.
echo 6. Website:
echo    ✅ Your Whop store URL
echo    ✅ Or: https://your-whop-store.whop.com
echo.
echo Press any key when done...
pause >nul

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  CREATE STRIPE PAYMENT LINKS (10 min)                     ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo In Stripe Dashboard:
echo.
echo 1. Go to: Products → Payment Links
echo.
echo 2. Click "Create payment link"
echo.
echo 3. Create 3 links:
echo.
echo    Link 1: Launch Special
echo    - Name: "AI Influencer - Launch Special"
echo    - Price: $75
echo    - Description: "Complete AI influencer profile package"
echo    - Copy the link!
echo.
echo    Link 2: Regular Price
echo    - Name: "AI Influencer - Complete Package"
echo    - Price: $150
echo    - Description: "Complete AI influencer profile package"
echo    - Copy the link!
echo.
echo    Link 3: Agency Pack
echo    - Name: "AI Influencer - Agency Pack (3 profiles)"
echo    - Price: $400
echo    - Description: "3 complete AI influencer profiles"
echo    - Copy the link!
echo.
echo 4. Save all 3 links somewhere safe!
echo.
echo Press any key when done...
pause >nul

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  PHASE 2: WHOP SETUP (10 min)                             ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Opening Whop Dashboard...
echo.

REM Open Whop
start https://whop.com
timeout /t 2 /nobreak >nul

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  CONNECT STRIPE TO WHOP                                   ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo In Whop Dashboard:
echo.
echo 1. Go to: Settings → Payments
echo.
echo 2. Click "Connect Stripe"
echo.
echo 3. Authorize Stripe connection
echo.
echo 4. Enable Stripe payments
echo.
echo Press any key when done...
pause >nul

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  CREATE WHOP PRODUCTS                                     ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo In Whop Dashboard:
echo.
echo 1. Go to: Products → Create Product
echo.
echo 2. Product 1: Launch Special
echo    - Name: "AI Influencer - Launch Special"
echo    - Price: $75
echo    - Description: "Complete AI influencer profile in 3 minutes"
echo    - Type: Digital Product
echo    - Payment: Stripe
echo    - Make Public: YES
echo    - Copy product link!
echo.
echo 3. Product 2: Regular Price
echo    - Name: "AI Influencer - Complete Package"
echo    - Price: $150
echo    - Description: "Complete AI influencer profile package"
echo    - Type: Digital Product
echo    - Payment: Stripe
echo    - Make Public: YES
echo    - Copy product link!
echo.
echo 4. Product 3: Agency Pack
echo    - Name: "AI Influencer - Agency Pack"
echo    - Price: $400
echo    - Description: "3 complete AI influencer profiles"
echo    - Type: Digital Product
echo    - Payment: Stripe
echo    - Make Public: YES
echo    - Copy product link!
echo.
echo Press any key when done...
pause >nul

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  PHASE 3: SKRILL SETUP (Optional - 10 min)                ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Do you want to set up Skrill too? (Y/N)
echo.
set /p skrill="Enter Y or N: "

if /i "%skrill%"=="Y" (
    echo.
    echo Opening Skrill...
    start https://www.skrill.com
    timeout /t 2 /nobreak >nul
    
    echo.
    echo In Skrill:
    echo 1. Create Business Account
    echo 2. Use business email (not personal)
    echo 3. Use business name (same as Stripe)
    echo 4. Verify account
    echo 5. Set up merchant account
    echo.
    echo Press any key when done...
    pause >nul
)

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  PHASE 4: START SELLING (15 min)                          ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Opening all platforms to start selling...
echo.

REM Open Telegram
echo [1/4] Opening Telegram...
start https://web.telegram.org
timeout /t 1 /nobreak >nul

REM Open sales messages
echo [2/4] Opening sales messages...
start "" "OPTIMIZED_SALES_MESSAGES.md"
timeout /t 1 /nobreak >nul

REM Open dashboard
echo [3/4] Opening dashboard...
start "" "dashboard\index.html"
timeout /t 1 /nobreak >nul

REM Open Whop
echo [4/4] Opening Whop...
start https://whop.com
timeout /t 1 /nobreak >nul

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ EVERYTHING SET UP!                                    ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  START SELLING NOW!                                       ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 1. Copy message from OPTIMIZED_SALES_MESSAGES.md
echo 2. Add your Whop product link
echo 3. Message 20 friends on Telegram
echo 4. Post in Telegram groups
echo 5. Track sales in dashboard
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  YOUR WHOP LINKS (Use These!)                             ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Launch Special ($75): [Your Whop link]
echo Regular Price ($150): [Your Whop link]
echo Agency Pack ($400): [Your Whop link]
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  MONEY FLOW                                                ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Customer pays → Stripe/Whop → Your account → Skrill
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ANONYMITY CHECKLIST                                       ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo ✅ Business name used (not personal)
echo ✅ Generic statement descriptor
echo ✅ Business email used
echo ✅ Whop store (anonymous hosting)
echo ✅ No personal info in public
echo.
echo.
echo ========================================
echo    💰 GO MAKE MONEY NOW!
echo ========================================
echo.
echo Everything is set up!
echo Start messaging friends!
echo Get sales!
echo.
pause

