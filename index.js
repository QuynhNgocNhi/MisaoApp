/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
if (Platform.OS !== 'windows' && __DEV__) 
  require('./src/config/reactotron.config');
AppRegistry.registerComponent(appName, () => App);
