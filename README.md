# Zapf-O-Map

## Einrichtung der Entwicklungsumgebung

Zum Einrichten der Entwicklungsumgebung müssen nach dem Klonen der Repository die Node.js-Packages installiert und die Android SDK eingerichtet werden.
Desweitern ist es notwendig die Datei `local.properties` im `android`-Ordner zu erstellen und den MAPS_API_KEY einzutragen.
```pwsh
npm install
```

Anschließend kann das Projek in VS Code mittel dem F5-Hotkey oder über die Debugging-Ansicht gestartet werden.
Andernfalls per CLI mit folgendem Befehl:
```pwsh
npx react-native run-android
```

## Arbeitsverteiling

Die grobe Arbeitsverteilung im Projekt setzt sich wie folgt zusammen:
- Tobias Kapitza: Listenansicht, App-Demo / Bilddoku, Präsentation
- Josias Klaus: Kartenansicht, Einstellungen & Zusammenführen der Komponenten
- Johannes Freund: Tankbuch, Präsentation, Vorstellung


## Libraries

Hier eine (evtl. nicht vollständige Liste der verwendeten Libraries)

- React Native Paper
  - [Repository](https://github.com/callstack/react-native-paper)
  - [Documentation](https://callstack.github.io/react-native-paper/docs)
  - react-native-paper-dates
    - [Repository](https://github.com/web-ridge/react-native-paper-dates)
    - [Documentation](https://web-ridge.github.io/react-native-paper-dates/docs/intro)
  - react-native-paper-dropdown
    - [Repository](https://github.com/fateh999/react-native-paper-dropdown)
    - [Documentation](https://fateh999.github.io/react-native-paper-dropdown/#/README)
- react-native-maps (Kartendarstellung)
  - [Repository](https://github.com/react-native-maps/react-native-maps)
  - [Documentation](https://github.com/react-native-maps/react-native-maps/blob/master/README.md)
- React Native Bottom Sheet
  - [Repository](https://github.com/gorhom/react-native-bottom-sheet)
  - [Documentation](https://gorhom.github.io/react-native-bottom-sheet/)
- React Native Notifications
  - [Repository](https://github.com/wix/react-native-notifications)
  - [Documentation](https://wix.github.io/react-native-notifications/docs/getting-started)
- React Native Async Storage
  - [Repository](https://github.com/react-native-async-storage/async-storage)
  - [Documentation](https://react-native-async-storage.github.io/async-storage/docs/install)
- @react-native-community/slider
  - [Repository](https://github.com/callstack/react-native-slider)
  - [Documentation](https://github.com/callstack/react-native-slider#readme)
- Axios
  - [Repository](https://github.com/axios/axios)
  - [Documentation](https://axios-http.com/docs/intro)