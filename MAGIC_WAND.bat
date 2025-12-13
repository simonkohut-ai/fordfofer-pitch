@echo off
echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║     🔮 MAGIC WAND - Auto Commit + Push + Deploy               ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo 📦 Adding files...
git add -A

echo 💾 Committing...
set timestamp=%date% %time%
git commit -m "🔮 Auto-commit: %timestamp%"

echo 🚀 Pushing...
git push origin main

echo 🌐 Deploying...
call npx vercel --prod --yes

echo.
echo ✅ MAGIC WAND COMPLETE!
echo.
pause


