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

import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Text,
  View,
  Button
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
//import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './src/screen/HomeScreen';
 
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App; 
