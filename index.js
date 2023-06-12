import {AppRegistry} from 'react-native';
import Main from './App';
import {name as appName} from './app.json';
import {de, registerTranslation} from 'react-native-paper-dates';

AppRegistry.registerComponent(appName, () => Main);
registerTranslation('de', de);
