# Start the Angular project
Set-Location .\WebSite
Start-Process npm.cmd -ArgumentList "start"
Set-Location ..

# Start the API
Set-Location .\API
Start-Process dotnet -ArgumentList "watch run"
Set-Location ..