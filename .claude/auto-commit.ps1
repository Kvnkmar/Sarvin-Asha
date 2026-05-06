$ErrorActionPreference = 'Continue'

Set-Location -Path (Join-Path $PSScriptRoot '..')

$changes = & git status --porcelain
if (-not $changes) { exit 0 }

$secretPatterns = @(
  '^\.env$', '^\.env\..*',
  '.*\.key$', '.*\.pem$', '.*\.p12$', '.*\.pfx$', '.*\.kdbx$',
  '^secrets\..*', '^credentials\..*',
  '^id_rsa', '^id_ed25519'
)

$blocked = @()
foreach ($line in $changes) {
  if ($line.Length -lt 4) { continue }
  $f = $line.Substring(3).Trim('"')
  if ($f -match '\s->\s') { $f = ($f -split '\s->\s')[-1].Trim('"') }
  $name = Split-Path $f -Leaf
  foreach ($pat in $secretPatterns) {
    if ($name -match $pat) { $blocked += $f; break }
  }
}

if ($blocked.Count -gt 0) {
  $msg = 'Auto-commit blocked: possible secret files in changes: ' + ($blocked -join ', ')
  $payload = @{ systemMessage = $msg; suppressOutput = $false } | ConvertTo-Json -Compress
  Write-Output $payload
  exit 0
}

& git add -A | Out-Null
$timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm'
$commitOut = & git commit -m "Auto-commit from Claude ($timestamp)" 2>&1
if ($LASTEXITCODE -ne 0) {
  $payload = @{ systemMessage = "Auto-commit: nothing to commit" } | ConvertTo-Json -Compress
  Write-Output $payload
  exit 0
}

$pushOut = & git push 2>&1
if ($LASTEXITCODE -ne 0) {
  $errText = ($pushOut | Out-String).Trim()
  $payload = @{ systemMessage = "Auto-push failed: $errText" } | ConvertTo-Json -Compress
  Write-Output $payload
  exit 0
}

$payload = @{ systemMessage = "Auto-committed and pushed to GitHub" } | ConvertTo-Json -Compress
Write-Output $payload
exit 0
