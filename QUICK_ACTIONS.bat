@echo off
title QUICK ACTIONS
echo.
echo Opening Whop to create product...
start https://whop.com/products/new
timeout /t 2 >nul
echo Opening Dashboard to test...
start https://ai-studio-sandy-five.vercel.app
timeout /t 2 >nul
echo Opening Console to test...
start https://p2ba-navy.vercel.app
echo.
echo All pages opened!
echo.
echo NEXT STEPS:
echo   1. Create product in Whop
echo   2. Set price (e.g., /month)
echo   3. Add product description
echo   4. Share your URLs
echo.
pause
