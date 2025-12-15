@echo off
color 0B
title 📦 SETUP GITHUB REPO
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         📦 SETUP GITHUB REPOSITORY                        ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo This will help you create a GitHub repository for deployment.
echo.
echo Step 1: Create a new repository on GitHub
echo   1. Go to: https://github.com/new
echo   2. Repository name: ai-studio-dashboard (or your choice)
echo   3. Make it Private (recommended)
echo   4. Don't initialize with README
echo   5. Click "Create repository"
echo.
echo Step 2: Copy the repository URL
echo   It will look like: https://github.com/yourusername/ai-studio-dashboard.git
echo.
echo Press any key after creating the repository...
pause >nul

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  INITIALIZING GIT REPOSITORY...                           ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

REM Check for Git
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git not found!
    echo.
    echo Please install Git: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo ✅ Git found!
echo.

REM Initialize Git
if not exist ".git" (
    echo Initializing Git repository...
    git init
    echo ✅ Git initialized!
) else (
    echo ✅ Git already initialized!
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ADDING FILES...                                           ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

git add .

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  CREATING COMMIT...                                        ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

git commit -m "Initial commit: AI Studio Dashboard"

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ READY TO PUSH!                                         ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Now run these commands (replace YOUR_REPO_URL):
echo.
echo   git branch -M main
echo   git remote add origin YOUR_REPO_URL
echo   git push -u origin main
echo.
echo Example:
echo   git remote add origin https://github.com/yourusername/ai-studio-dashboard.git
echo   git push -u origin main
echo.
echo Or use GitHub Desktop for easier push!
echo.
pause
