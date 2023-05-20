import AsyncStorage from '@react-native-async-storage/async-storage';
import { assign } from 'lodash';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux as reduxPlugin } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
declare global {
  interface Console {
    tron: typeof Reactotron & {
      log: (...args: unknown[]) => void;
    };
  }
}
Reactotron.clear();
Reactotron.setAsyncStorageHandler &&
  Reactotron.setAsyncStorageHandler(AsyncStorage);

// Config name and network
Reactotron.configure({
  host: '192.168.1.15'

  // port: 9090
});

// Add some more plugins for redux & redux-sag
Reactotron.use(reduxPlugin());
Reactotron.use(sagaPlugin({ except: [''] }));
Reactotron.useReactNative();

// If we're running in DEV mode, then let's connect!
if (__DEV__) {
  Reactotron.connect();
  Reactotron.clear && Reactotron.clear();
}
// console.info = Reactotron.log;
console.log = Reactotron.log;
// console.warn = Reactotron.warn;
// console.error = Reactotron.error;
assign(console, { tron: Reactotron });
export default Reactotron;
