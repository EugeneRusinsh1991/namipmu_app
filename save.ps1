Param(
  [string]$Message
)

# save.ps1 - convenience script to run project generate -> backup -> git add/commit/push
# Place this file in your project root (same folder as package.json and .git).
# Usage:
#  - Interactive (asks for commit message): .\save.ps1
#  - Non-interactive (provide message): .\save.ps1 -Message "My commit"

$maxRetries = 3
$retryCount = 0

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

# Cleanup git lock files and temp files before we start
Info "Cleaning up git lock files..."
Remove-Item -Path ".git\index.lock" -ErrorAction SilentlyContinue
Remove-Item -Path ".git\HEAD.lock" -ErrorAction SilentlyContinue

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

# Cleanup git before push
Info ""
Info "=== Cleaning up git before push ==="
Warn "Running git gc (this may take a moment)..."
& git gc --aggressive --prune=now 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
  Success "Git cleanup completed"
} else {
  Warn "Git cleanup returned an error, but continuing..."
}

# Remove lock files again after gc
Remove-Item -Path ".git\index.lock" -ErrorAction SilentlyContinue
Remove-Item -Path ".git\HEAD.lock" -ErrorAction SilentlyContinue

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

# Push with retry logic
$pushSuccess = $false
while ($retryCount -lt $maxRetries) {
  Info ""
  Info "=== Pushing to remote (attempt $($retryCount + 1)/$maxRetries) ==="
  Info "> git push --set-upstream origin $branch -v"
  
  # Capture both stdout and stderr
  $pushOutput = & git push --set-upstream origin $branch -v 2>&1
  $pushExitCode = $LASTEXITCODE
  
  # Display output
  $pushOutput | ForEach-Object { Write-Host $_ }
  
  if ($pushExitCode -eq 0) {
    $pushSuccess = $true
    Success "OK"
    break
  } else {
    $retryCount++
    if ($retryCount -lt $maxRetries) {
      Warn "Push failed (exit code: $pushExitCode). Retrying..."
      Start-Sleep -Seconds 2
      
      # Clean up before retry
      Remove-Item -Path ".git\index.lock" -ErrorAction SilentlyContinue
      Info "Attempting fetch from origin..."
      & git fetch origin 2>&1 | Out-Null
    }
  }
}

if (-not $pushSuccess) {
  Err "Git push failed after $maxRetries attempts"
  Info ""
  Info "Troubleshooting steps:"
  Info "1. Check internet connection"
  Info "2. Verify git credentials: git config --list | findstr user"
  Info "3. Test remote: git remote -v"
  Info "4. Try manual push: git push origin $branch -v"
  Info "5. If locked, remove: Remove-Item '.git\objects\pack\*.idx' -Force"
  exit 1
} else {
  Success "Push completed successfully"
  exit 0
}
