@echo off
echo ========================================
echo SECURING REPOS AND CHECKING DEPLOYS
echo ========================================
echo.

echo Opening GitHub and Vercel...
start https://github.com/simonkohut-ai/p2ba/settings
timeout /t 2 /nobreak >nul
start https://github.com/simonkohut-ai?tab=repositories
timeout /t 2 /nobreak >nul
start https://vercel.com/dashboard
timeout /t 2 /nobreak >nul
start https://vercel.com/deployments
timeout /t 2 /nobreak >nul

echo.
echo Opening security guides...
start SECURE_REPOS_AND_DEPLOYS.md
timeout /t 1 /nobreak >nul
start MAKE_REPOS_PRIVATE.md
timeout /t 1 /nobreak >nul
start CHECK_CONFLICTING_DEPLOYS.md

echo.
echo ========================================
echo ALL PAGES OPENED!
echo ========================================
echo.
echo WHAT TO DO:
echo 1. Make GitHub repos PRIVATE
echo 2. Check Vercel for conflicting deploys
echo 3. Cancel/delete problematic deployments
echo.
echo Guides are open - follow them!
echo.
pause
