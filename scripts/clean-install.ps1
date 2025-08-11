<#!
.SYNOPSIS
Performs a clean install of requirements.txt into a fresh .venv.

.DESCRIPTION
- Deletes any existing .venv
- Creates a new virtual environment
- Upgrades pip/setuptools/wheel
- Optionally purges pip cache and installs without cache
- Installs from requirements.txt
- Optionally runs pytest

.PARAMETER NoCache
Purge pip cache and install with --no-cache-dir.

.PARAMETER RunTests
Run tests via pytest after installing dependencies.

.EXAMPLE
./scripts/clean-install.ps1 -NoCache -RunTests

.NOTES
Works on Windows PowerShell 5.1+ and PowerShell 7+. The script operates relative to the repo root.
#>

[CmdletBinding()]
param(
    [switch]$NoCache,
    [switch]$RunTests
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# Repo root is the parent of the scripts folder
$Root = Split-Path -Parent $PSScriptRoot
Push-Location $Root
try {
    function Get-Python() {
        $py = Get-Command py -ErrorAction SilentlyContinue
        if ($py) { return 'py' }
        $python = Get-Command python -ErrorAction SilentlyContinue
        if ($python) { return 'python' }
        throw "Python not found. Install Python 3 and ensure 'py' or 'python' is on PATH."
    }

    Write-Host "Starting clean install in $Root" -ForegroundColor Yellow

    if (Test-Path ".\.venv") {
        Write-Host "Removing existing .venv..." -ForegroundColor Yellow
        Remove-Item -Recurse -Force ".\.venv"
    }

    $py = Get-Python

    # Create virtual environment
    if ($py -eq 'py') {
        Write-Host ">> $py -3 -m venv .venv" -ForegroundColor Cyan
        & $py -3 -m venv .venv
    } else {
        Write-Host ">> $py -m venv .venv" -ForegroundColor Cyan
        & $py -m venv .venv
    }

    $venvPython = Join-Path $Root ".venv/Scripts/python.exe"
    if (-not (Test-Path $venvPython)) {
        throw "Virtual environment python not found at $venvPython"
    }

    # Upgrade pip tooling
    Write-Host ">> $venvPython -m pip install -U pip setuptools wheel" -ForegroundColor Cyan
    & $venvPython -m pip install -U pip setuptools wheel

    if ($NoCache) {
    Write-Host ">> $venvPython -m pip cache purge" -ForegroundColor Cyan
    & $venvPython -m pip cache purge
    }

    # Install dependencies
    $pipInstallList = @('-m','pip','install')
    if ($NoCache) { $pipInstallList += '--no-cache-dir' }
    $pipInstallList += @('-r','requirements.txt')
    Write-Host ">> $venvPython $($pipInstallList -join ' ')" -ForegroundColor Cyan
    & $venvPython @pipInstallList

    # Validate
    Write-Host ">> $venvPython -m pip check" -ForegroundColor Cyan
    & $venvPython -m pip check

    if ($RunTests) {
        if (Test-Path (Join-Path $Root 'tests')) {
            Write-Host ">> $venvPython -m pytest -q" -ForegroundColor Cyan
            & $venvPython -m pytest -q
        } else {
            Write-Host "No tests directory found; skipping tests." -ForegroundColor DarkYellow
        }
    }

    Write-Host "Done." -ForegroundColor Green
    Write-Host "Activate the environment with: .\\.venv\\Scripts\\Activate.ps1" -ForegroundColor Green
}
finally {
    Pop-Location
}
