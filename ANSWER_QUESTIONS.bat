@echo off
color 0B
title ❓ ANSWER CONFIGURATION QUESTIONS
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         ❓ CONFIGURATION QUESTIONS                         ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo 📋 Answer these YES/NO questions:
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  CONFIGURATION & SETUP                                    ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 1. Do you want to add PayPal payment option?
echo    (Currently only Skrill is configured)
echo    Answer: YES or NO
echo.
echo 2. Do you want to add crypto payment options (BTC/ETH/USDT)?
echo    (For customers who prefer crypto)
echo    Answer: YES or NO
echo.
echo 3. Do you want to customize your business name in messages?
echo    (Currently uses generic names)
echo    Answer: YES or NO
echo.
echo 4. Do you want to add your personal email for customer support?
echo    (For customer inquiries)
echo    Answer: YES or NO
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  MARKETING & BRANDING                                     ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 5. Do you want to add your social media links?
echo    (Twitter, Instagram, LinkedIn, etc.)
echo    Answer: YES or NO
echo.
echo 6. Do you want to customize the dashboard logo/name?
echo    (Currently: "AI Studio")
echo    Answer: YES or NO
echo.
echo 7. Do you want to add a custom domain name?
echo    (Instead of vercel.app URL)
echo    Answer: YES or NO
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  AUTOMATION                                                ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo 8. Do you want to set up automated email responses?
echo    (Auto-reply to customer emails)
echo    Answer: YES or NO
echo.
echo 9. Do you want to connect more Telegram groups?
echo    (For automated posting)
echo    Answer: YES or NO
echo.
echo 10. Do you want to add more marketing platforms?
echo     (TikTok, LinkedIn, etc.)
echo     Answer: YES or NO
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  📝 HOW TO ANSWER                                         ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Simply type your answers in chat, like:
echo   "1. YES, 2. NO, 3. YES, 4. NO..."
echo.
echo Or answer one by one:
echo   "Question 1: YES"
echo   "Question 2: NO"
echo   etc.
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  📚 TUTORIAL                                               ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo See PLACEHOLDER_TUTORIAL.md for:
echo   - How to find placeholders
echo   - How to edit files
echo   - Common examples
echo   - Best practices
echo.

echo Opening tutorial...
timeout /t 2 /nobreak >nul
if exist "PLACEHOLDER_TUTORIAL.md" (
    start "" "PLACEHOLDER_TUTORIAL.md"
)

echo.
echo ✅ Ready! Answer the questions in chat.
echo.
pause
