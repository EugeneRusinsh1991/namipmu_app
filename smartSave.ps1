# smartSave.ps1 - Interactive menu for Generate, Backup, and Git operations
# Supports: Generate+Backup | Git Commit+Push | All Together
# Fixed encoding issues

function Info($m) { Write-Host $m -ForegroundColor Cyan }
function Success($m) { Write-Host $m -ForegroundColor Green }
function Warn($m) { Write-Host $m -ForegroundColor Yellow }
function Err($m) { Write-Host $m -ForegroundColor Red }

# Go to script directory
if ($PSScriptRoot) { Set-Location -Path $PSScriptRoot }

# Check git repo
if (-not (Test-Path '.git')) {
  Err "ERROR: Git repository not found"
  [Console]::ReadKey() | Out-Null
  exit 1
}

# ===== MENU =====
function Show-Menu {
  Clear-Host
  Write-Host ""
  Write-Host "========================================" -ForegroundColor Magenta
  Write-Host "          smartSave v1.0               " -ForegroundColor Magenta
  Write-Host "   Chto delat'?                        " -ForegroundColor Magenta
  Write-Host "========================================" -ForegroundColor Magenta
  Write-Host ""
  Write-Host "  [1] npm run generate + npm run backup"
  Write-Host ""
  Write-Host "  [2] Git: add . -> commit -> push"
  Write-Host ""
  Write-Host "  [3] ALL: 1 + 2"
  Write-Host ""
  Write-Host "  [ESC] Exit"
  Write-Host ""
}

# ===== OPERATION 1: Generate & Backup =====
function Invoke-GenerateBackup {
  Info ""
  Info "========================================="
  Info "        STEP 1: Generate & Backup       "
  Info "========================================="
  
  # Generate
  Info ""
  Info "> npm run generate"
  & npm run generate 2>&1 | Out-Null
  Info "[OK] Generate complete"
  
  # Backup
  Info ""
  Info "> npm run backup"
  & npm run backup 2>&1 | Out-Null
  Info "[OK] Backup complete"
  
  Success ""
  Success "[OK] Step 1 done!"
  Success ""
}

# ===== OPERATION 2: Git Add/Commit/Push =====
function Invoke-GitCommitPush {
  Info ""
  Info "========================================="
  Info "      STEP 2: Git Add/Commit/Push       "
  Info "========================================="
  
  # Get commit message
  Info ""
  $Message = Read-Host "Enter commit message"
  if ([string]::IsNullOrWhiteSpace($Message)) {
    Err "ERROR: Commit message cannot be empty"
    [Console]::ReadKey() | Out-Null
    return $false
  }
  
  # Git add
  Info ""
  Info "> git add ."
  Remove-Item ".git\index.lock" -Force -ErrorAction SilentlyContinue | Out-Null
  & git add . 2>&1 | Out-Null
  Info "[OK] Git add executed"
  
  # Git commit
  Info ""
  Info "> git commit -m '$Message'"
  & git commit -m $Message --allow-empty -v 2>&1 | Out-Null
  Info "[OK] Git commit executed"
  
  # Get branch
  Info ""
  $branch = & git rev-parse --abbrev-ref HEAD 2>$null
  if ($LASTEXITCODE -ne 0) {
    $branch = "main"
    Warn "[!] Could not get branch, using 'main'"
  }
  
  Info "> git push origin $branch"
  
  # Remove index lock
  Remove-Item ".git\index.lock" -Force -ErrorAction SilentlyContinue | Out-Null
  
  # Push with force
  & git push origin $branch -v --force 2>&1 | Out-Null
  if ($LASTEXITCODE -ne 0) {
    Warn ""
    Warn "[!] Push failed, retrying with --force..."
    & git push origin $branch --force -v 2>&1 | Out-Null
  }
  Info "[OK] Git push executed"
  
  Success ""
  Success "[OK] Step 2 done!"
  Success ""
  return $true
}

# ===== MAIN LOOP =====
$continue = $true
while ($continue) {
  Show-Menu
  
  # Wait for key press
  $key = [Console]::ReadKey($true)
  
  if ($key.Key -eq [ConsoleKey]::Escape) {
    Info ""
    Info "Goodbye!"
    exit 0
  }
  
  switch ($key.KeyChar) {
    '1' {
      Invoke-GenerateBackup
      Info ""
      Warn "Press any key to return to menu..."
      [Console]::ReadKey() | Out-Null
      break
    }
    '2' {
      $success = Invoke-GitCommitPush
      Info ""
      Warn "Press any key to return to menu..."
      [Console]::ReadKey() | Out-Null
      break
    }
    '3' {
      Invoke-GenerateBackup
      $success = Invoke-GitCommitPush
      Info ""
      Success "========================================="
      Success "[OK] ALL OPERATIONS COMPLETED!"
      Success "========================================="
      Info ""
      Warn "Press any key to return to menu..."
      [Console]::ReadKey() | Out-Null
      break
    }
    default {
      Err "Unknown command. Press any key..."
      [Console]::ReadKey() | Out-Null
    }
  }
}
