Set-Location -Path ..
$ProgressPreference = 'SilentlyContinue'
Invoke-WebRequest -Uri "https://dl.google.com/android/repository/commandlinetools-win-9477386_latest.zip" -OutFile commandlinetools-win_latest.zip
Expand-Archive .\commandlinetools-win_latest.zip -DestinationPath .\android
Remove-Item -Path commandlinetools-win_latest.zip
Rename-Item -Path .\android\cmdline-tools -NewName sdk
"sdk.dir=$(Resolve-Path .\android\sdk)".replace('\', '\\') | Out-File -FilePath .\android\local.properties -Encoding ascii
(1..10 | ForEach-Object {"Yes"; Start-Sleep -Milliseconds 100}) | .\android\sdk\bin\sdkmanager.bat --sdk_root=.\android\sdk --licenses