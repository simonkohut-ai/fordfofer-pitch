# VERIFY_DEPLOY_LIVE.ps1
# Production-safe deploy + domain verification (no false positives)

[CmdletBinding()]
param(
  [string]$ProjectName = "dashboard",
  [string]$Domain      = "golocapo.com",
  [string]$HealthPath  = "/api/health",
  [int]$TimeoutSeconds = 15
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Ok($msg)   { Write-Host "[OK] $msg" -ForegroundColor Green }
function Info($msg) { Write-Host "[INFO] $msg" -ForegroundColor Cyan }
function Warn($msg) { Write-Host "[WARN] $msg" -ForegroundColor Yellow }
function Fail($msg) { Write-Host "[FAIL] $msg" -ForegroundColor Red; exit 1 }

function Require-Command($name) {
  if (-not (Get-Command $name -ErrorAction SilentlyContinue)) {
    Fail "Required command '$name' not found. Install it and try again."
  }
}

function Test-Http200([string]$Url, [int]$Timeout) {
  try {
    $resp = Invoke-WebRequest -Uri $Url -Method GET -TimeoutSec $Timeout -UseBasicParsing
    return [int]$resp.StatusCode -eq 200
  } catch {
    return $false
  }
}

function Get-JsonFromCli([string]$CommandLine) {
  # Runs a CLI command that returns JSON and parses it.
  # Example: Get-JsonFromCli "vercel project ls --json"
  $out = Invoke-Expression $CommandLine
  if (-not $out) { return $null }
  try { return ($out | ConvertFrom-Json) } catch { return $null }
}

# --- Preconditions ---
Require-Command "vercel"

if (-not (Test-Path -LiteralPath ".\vercel.json")) {
  Fail "vercel.json not found. Run this script from the project root."
}
Ok "Found vercel.json"

# Ensure Vercel CLI responds (auth)
try {
  $who = & vercel whoami 2>$null
  if (-not $who) { throw "Not logged in" }
  Ok "Vercel CLI authenticated as: $who"
} catch {
  Fail "Vercel CLI not authenticated. Run: vercel login"
}

# --- Verify project exists + matches ProjectName ---
Info "Verifying Vercel project '$ProjectName' exists..."
$projects = Get-JsonFromCli "vercel project ls --json"
if (-not $projects) {
  Warn "Could not parse 'vercel project ls --json'. Continuing with deploy, but project verification is weaker."
} else {
  $proj = $projects | Where-Object { $_.name -eq $ProjectName } | Select-Object -First 1
  if (-not $proj) {
    Fail "Project '$ProjectName' not found in Vercel account/team. Fix ProjectName or switch scope/team."
  }
  Ok "Project verified: $($proj.name) (id: $($proj.id))"
}

# --- Deploy to production ---
Info "Deploying to production..."
# --confirm reduces prompts; --yes accepts defaults if supported by your CLI version
$deployOut = & vercel deploy --prod --confirm 2>&1
if ($LASTEXITCODE -ne 0) {
  Fail "Vercel deploy failed.`n$deployOut"
}
Ok "Deployment command completed"

# Extract the last URL from output (best-effort)
$vercelUrl = ($deployOut | Select-String -Pattern "https?://[^\s]+" -AllMatches).Matches.Value | Select-Object -Last 1
if ($vercelUrl) {
  Info "Vercel deployment URL (best-effort): $vercelUrl"
} else {
  Warn "Could not extract Vercel URL from output."
}

# --- Domain attachment check (best-effort) ---
# NOTE: Vercel CLI JSON shape can vary by version/team scope.
# We attempt to verify domain is connected somewhere; if we can't verify, we fail safe and tell you what to do.
Info "Checking domain attachment for '$Domain' (best-effort)..."
$domains = Get-JsonFromCli "vercel domains ls --json"

if (-not $domains) {
  Fail @"
Cannot verify domain attachment via 'vercel domains ls --json' (CLI output not parseable).
Failing safe to prevent false positives.

Fix:
- Open Vercel → Project '$ProjectName' → Settings → Domains
- Ensure '$Domain' is attached and shows green/valid
Then re-run this script.
"@
}

$domainRow = $domains | Where-Object {
  ($_.name -eq $Domain) -or ($_.domain -eq $Domain)
} | Select-Object -First 1

if (-not $domainRow) {
  Fail @"
Domain '$Domain' not found in Vercel domains list.
Failing safe.

Fix:
- Vercel → Project '$ProjectName' → Settings → Domains → Add/Attach '$Domain'
Then re-run.
"@
}

# Try to detect project attachment if fields exist
$attachedProject = $null
if ($domainRow.projectName) { $attachedProject = $domainRow.projectName }
elseif ($domainRow.project) { $attachedProject = $domainRow.project }
elseif ($domainRow.projectId) { $attachedProject = $domainRow.projectId }
elseif ($domainRow.targetProject) { $attachedProject = $domainRow.targetProject }

if ($attachedProject) {
  Ok "Domain appears attached (field found): $attachedProject"
} else {
  Warn "Domain exists, but CLI did not expose an attachment field. Proceeding to HTTP verification (source of truth)."
}

# --- HTTP verification (source of truth) ---
$healthUrl = "https://$Domain$HealthPath"
Info "Verifying domain responds with HTTP 200: $healthUrl"

if (-not (Test-Http200 -Url $healthUrl -Timeout $TimeoutSeconds)) {
  Fail @"
Domain is NOT serving correctly (expected HTTP 200):
$healthUrl

Fix checklist:
- Vercel → Project '$ProjectName' → Settings → Domains → '$Domain' is green/valid
- Ensure route '$HealthPath' exists and returns 200
- Confirm DNS propagated (if not bought in Vercel)
Then re-run.
"@
}

Ok "PASS: Custom domain is LIVE and responding (HTTP 200)"

Write-Host ""
Write-Host "[LIVE] DEPLOYMENT IS LIVE" -ForegroundColor Green
if ($vercelUrl) { Write-Host "Vercel URL:   $vercelUrl" -ForegroundColor White }
Write-Host "Custom Domain: https://$Domain" -ForegroundColor White
exit 0

