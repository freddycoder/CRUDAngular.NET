# Start the Angular project
Set-Location .\SuperHeroNG\SuperHero.UI
Start-Process npm -ArgumentList "start"
Set-Location ..\..

# Start the API
Set-Location .\SuperHeroAPI\WebApplication1
Start-Process dotnet -ArgumentList "watch run"
Set-Location ..\..