@echo off
chcp 65001 >nul
color 0A
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║     🗂️  DESKTOP ORGANIZER 🗂️                                ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo This will organize your desktop into folders:
echo   📂 Projects
echo   📂 School
echo   📂 Work ^& Clients
echo   📂 Deployment Files
echo   📂 Images ^& Media
echo   📂 Documents
echo   📂 Shortcuts
echo   📂 Archives ^& Downloads
echo.
pause

powershell -ExecutionPolicy Bypass -File "%~dp0ORGANIZE_DESKTOP.ps1"

echo.
pause
