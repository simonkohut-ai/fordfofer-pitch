@echo off
chcp 65001 >nul
cls

echo ╔═══════════════════════════════════════════════════════════════╗
echo ║  🦄 FORDFOFER SIMPLE POST GENERATOR                           ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.
echo 🚀 Otváram HTML Post Generator...
echo.
echo 📋 ČO TERAZ:
echo   1. Vlož OpenAI API key (už je tam predvyplnený)
echo   2. Vyber typ postu (Hype, Education, Story...)
echo   3. Klikni "Generuj Post"
echo   4. Klikni "Skopíruj Post"
echo   5. Vlož na Instagram (30 sekúnd)
echo.
echo ✅ 100%% ZADARMO - žiadny setup, žiadne komplikácie!
echo.

cd /d "%~dp0"
start SIMPLE_POST_GENERATOR.html

echo ═══════════════════════════════════════════════════════════════
echo.
echo Post generator otvorený v prehliadači!
echo.
pause

