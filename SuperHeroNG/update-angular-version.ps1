Write-Host "A script to update the angular version in the project"

$version = "19"

function Write-Progress {
    param (
        [string]$message,
        [int]$percentComplete = 0
    )
    Write-Host "$message ($percentComplete%)"
}

Write-Host "ng update preview"
ng update

Write-Host "Update the angular version $version"
Write-Progress "Updating Angular cdk" 0
ng update @angular/cdk@$version --force --allow-dirty
Write-Progress "Updating Angular cli" 25
ng update @angular/cli@$version --force --allow-dirty
Write-Progress "Updating Angular core" 50
ng update @angular/core@$version --force --allow-dirty
Write-Progress "Updating Angular material" 75
ng update @angular/material@$version --force --allow-dirty
Write-Progress "Updating Angular coplete" 100