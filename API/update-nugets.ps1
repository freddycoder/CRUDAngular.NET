# Requires: dotnet CLI

# List outdated NuGet packages
Write-Host "Checking for outdated NuGet packages..."
$outdated = dotnet list package --outdated

if ($outdated -match "No packages found") {
    Write-Host "No outdated packages found."
    exit 0
}

Write-Host "`nOutdated packages:"
Write-Host $outdated

# Ask user for confirmation
$confirmation = Read-Host "`nDo you want to update all packages? (y/n)"
if ($confirmation -ne 'y') {
    Write-Host "Update cancelled."
    exit 0
}

# Update all packages in the solution or project
Write-Host "Updating packages..."
nuget update

Write-Host "Packages updated. Run 'dotnet restore' if needed."