@echo off
setlocal enabledelayedexpansion

echo ==========================================
echo  AUTO CHECK + FIX (Vercel + Git projects)
echo  Repo: fordfofer-pitch
echo ==========================================
echo.

REM --- ensure we are in repo root (contains dashboard and p2ba-console)
if not exist "dashboard\" (
  echo [ERROR] Missing folder: dashboard\
  echo        Run this script from the fordfofer-pitch folder.
  goto :fail
)
if not exist "p2ba-console\" (
  echo [ERROR] Missing folder: p2ba-console\
  echo        Run this script from the fordfofer-pitch folder.
  goto :fail
)

echo [OK] Folder structure found: dashboard\ and p2ba-console\
echo.

REM --- check toolchain
where node >nul 2>&1 || (echo [ERROR] node not found. Install Node.js. & goto :fail)
where git  >nul 2>&1 || (echo [ERROR] git not found. Install Git. & goto :fail)
where vercel >nul 2>&1 || (echo [ERROR] vercel not found. Install Vercel CLI: npm i -g vercel & goto :fail)

echo [OK] node: 
node -v
echo [OK] git:
git -v
echo [OK] vercel:
vercel -v
echo.

REM --- verify vercel auth (will fail if not logged in)
echo [CHECK] Verifying Vercel login...
vercel whoami >nul 2>&1
if errorlevel 1 (
  echo [ACTION] Not logged in. Running: vercel login
  vercel login
)

echo [OK] Vercel logged in as:
vercel whoami
echo.

REM --- LINK: ai-studio (dashboard)
echo ------------------------------------------
echo [STEP] Link dashboard -> Vercel project: ai-studio
echo ------------------------------------------
pushd dashboard

REM Link interactively if not linked yet
if not exist ".vercel\project.json" (
  echo [ACTION] Linking dashboard... (choose EXISTING project: ai-studio)
  vercel link
) else (
  echo [OK] dashboard already linked
)

REM Force root directory (important)
echo [ACTION] Setting root directory for ai-studio to "dashboard"
vercel project set ai-studio --root-directory dashboard

REM Check env var existence (does not print secret)
echo [CHECK] Does OPENAI_API_KEY exist in ai-studio (production)?
vercel env ls production | findstr /i "OPENAI_API_KEY" >nul
if errorlevel 1 (
  echo [WARN] OPENAI_API_KEY not found for ai-studio (production).
  echo        Run: vercel env add OPENAI_API_KEY production
  echo        (Paste the key when prompted. Do NOT paste it into chat.)
) else (
  echo [OK] OPENAI_API_KEY exists for ai-studio (production).
)

popd
echo.

REM --- LINK: p2ba (console)
echo ------------------------------------------
echo [STEP] Link p2ba-console -> Vercel project: p2ba
echo ------------------------------------------
pushd p2ba-console

if not exist ".vercel\project.json" (
  echo [ACTION] Linking p2ba-console... (choose EXISTING project: p2ba)
  vercel link
) else (
  echo [OK] p2ba-console already linked
)

echo [CHECK] Does OPENAI_API_KEY exist in p2ba (production)?
vercel env ls production | findstr /i "OPENAI_API_KEY" >nul
if errorlevel 1 (
  echo [WARN] OPENAI_API_KEY not found for p2ba (production).
  echo        Run: vercel env add OPENAI_API_KEY production
) else (
  echo [OK] OPENAI_API_KEY exists for p2ba (production).
)

popd
echo.

echo ==========================================
echo  DONE: Checks + linking complete.
echo ==========================================
echo.
echo Optional deploy commands:
echo   cd dashboard ^&^& vercel --prod
echo   cd p2ba-console ^&^& vercel --prod
echo.
exit /b 0

:fail
echo.
echo ==========================================
echo  FAILED. Fix the error above and re-run.
echo ==========================================
exit /b 1
