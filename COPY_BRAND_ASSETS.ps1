# Copy Brand PNG Assets
# Usage: .\COPY_BRAND_ASSETS.ps1 -SourcePath "C:\path\to\unzipped\folder"

param(
    [Parameter(Mandatory=$false)]
    [string]$SourcePath = ""
)

$targetDir = "assets/brand"
$files = @(
    "favicon-16.png",
    "favicon-32.png",
    "apple-touch-icon.png",
    "icon-192.png",
    "icon-512.png",
    "og.png"
)

Write-Host "=== Copy Brand PNG Assets ===" -ForegroundColor Cyan
Write-Host ""

if ([string]::IsNullOrEmpty($SourcePath)) {
    Write-Host "Please provide the path to the folder containing the PNG files:" -ForegroundColor Yellow
    Write-Host "Example: .\COPY_BRAND_ASSETS.ps1 -SourcePath 'C:\Users\simik\Downloads\golocapo_brand_pngs'" -ForegroundColor Gray
    Write-Host ""
    $SourcePath = Read-Host "Enter source folder path"
}

if (-not (Test-Path $SourcePath)) {
    Write-Host "❌ Source path not found: $SourcePath" -ForegroundColor Red
    exit 1
}

Write-Host "Source: $SourcePath" -ForegroundColor Gray
Write-Host "Target: $targetDir" -ForegroundColor Gray
Write-Host ""

$allCopied = $true

foreach ($file in $files) {
    $sourceFile = Join-Path $SourcePath $file
    $targetFile = Join-Path $targetDir $file
    
    if (Test-Path $sourceFile) {
        Copy-Item $sourceFile $targetFile -Force
        $size = (Get-Item $targetFile).Length
        Write-Host "✅ Copied: $file ($([math]::Round($size/1KB,2)) KB)" -ForegroundColor Green
    } else {
        Write-Host "❌ Missing: $file" -ForegroundColor Red
        $allCopied = $false
    }
}

Write-Host ""

if ($allCopied) {
    Write-Host "✅ All files copied successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. git add assets/brand/*.png" -ForegroundColor Gray
    Write-Host "2. git commit -m 'Replace placeholder icons + OG with final PNG assets'" -ForegroundColor Gray
    Write-Host "3. git push" -ForegroundColor Gray
} else {
    Write-Host "❌ Some files were missing. Please check the source folder." -ForegroundColor Red
    exit 1
}

