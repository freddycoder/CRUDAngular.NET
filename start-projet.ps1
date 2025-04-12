# Start the Angular project
Set-Location .\SuperHeroNG
Start-Process npm.cmd -ArgumentList "start"
Set-Location ..

# Start the API
Set-Location .\SuperHeroAPI
Start-Process dotnet -ArgumentList "watch run"
Set-Location ..