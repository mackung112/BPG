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
    Write-Host "=== Vault Resource Stasher ===" -ForegroundColor Cyan
    Write-Host "Usage: .\stash-skill.ps1 <Name> [-Type skill|agent|workflow]" -ForegroundColor Yellow
    Write-Host "Examples:"
    Write-Host "  .\stash-skill.ps1 rust-patterns"
    exit 0
}

switch ($Type) {
    "skill" {
        $source = Join-Path $targetDir "skills\$Name"
        $dest = Join-Path $vaultDir "skills\$Name"
    }
    "agent" {
        $file = if ($Name.EndsWith(".md")) { $Name } else { "$Name.md" }
        $source = Join-Path $targetDir "agents\$file"
        $dest = Join-Path $vaultDir "agents\$file"
    }
    "workflow" {
        $file = if ($Name.EndsWith(".md")) { $Name } else { "$Name.md" }
        $source = Join-Path $targetDir "workflows\$file"
        $dest = Join-Path $vaultDir "workflows\$file"
    }
}

if (-not (Test-Path $source)) {
    Write-Host "Error: '$Name' not found in active .agents\$Type" -ForegroundColor Red
    exit 1
}

Move-Item -Path $source -Destination $dest -Force
Write-Host "Success: '$Name' moved back to _vault\$Type!" -ForegroundColor Green
