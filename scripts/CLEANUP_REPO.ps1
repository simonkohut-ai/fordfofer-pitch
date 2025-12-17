# Repository Cleanup Script
# Removes unused files, dead routes, and redundant code

$ErrorActionPreference = "Continue"

Write-Host "🧹 Repository Cleanup" -ForegroundColor Cyan
Write-Host ""

# Count files before cleanup
$batFilesBefore = (Get-ChildItem -Filter "*.bat" -File -Recurse | Where-Object { $_.DirectoryName -notlike "*node_modules*" }).Count
$mdFilesBefore = (Get-ChildItem -Filter "*.md" -File -Recurse | Where-Object { $_.DirectoryName -notlike "*node_modules*" -and $_.DirectoryName -notlike "*\.git*" -and $_.DirectoryName -notlike "*docs*" }).Count

Write-Host "Files before cleanup:" -ForegroundColor Yellow
Write-Host "  .bat files: $batFilesBefore" -ForegroundColor Gray
Write-Host "  .md files (excluding docs/): $mdFilesBefore" -ForegroundColor Gray
Write-Host ""

# Create archive folder for safety
$archiveFolder = "archive_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
New-Item -ItemType Directory -Path $archiveFolder -Force | Out-Null
Write-Host "Created archive folder: $archiveFolder" -ForegroundColor Green
Write-Host ""

# Archive old deployment scripts
Write-Host "📦 Archiving deployment scripts..." -ForegroundColor Yellow
$batFiles = Get-ChildItem -Filter "*.bat" -File | Where-Object { 
    $_.Name -notlike "VERIFY_*" -and 
    $_.Name -notlike "*README*" 
}
foreach ($file in $batFiles) {
    Move-Item -Path $file.FullName -Destination "$archiveFolder\$($file.Name)" -Force
    Write-Host "  Archived: $($file.Name)" -ForegroundColor Gray
}

# Archive old PowerShell scripts (except essential ones)
Write-Host "📦 Archiving old PowerShell scripts..." -ForegroundColor Yellow
$ps1Files = Get-ChildItem -Filter "*.ps1" -File | Where-Object {
    $_.Name -notlike "VERIFY_*" -and
    $_.Name -notlike "DAILY_*" -and
    $_.Name -notlike "CLEANUP_*"
}
foreach ($file in $ps1Files) {
    Move-Item -Path $file.FullName -Destination "$archiveFolder\$($file.Name)" -Force
    Write-Host "  Archived: $($file.Name)" -ForegroundColor Gray
}

# Archive old documentation (keep only docs/ folder)
Write-Host "📦 Archiving old documentation..." -ForegroundColor Yellow
$mdFiles = Get-ChildItem -Filter "*.md" -File | Where-Object {
    $_.Name -ne "README.md" -and
    $_.Name -ne "ENV_VARIABLES.md" -and
    $_.Name -ne "PRIVACY.md" -and
    $_.Name -ne "SECURITY.md" -and
    $_.Name -ne "LICENSE"
}
foreach ($file in $mdFiles) {
    Move-Item -Path $file.FullName -Destination "$archiveFolder\$($file.Name)" -Force
    Write-Host "  Archived: $($file.Name)" -ForegroundColor Gray
}

# Archive dashboard documentation (keep only essential)
Write-Host "📦 Archiving dashboard documentation..." -ForegroundColor Yellow
$dashboardMdFiles = Get-ChildItem -Path "dashboard" -Filter "*.md" -File | Where-Object {
    $_.Name -ne "README.md" -and
    $_.Name -notlike "*PRODUCTION*" -and
    $_.Name -notlike "*REVENUE*" -and
    $_.Name -notlike "*STRIPE*"
}
foreach ($file in $dashboardMdFiles) {
    $targetPath = "$archiveFolder\dashboard_$($file.Name)"
    New-Item -ItemType Directory -Path (Split-Path $targetPath) -Force | Out-Null
    Move-Item -Path $file.FullName -Destination $targetPath -Force
    Write-Host "  Archived: dashboard\$($file.Name)" -ForegroundColor Gray
}

# Count files after cleanup
$batFilesAfter = (Get-ChildItem -Filter "*.bat" -File -Recurse | Where-Object { $_.DirectoryName -notlike "*node_modules*" }).Count
$mdFilesAfter = (Get-ChildItem -Filter "*.md" -File -Recurse | Where-Object { $_.DirectoryName -notlike "*node_modules*" -and $_.DirectoryName -notlike "*\.git*" -and $_.DirectoryName -notlike "*docs*" }).Count

Write-Host ""
Write-Host "=== Cleanup Summary ===" -ForegroundColor Cyan
Write-Host "Files removed:" -ForegroundColor Yellow
Write-Host "  .bat files: $batFilesBefore → $batFilesAfter (removed $($batFilesBefore - $batFilesAfter))" -ForegroundColor Green
Write-Host "  .md files: $mdFilesBefore → $mdFilesAfter (removed $($mdFilesBefore - $mdFilesAfter))" -ForegroundColor Green
Write-Host ""
Write-Host "Archived to: $archiveFolder" -ForegroundColor Green
Write-Host ""
Write-Host "✅ Cleanup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Review archived files" -ForegroundColor Gray
Write-Host "  2. Delete archive folder if everything looks good" -ForegroundColor Gray
Write-Host "  3. Commit changes" -ForegroundColor Gray

