# Mobile Development mit React Native

## Node.js & NPM

Für React Native wird Node.js und NPM (Paketmanager) benötigt. NPM ist im Normalfall bei der Installation von Node.js enthalten. Bei der Installation im Kontext von React Native-Entwicklung bietet es sich an die LTS-Version von Node.js zu nehmen. Für das Installieren hiervon gibt es eine Vielzahl an Möglichkeiten, wie z.B. den Installer von der [Node.js Webseite](https://nodejs.org). Falls gewünscht und verfügbar empfiehlt es sich Node.js gleich über einen Paketmanager wie z.B. `winget` zu installieren.

## React Native

Zum Anlegen des React Native-Projekts muss bis auf Node.js und NPM erstmal nichts weiteres Installiert sein. Mittel dem untenstehenden Befehl wird voll-automatisch ein React Native-Projekt erzeugt. Alle dafür benötigten Abhängigkeiten werden automatisch ermittelt, heruntergeladen und installiert.

```pwsh
npx react-native init NameDerApp
```

## Android Setup

Um die frisch erstellte React Native App auch auf Android zum Laufen zu bekommen muss ein Android-SDK, die passenden Build-Tools und die Android Platform-Tools vorhanden sein. Im Idealfall macht man das alles über Android Studio. Sollte das aber nicht funktionieren oder einem die Lösung nicht gefallen gibt es auch einen weg alle benötigten Resourcen in das React Native-Projekt einzubauen.

Mit den untenstehenden Befehlen (PowerShell) werden alle zum benötigten Komponenten herunergeladen und an die passenden Orte verschoben.
Die Befehle werden ganz einfach der Reinfolge nach im Hauptverzeichniss des React Native-Projekts ausgeführt.

```pwsh
# Android Commandline-Tools herunterladen
$ProgressPreference = 'SilentlyContinue'
Invoke-WebRequest -Uri "https://dl.google.com/android/repository/commandlinetools-win-9477386_latest.zip" -OutFile commandlinetools-win_latest.zip

# Commandline-Tools entpacken und .zip Löschen
Expand-Archive .\commandlinetools-win_latest.zip -DestinationPath .\android
Remove-Item -Path commandlinetools-win_latest.zip
Rename-Item -Path .\android\cmdline-tools -NewName sdk

# `sdk.dir` in `local.properties` auf korrekten Pfad setzen
"sdk.dir=$(Resolve-Path .\android\sdk)".replace('\', '\\') | Out-File -FilePath .\android\local.properties -Encoding ascii

# Lizensen aller Android SDK-Komponenten akzeptieren
(1..10 | ForEach-Object {"Yes"; Start-Sleep -Milliseconds 100}) | .\android\sdk\bin\sdkmanager.bat --sdk_root=.\android\sdk --licenses

# Android Platform-Tools installieren und zum Pfad hinzufügen
.\android\sdk\bin\sdkmanager.bat --sdk_root=.\android\sdk "platform-tools"
$env:Path = "$(Resolve-Path .\android\sdk\platform-tools);" + $env:Path
```

Zum starten der App auf einem Android-Gerät oder Emulator muss wird folgender Befehl verwendet.

```pwsh
npx react-native run-android
```

Falls ihr die Android Platform-Tools nicht im Pfad habt, kann es sein, dass `adb` nicht gefunden wird. Falls das der Fall sein sollte, einfach noch einmal den letzten Befehl aus dem Setup ausführen, dieser fügt den Pfad in welchem die Platform-Tools (wie unter anderem `adb`) liegen dem aktuellen Pfad hinzu.

```pwsh
$env:Path = "$(Resolve-Path .\android\sdk\platform-tools);" + $env:Path
```
