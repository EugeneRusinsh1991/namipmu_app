Param([string]$Message)

# save.ps1 - Generate -> Backup -> Git Add/Commit/Push
# Usage: .\save.ps1 -Message "Your commit message"

function Info($m) { Write-Host $m -ForegroundColor Cyan }
function Success($m) { Write-Host $m -ForegroundColor Green }
function Warn($m) { Write-Host $m -ForegroundColor Yellow }
function Err($m) { Write-Host $m -ForegroundColor Red }

# Go to script directory
if ($PSScriptRoot) { Set-Location -Path $PSScriptRoot }

# Check git repo
if (-not (Test-Path '.git')) {
  Err "ERROR: No .git directory found"
  exit 1
}

# Get commit message
if ([string]::IsNullOrWhiteSpace($Message)) {
  $Message = Read-Host "Commit message"
  if ([string]::IsNullOrWhiteSpace($Message)) {
    Err "ERROR: Commit message cannot be empty"
    exit 1
  }
}

# ===== STEP 1: GENERATE =====
Info ""
Info "=== STEP 1: Generate ==="
Info "> npm run generate"
& npm run generate
if ($LASTEXITCODE -ne 0) { Err "Generate failed"; exit 1 }
Success "✓ OK"

# ===== STEP 2: BACKUP =====
Info ""
Info "=== STEP 2: Backup ==="
Info "> npm run backup"
& npm run backup
if ($LASTEXITCODE -ne 0) { Err "Backup failed"; exit 1 }
Success "✓ OK"

# ===== STEP 3: GIT ADD =====
Info ""
Info "=== STEP 3: Git Add ==="
Info "> git add ."
Remove-Item ".git\index.lock" -Force -ErrorAction SilentlyContinue
& git add .
if ($LASTEXITCODE -ne 0) { Err "Git add failed"; exit 1 }
Success "✓ OK"

# ===== STEP 4: GIT COMMIT =====
Info ""
Info "=== STEP 4: Commit ==="
Info "> git commit -m '$Message'"
& git commit -m $Message
if ($LASTEXITCODE -ne 0) { Err "Commit failed"; exit 1 }
Success "✓ OK"

# ===== STEP 5: GIT PUSH =====
Info ""
Info "=== STEP 5: Push ==="

# Get branch
$branch = & git rev-parse --abbrev-ref HEAD 2>$null
if ($LASTEXITCODE -ne 0) { Err "Could not get branch"; exit 1 }

Info "Branch: $branch"
Info "> git push origin $branch"

Remove-Item ".git\index.lock" -Force -ErrorAction SilentlyContinue

& git push origin $branch -v
if ($LASTEXITCODE -ne 0) {
  Warn ""
  Warn "Push failed! Trying with --set-upstream..."
  & git push --set-upstream origin $branch -v
  if ($LASTEXITCODE -ne 0) {
    Err "Push failed after retry"
    Warn "Try: git pull origin $branch"
    exit 1
  }
}

Success "✓ OK"
Info ""
Success "========================================"
Success "✓ ALL STEPS COMPLETED SUCCESSFULLY!"
Success "========================================"
exit 0
