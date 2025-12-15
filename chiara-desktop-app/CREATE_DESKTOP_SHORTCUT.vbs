Set oWS = WScript.CreateObject("WScript.Shell")
Set oFS = CreateObject("Scripting.FileSystemObject")

' Get script directory
sScriptPath = WScript.ScriptFullName
sScriptDir = oFS.GetParentFolderName(sScriptPath)

' Create shortcut on desktop
sLinkFile = oWS.SpecialFolders("Desktop") & "\Chiara Studio.lnk"
Set oLink = oWS.CreateShortcut(sLinkFile)
oLink.TargetPath = sScriptDir & "\START.bat"
oLink.WorkingDirectory = sScriptDir
oLink.Description = "Chiara's AI Marketing Studio"
' Only set icon if it exists
If oFS.FileExists(sScriptDir & "\assets\icon.ico") Then
    oLink.IconLocation = sScriptDir & "\assets\icon.ico"
End If
oLink.Save

MsgBox "Desktop shortcut created successfully!" & vbCrLf & vbCrLf & "Location: " & sLinkFile, vbInformation, "Chiara Studio"

