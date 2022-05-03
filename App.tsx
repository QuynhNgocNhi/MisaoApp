/**
 * Alt + shift + A :comment
 * Alt + shift + F :Format
 * Ctrl + L: chọn dòng 
 * Ctrl + Shift + K: xóa dòng
 * Ctrl + Space: gợi ý
 * Alt lên/ xuống
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import SearchBox from './src/component/SearchBox';

import React, { Component, Suspense } from 'react';

import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Dimensions,
  Text,
  View,

} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import MainNavigator from './src/MainNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/redux/configStore';
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null} >
        <Suspense fallback={<View />}>
          <SafeAreaProvider style={backgroundStyle}>
            <MainNavigator />
          </SafeAreaProvider>

        </Suspense>
      </PersistGate>
    </Provider>
  );
};
{/* <RegisterScreen />
<SearchBox />
<LoginScreen/>
<RegisterSuccessfulScreen/>
*/}



export default App; 
