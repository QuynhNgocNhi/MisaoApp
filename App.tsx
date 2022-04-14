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

import React, { Component } from 'react';

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
//import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './src/screen/HomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import RegisterSuccessfulScreen from './src/screen/RegisterSuccessfulScreen';
import WelcomeScreen from './src/screen/Welcome';
import Posts from './src/screen/PostsScreen';
import MainNavigator from './src/MainNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider style={backgroundStyle}>
      <StatusBar />

      <MainNavigator />
    </SafeAreaProvider>
  );
};
{/* <RegisterScreen />
<SearchBox />
<LoginScreen/>
<RegisterSuccessfulScreen/>
*/}



export default App; 
