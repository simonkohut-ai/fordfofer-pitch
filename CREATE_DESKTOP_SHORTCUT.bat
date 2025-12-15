@echo off
chcp 65001 >nul
color 0A
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║     🖥️  Creating Desktop Shortcut 🖥️                       ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

powershell -Command "$WshShell = New-Object -ComObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%USERPROFILE%\Desktop\Deploy to Vercel.lnk'); $Shortcut.TargetPath = '%~dp0DEPLOY_MANUAL.bat'; $Shortcut.WorkingDirectory = '%~dp0'; $Shortcut.Description = 'Deploy Dashboard and p2ba-console to Vercel manually'; $Shortcut.IconLocation = 'shell32.dll,1'; $Shortcut.Save()"

if exist "%USERPROFILE%\Desktop\Deploy to Vercel.lnk" (
    echo.
    echo ✅ Desktop shortcut created successfully!
    echo.
    echo 📍 Location: %USERPROFILE%\Desktop\Deploy to Vercel.lnk
    echo.
    echo 🎉 You can now double-click the shortcut on your desktop!
    echo.
) else (
    echo.
    echo ❌ Failed to create shortcut. Trying alternative method...
    echo.
)

pause
