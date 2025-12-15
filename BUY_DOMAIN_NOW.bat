@echo off
chcp 65001 >nul
color 0A
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║     🌐 BUY DOMAIN FOR GOLO ČAPO 🌐                         ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo Recommended domain: golocapo.com
echo Budget: ~10 EUR/year
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════════
echo Opening Namecheap (Recommended)...
echo ═══════════════════════════════════════════════════════════════
echo.
start https://www.namecheap.com/domains/registration/results/?domain=golocapo.com
timeout /t 2 >nul

echo.
echo ═══════════════════════════════════════════════════════════════
echo Opening domain guide...
echo ═══════════════════════════════════════════════════════════════
echo.
start "" "%~dp0DOMAIN_RECOMMENDATIONS.md"

echo.
echo ✅ Namecheap and guide opened!
echo.
echo 📋 QUICK STEPS:
echo.
echo 1. Search for: golocapo.com
echo 2. Add to cart
echo 3. Enable WHOIS Privacy (free)
echo 4. Use email: gcapovic.biz@proton.me
echo 5. Complete purchase
echo 6. Connect to Vercel (see guide)
echo.
echo 💰 Cost: ~10 EUR/year
echo.
pause
