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

# Get current branch name
$branch = & git rev-parse --abbrev-ref HEAD 2>$null
if ($LASTEXITCODE -ne 0) {
  Err "Failed to get current branch"
  exit 1
}
Info "Current branch: $branch"

# Check if branch has tracking information
$trackingBranch = & git rev-parse --abbrev-ref "$branch@{upstream}" 2>$null
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($trackingBranch)) {
  Warn "Branch '$branch' has no tracking branch set."
  Info "Setting upstream to 'origin/$branch'..."
  & git branch -u "origin/$branch" $branch 2>&1 | Out-Null
  if ($LASTEXITCODE -ne 0) {
    Warn "Could not set upstream automatically. Will attempt push with explicit remote..."
  }
}

# Attempt push with better error handling
Info ""
Info "=== Pushing to remote (git push) ==="
Info "> git push --set-upstream origin $branch"

& git push --set-upstream origin $branch 2>&1 | Tee-Object -Variable pushOutput | Out-Host

if ($LASTEXITCODE -ne 0) {
  Err "Git push failed with exit code $($LASTEXITCODE)"
  Info ""
  Info "Common solutions:"
  Info "1. Check if remote has changes: git fetch origin"
  Info "2. Pull latest changes: git pull origin $branch"
  Info "3. Check authentication: git remote -v"
  Info "4. Try manual push: git push origin $branch -v"
  exit 1
} else {
  Success "OK"
}

Success "Push completed successfully"
exit 0
