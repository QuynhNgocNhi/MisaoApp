// import dependencies

import React, { useContext } from 'react';
import { StatusBar, View, Platform } from 'react-native';
import Home from '../../src/screen/HomeScreen';
import Login from '../../src/screen/LoginScreen';
import Register from '../../src/screen/RegisterScreen';
import RegisterSuccessful from '../../src/screen/RegisterSuccessfulScreen';
import Welcome from '../../src/screen/Welcome';
import PostsScreen from '../../src/screen/PostsScreen';
import HomeNavigation from '../../src/TabNavigation';
import HeaderIconButton from '../component/HeaderButton'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// create stack navigator
/* export type StackParameterList = {
  Home: undefined,
}; */
// import color, layout, style
import color from '../theme/color';
import layout from '../theme/layout';

// MainNavigatorA Config
const BACK_ICON = Platform.OS === 'ios' ? 'ios-chevron-back-outline' : 'md-chevron-back';
export type RootStackParameterList = {
  HomeNavigation: {
    userName: string;
  };
  Home: {
    productName: string;
  };
  Posts;
  AddPost;
  Chat;
  Profile;
  Welcome: {
    phoneNumber: number;
  };
  Login: {
    phoneNumber: number;
    password: string;
  };
  Register: {
    name: string;
    phoneNumber: number;
    password: string;
  };
  RegisterSuccessful: {

  };


};

const RootStack = createNativeStackNavigator<RootStackParameterList>();


// MainNavigator
const MainNavigator = () => {
  return (
    <NavigationContainer>

      <RootStack.Navigator >
        <RootStack.Screen name="Welcome" options={{ headerShown: false }} component={Welcome} />

        <RootStack.Screen name="Login" options={({ navigation }) => ({
          /* title: 'Edit Profile', */
          headerShown: false,
          headerLeft: () => (
            <HeaderIconButton
              onPress={() => navigation.goBack()}
              name={BACK_ICON}
              color={color.primaryColor}
            />
          ),
        })}
          component={Login} />
        <RootStack.Screen name="Home" options={{ headerShown: false }} component={Home}
        />
        <RootStack.Screen name="HomeNavigation" options={{ headerShown: false }} component={HomeNavigation} />
        <RootStack.Screen name="Posts" options={{ headerShown: false }} component={PostsScreen} />
        <RootStack.Screen name="Register" options={({ navigation }) => ({
          title: 'Đăng ký tài khoản',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderIconButton
              onPress={() => navigation.goBack()}
              name={BACK_ICON}
              color={color.primaryColor}
            />
          ),

        })} component={Register} />
        <RootStack.Screen name="RegisterSuccessful" options={{ headerShown: false }} component={RegisterSuccessful} />
      </RootStack.Navigator>

    </NavigationContainer>
  );
};

export default MainNavigator;