# 🗂️ Desktop Organizer Script
# Organizes desktop files into logical folders

$Desktop = [Environment]::GetFolderPath("Desktop")
Write-Host "Organizing Desktop: $Desktop" -ForegroundColor Cyan
Write-Host ""

# Create folder structure
$folders = @{
    "Projects" = @()
    "School" = @()
    "Work and Clients" = @()
    "Deployment Files" = @()
    "Images and Media" = @()
    "Documents" = @()
    "Shortcuts" = @()
    "Archives and Downloads" = @()
    "Other" = @()
}

# Create folders
foreach ($folder in $folders.Keys) {
    $path = Join-Path $Desktop $folder
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
        Write-Host "Created: $folder" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "Organizing files..." -ForegroundColor Yellow
Write-Host ""

# Get all items on desktop
$items = Get-ChildItem $Desktop -File | Where-Object { $_.Name -notlike "*.lnk" -and $_.Name -notlike "*.url" }

# Project folders (keep as-is, but note them)
$projectFolders = @("the most wanted!!!", "parlay-app", "workie.ai", "NOLIM GPT", "webapp", "digihub education", "hp rework", "KOMFORT REALITY REWORK", "vg rework", "kubovcik video", "lz", "animation", "barber", "MIKORK")

# Organize files
foreach ($item in $items) {
    $moved = $false
    $extension = $item.Extension.ToLower()
    $name = $item.Name.ToLower()
    
    # Deployment files
    if ($name -like "*dashboard*.zip" -or $name -like "*p2ba*.zip" -or $name -like "*concole*.zip" -or $name -like "*ford*.zip") {
        Move-Item $item.FullName -Destination (Join-Path $Desktop "Deployment Files") -Force -ErrorAction SilentlyContinue
        Write-Host "  $($item.Name) -> Deployment Files" -ForegroundColor Cyan
        $moved = $true
    }
    # Images
    elseif ($extension -in @(".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".ico")) {
        Move-Item $item.FullName -Destination (Join-Path $Desktop "Images and Media") -Force -ErrorAction SilentlyContinue
        Write-Host "  $($item.Name) -> Images and Media" -ForegroundColor Magenta
        $moved = $true
    }
    # Documents
    elseif ($extension -in @(".pdf", ".docx", ".doc", ".txt", ".md", ".pptx", ".xlsx", ".csv")) {
        Move-Item $item.FullName -Destination (Join-Path $Desktop "Documents") -Force -ErrorAction SilentlyContinue
        Write-Host "  $($item.Name) -> Documents" -ForegroundColor Blue
        $moved = $true
    }
    # Archives
    elseif ($extension -in @(".zip", ".rar", ".7z", ".tar", ".gz")) {
        Move-Item $item.FullName -Destination (Join-Path $Desktop "Archives and Downloads") -Force -ErrorAction SilentlyContinue
        Write-Host "  $($item.Name) -> Archives and Downloads" -ForegroundColor Yellow
        $moved = $true
    }
    # Code files
    elseif ($extension -in @(".html", ".css", ".js", ".json", ".py", ".java", ".sql", ".code-workspace", ".asc")) {
        Move-Item $item.FullName -Destination (Join-Path $Desktop "Projects") -Force -ErrorAction SilentlyContinue
        Write-Host "  $($item.Name) -> Projects" -ForegroundColor Green
        $moved = $true
    }
    # Media files
    elseif ($extension -in @(".mov", ".mp4", ".avi", ".mp3", ".wav", ".flac")) {
        Move-Item $item.FullName -Destination (Join-Path $Desktop "Images and Media") -Force -ErrorAction SilentlyContinue
        Write-Host "  $($item.Name) -> Images and Media" -ForegroundColor Magenta
        $moved = $true
    }
    # School files
    elseif ($name -like "*maturita*" -or $name -like "*learning*" -or $name -like "*ulohy*" -or $name -like "*odovzdanie*" -or $name -like "*zaverecny*") {
        Move-Item $item.FullName -Destination (Join-Path $Desktop "School") -Force -ErrorAction SilentlyContinue
        Write-Host "  $($item.Name) -> School" -ForegroundColor Yellow
        $moved = $true
    }
}

# Organize shortcuts
Write-Host ""
Write-Host "Organizing shortcuts..." -ForegroundColor Yellow
$shortcuts = Get-ChildItem $Desktop -Filter "*.lnk"
foreach ($shortcut in $shortcuts) {
    Move-Item $shortcut.FullName -Destination (Join-Path $Desktop "Shortcuts") -Force -ErrorAction SilentlyContinue
    Write-Host "  $($shortcut.Name) -> Shortcuts" -ForegroundColor Cyan
}

# Organize URL files
$urls = Get-ChildItem $Desktop -Filter "*.url"
foreach ($url in $urls) {
    Move-Item $url.FullName -Destination (Join-Path $Desktop "Shortcuts") -Force -ErrorAction SilentlyContinue
    Write-Host "  $($url.Name) -> Shortcuts" -ForegroundColor Cyan
}

# Move project folders to Projects folder
Write-Host ""
Write-Host "Organizing project folders..." -ForegroundColor Yellow
foreach ($folderName in $projectFolders) {
    $folderPath = Join-Path $Desktop $folderName
    if (Test-Path $folderPath) {
        $dest = Join-Path $Desktop "Projects\$folderName"
        if (-not (Test-Path $dest)) {
            Move-Item $folderPath -Destination (Join-Path $Desktop "Projects") -Force -ErrorAction SilentlyContinue
            Write-Host "  $folderName -> Projects" -ForegroundColor Green
        }
    }
}

# Move school-related folders
$schoolFolders = @("MATURITA", "MIKORK")
foreach ($folderName in $schoolFolders) {
    $folderPath = Join-Path $Desktop $folderName
    if (Test-Path $folderPath) {
        $dest = Join-Path $Desktop "School\$folderName"
        if (-not (Test-Path $dest)) {
            Move-Item $folderPath -Destination (Join-Path $Desktop "School") -Force -ErrorAction SilentlyContinue
            Write-Host "  $folderName -> School" -ForegroundColor Yellow
        }
    }
}

# Move work/client folders
$workFolders = @("barber", "KOMFORT REALITY REWORK", "vg rework", "hp rework", "kubovcik video", "faktury", "digihub education")
foreach ($folderName in $workFolders) {
    $folderPath = Join-Path $Desktop $folderName
    if (Test-Path $folderPath) {
        $dest = Join-Path $Desktop "Work and Clients\$folderName"
        if (-not (Test-Path $dest)) {
            Move-Item $folderPath -Destination (Join-Path $Desktop "Work and Clients") -Force -ErrorAction SilentlyContinue
            Write-Host "  $folderName -> Work and Clients" -ForegroundColor Blue
        }
    }
}

# Move download folders
$downloadFolders = @("drive-download-20250514T171417Z-1-001", "wall-20250527T153956Z-1-001")
foreach ($folderName in $downloadFolders) {
    $folderPath = Join-Path $Desktop $folderName
    if (Test-Path $folderPath) {
        Move-Item $folderPath -Destination (Join-Path $Desktop "Archives and Downloads") -Force -ErrorAction SilentlyContinue
        Write-Host "  $folderName -> Archives and Downloads" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Desktop organization complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  Projects - Development projects and code files"
Write-Host "  School - School work and assignments"
Write-Host "  Work and Clients - Client projects and work files"
Write-Host "  Deployment Files - Zip files for deployment"
Write-Host "  Images and Media - Images, videos, and media files"
Write-Host "  Documents - PDFs, Word docs, text files"
Write-Host "  Shortcuts - Application shortcuts"
Write-Host "  Archives and Downloads - Zip files and downloads"
Write-Host ""
Write-Host "Your desktop is now organized!" -ForegroundColor Green
