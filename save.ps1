Param(
  [string]$Message
)

# save.ps1 - convenience script to run project generate -> backup -> git add/commit/push
# Place this file in your project root (same folder as package.json and .git).
# Usage:
#  - Interactive (asks for commit message): .\save.ps1
#  - Non-interactive (provide message): .\save.ps1 -Message "My commit"

function Info($m) { Write-Host $m -ForegroundColor Cyan }
function Success($m) { Write-Host $m -ForegroundColor Green }
function Warn($m) { Write-Host $m -ForegroundColor Yellow }
function Err($m) { Write-Host $m -ForegroundColor Red }

# Ensure we run from script directory (project root)
if ($PSScriptRoot) {
  Set-Location -Path $PSScriptRoot
}

# Basic safety checks
if (-not (Test-Path -Path '.git')) {
  Err "No .git directory found in this folder. Run the script from the project root where the repo is initialized."
  exit 1
}

# Check remote origin
& git remote get-url origin > $null 2>&1
if ($LASTEXITCODE -ne 0) {
  Warn "No git remote 'origin' configured. Push will likely fail."
}

# Ask for commit message if not provided
if ([string]::IsNullOrWhiteSpace($Message)) {
  do {
    $Message = Read-Host "Commit message"
    if ([string]::IsNullOrWhiteSpace($Message)) { Warn "Commit message cannot be empty. Please enter a message." }
  } while ([string]::IsNullOrWhiteSpace($Message))
} else {
  if ([string]::IsNullOrWhiteSpace($Message)) {
    Err "Provided commit message is empty."; exit 1
  }
}

function Run-Program($program, $arguments, $desc) {
  Info ""
  Info "=== $desc ==="
  if ($arguments -is [System.Array]) { $displayArgs = $arguments -join ' ' } else { $displayArgs = $arguments }
  Info "> $program $displayArgs"

  if ($arguments -is [System.Array]) {
    & $program @arguments
  } elseif ($arguments) {
    & $program $arguments
  } else {
    & $program
  }

  $exit = $LASTEXITCODE
  if ($exit -ne 0) {
    Err "Command failed: $program exited with code $exit"
    exit $exit
  } else {
    Success "OK"
  }
}

# Sequence of commands
Run-Program npm @('run','generate') "Generate content (npm run generate)"
Run-Program npm @('run','backup') "Backup (npm run backup)"
Run-Program git @('add','.') "Staging changes (git add .)"
Run-Program git @('commit','-m',$Message) "Committing (git commit)"
Run-Program git @('push') "Pushing to remote (git push)"

Success "Push completed successfully"
exit 0
