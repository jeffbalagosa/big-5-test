<#!
.SYNOPSIS
Runs all tests and linting checks before certification.

.DESCRIPTION
- Activates the .venv virtual environment
- Runs all Python tests via pytest
- Runs flake8 linting with project-configured rules
- Runs frontend tests via vitest
- Runs frontend linting via eslint
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

    # Check for Node.js/npm availability
    Write-Host "`nChecking Node.js environment..." -ForegroundColor Cyan
    if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
        Write-Error "npm not found. Please install Node.js to run frontend checks."
        exit 1
    }

    # Set PYTHONPATH to root to ensure modules are findable
    $env:PYTHONPATH = $Root

    $OverallSuccess = $true

    # 1. Run Pytest
    Write-Host "`n>>> Running Python Tests (pytest)..." -ForegroundColor Cyan
    pytest
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Python tests failed!" -ForegroundColor Red
        $OverallSuccess = $false
    } else {
        Write-Host "Python tests passed!" -ForegroundColor Green
    }

    # 2. Run Flake8
    Write-Host "`n>>> Running Python Linting (flake8)..." -ForegroundColor Cyan
    # Rules: --max-line-length=120 --ignore=E501
    flake8 . --max-line-length=120 --ignore=E501 --exclude=.venv,build,dist,node_modules
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Python linting failed!" -ForegroundColor Red
        $OverallSuccess = $false
    } else {
        Write-Host "Python linting passed!" -ForegroundColor Green
    }

    # 3. Run Frontend Tests
    Write-Host "`n>>> Running Frontend Tests (vitest)..." -ForegroundColor Cyan
    npm run test
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Frontend tests failed!" -ForegroundColor Red
        $OverallSuccess = $false
    } else {
        Write-Host "Frontend tests passed!" -ForegroundColor Green
    }

    # 4. Run Frontend Linting
    Write-Host "`n>>> Running Frontend Linting (eslint)..." -ForegroundColor Cyan
    npm run lint
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Frontend linting failed!" -ForegroundColor Red
        $OverallSuccess = $false
    } else {
        Write-Host "Frontend linting passed!" -ForegroundColor Green
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
