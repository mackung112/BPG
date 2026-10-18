param(
    [Parameter(Position=0)]
    [string]$Name,
    [ValidateSet("skill", "agent", "workflow")]
    [string]$Type = "skill"
)

$projectRoot = $PSScriptRoot
$vaultDir = Join-Path $projectRoot "_vault"
$targetDir = Join-Path $projectRoot ".agents"

if (-not $Name) {
    Write-Host "=== Vault Resource Puller ===" -ForegroundColor Cyan
    Write-Host "Usage: .\pull-skill.ps1 <Name> [-Type skill|agent|workflow]" -ForegroundColor Yellow
    Write-Host "Examples:"
    Write-Host "  .\pull-skill.ps1 rust-patterns"
    Write-Host "  .\pull-skill.ps1 cpp-reviewer -Type agent"
    Write-Host "  .\pull-skill.ps1 fastapi-review -Type workflow"
    Write-Host ""
    $skillsInVault = (Get-ChildItem -Directory (Join-Path $vaultDir 'skills') -ErrorAction SilentlyContinue).Count
    $agentsInVault = (Get-ChildItem (Join-Path $vaultDir 'agents') -ErrorAction SilentlyContinue).Count
    $workflowsInVault = (Get-ChildItem (Join-Path $vaultDir 'workflows') -ErrorAction SilentlyContinue).Count
    Write-Host "Items in _vault:"
    Write-Host "  - Skills: $skillsInVault"
    Write-Host "  - Agents: $agentsInVault"
    Write-Host "  - Workflows: $workflowsInVault"
    exit 0
}

switch ($Type) {
    "skill" {
        $source = Join-Path $vaultDir "skills\$Name"
        $dest = Join-Path $targetDir "skills\$Name"
    }
    "agent" {
        $file = if ($Name.EndsWith(".md")) { $Name } else { "$Name.md" }
        $source = Join-Path $vaultDir "agents\$file"
        $dest = Join-Path $targetDir "agents\$file"
    }
    "workflow" {
        $file = if ($Name.EndsWith(".md")) { $Name } else { "$Name.md" }
        $source = Join-Path $vaultDir "workflows\$file"
        $dest = Join-Path $targetDir "workflows\$file"
    }
}

if (-not (Test-Path $source)) {
    Write-Host "Error: '$Name' not found in _vault\$Type" -ForegroundColor Red
    Write-Host "Matching candidates:" -ForegroundColor Yellow
    $searchDir = Join-Path $vaultDir "$($Type)s"
    if (Test-Path $searchDir) {
        Get-ChildItem -Path $searchDir | Where-Object { $_.Name -like "*$Name*" } | Select-Object -ExpandProperty Name
    }
    exit 1
}

Copy-Item -Path $source -Destination $dest -Recurse -Force
Write-Host "Success: '$Name' activated into .agents\$Type!" -ForegroundColor Green
