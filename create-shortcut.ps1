$WshShell = New-Object -ComObject WScript.Shell
$DesktopPath = [Environment]::GetFolderPath("Desktop")
$ShortcutPath = Join-Path $DesktopPath "Deploy to Vercel.lnk"
$TargetPath = Join-Path $PSScriptRoot "DEPLOY_MANUAL.bat"
$WorkingDir = $PSScriptRoot

$Shortcut = $WshShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = $TargetPath
$Shortcut.WorkingDirectory = $WorkingDir
$Shortcut.Description = "Deploy Dashboard and p2ba-console to Vercel manually"
$Shortcut.IconLocation = "shell32.dll,1"
$Shortcut.Save()

Write-Host "✅ Desktop shortcut created successfully!" -ForegroundColor Green
Write-Host "📍 Location: $ShortcutPath" -ForegroundColor Cyan
Write-Host "🎉 You can now double-click the shortcut on your desktop!" -ForegroundColor Yellow
