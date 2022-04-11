// import dependencies

import React, { useContext } from 'react';
import { StatusBar, View, Platform } from 'react-native';
import Home from '../../src/screen/HomeScreen';
import Login from '../../src/screen/LoginScreen';
import Register from '../../src/screen/RegisterScreen';
import RegisterSuccessful from '../../src/screen/RegisterSuccessfulScreen';
import Welcome from '../../src/screen/Welcome';



import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// create stack navigator
/* export type StackParameterList = {
  Home: undefined,
}; */
export type RootStackParameterList = {
Home: {
  productName: string;
};
Posts;
AddPost;
Chat;
Profile;
Welcome:{
  phoneNumber: number;
};
Login:{ 
  phoneNumber: number;
  password: string;
};
Register:{
  name: string;
  phoneNumber: number;
  password: string;
};
RegisterSuccessful:{

};

};

const RootStack = createNativeStackNavigator<RootStackParameterList>();


// MainNavigator
const MainNavigator = () => {
  return (
    <NavigationContainer>
      
        <RootStack.Navigator >
          <RootStack.Screen name= "Home" options={{headerShown: false}}  component= {Home}/>
          <RootStack.Screen name= "Welcome" options={{headerShown: false}} component= {Welcome}/>
          <RootStack.Screen name= "Register" options={{headerShown: false}}  component= {Register}/>
          <RootStack.Screen name= "Login" options={{headerShown: false}}  component= {Login}/>
          <RootStack.Screen name= "RegisterSuccessful" options={{headerShown: false}}  component= {RegisterSuccessful}/>
        </RootStack.Navigator>
      
    </NavigationContainer>
  );
};

export default MainNavigator;