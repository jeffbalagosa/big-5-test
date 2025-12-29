<#!
.SYNOPSIS
Runs all tests and linting checks before certification.

.DESCRIPTION
- Activates the .venv virtual environment
- Runs all tests via pytest
- Runs flake8 linting with project-configured rules
- Reports overall pass/fail status

.EXAMPLE
./scripts/pre-certify.ps1

.NOTES
Works on Windows PowerShell 5.1+ and PowerShell 7+. The script operates relative to the repo root.
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Continue' # Allow script to continue after test/lint failures to report summary

# Repo root is the parent of the scripts folder
$Root = Split-Path -Parent $PSScriptRoot
Push-Location $Root

try {
    $VenvPath = Join-Path $Root ".venv"
    if (-not (Test-Path $VenvPath)) {
        Write-Error "Virtual environment not found at $VenvPath. Please run scripts/clean-install.ps1 first."
        exit 1
    }

    # Activate virtual environment
    $ActivateScript = Join-Path $VenvPath "Scripts\Activate.ps1"
    if (-not (Test-Path $ActivateScript)) {
        Write-Error "Activation script not found at $ActivateScript."
        exit 1
    }

    Write-Host "Activating virtual environment..." -ForegroundColor Cyan
    . $ActivateScript

    # Set PYTHONPATH to root to ensure modules are findable
    $env:PYTHONPATH = $Root

    $OverallSuccess = $true

    # 1. Run Pytest
    Write-Host "`n>>> Running Tests (pytest)..." -ForegroundColor Cyan
    pytest
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Tests failed!" -ForegroundColor Red
        $OverallSuccess = $false
    } else {
        Write-Host "Tests passed!" -ForegroundColor Green
    }

    # 2. Run Flake8
    Write-Host "`n>>> Running Linting (flake8)..." -ForegroundColor Cyan
    # Rules: --max-line-length=120 --ignore=E501
    flake8 . --max-line-length=120 --ignore=E501 --exclude=.venv,build,dist
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Linting failed!" -ForegroundColor Red
        $OverallSuccess = $false
    } else {
        Write-Host "Linting passed!" -ForegroundColor Green
    }

    # Summary
    Write-Host "`n========================================" -ForegroundColor Gray
    if ($OverallSuccess) {
        Write-Host "PRE-CERTIFICATION SUCCESSFUL" -ForegroundColor Green
        exit 0
    } else {
        Write-Host "PRE-CERTIFICATION FAILED" -ForegroundColor Red
        exit 1
    }

} finally {
    Pop-Location
}
