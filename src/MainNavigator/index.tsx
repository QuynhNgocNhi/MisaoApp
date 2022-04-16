// import dependencies

import React, { useContext } from 'react';
import { StatusBar, View, Platform } from 'react-native';
import Home from '../../src/screen/HomeScreen';
import Login from '../../src/screen/LoginScreen';
import Register from '../../src/screen/RegisterScreen';
import RegisterSuccessful from '../../src/screen/RegisterSuccessfulScreen';
import Welcome from '../../src/screen/Welcome';
import PostsScreen from '../../src/screen/PostsScreen';
import PostsSaved from '../../src/screen/PostsSaved';
import ProductsSaved from '../../src/screen/ProductsSaved';
import Notification from '../../src/screen/Notification';
import HomeNavigation from '../../src/TabNavigation';

// import Add screen
import AddItem from '../screen/AddScreen';
// import Add Product screen
import AddProduct from '../screen/AddScreen/AddProduct';
import AddPost from '../screen/AddScreen/AddPost';
import AddProductLastStep from '../screen/AddScreen/AddProductLastStep';
import AddPostLastStep from '../screen/AddScreen/AddPostLastStep';
import ProductDetail from '../screen/ProductDetailScreen';
import PostDetail from '../screen/PostDetailScreen';

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

  Posts;
  PostsSaved;
  ProductsSaved;
  Notification;
  AddItem;
  AddProduct;
  AddProductLastStep: {
    productId: string;
  };
  AddPostLastStep: {
    productId: string;
  };
  ProductDetail: {
    productId: string;
  };
  PostDetail: {
    productId: string;
  };
  AddPost: {
    postId: string;
  };
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
        {/*  <RootStack.Screen name="AddItem" options={({ navigation }) => ({
          title: 'Thêm sản phẩm/ tin mua',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderIconButton
              onPress={() => navigation.goBack()}
              name={BACK_ICON}
              color={color.primaryColor}
            />
          ),

        })} component={AddItem} /> */}
        <RootStack.Screen name="Welcome" options={{ headerShown: false }} component={Welcome} />
        <RootStack.Screen name="HomeNavigation" options={{ headerShown: false }} component={HomeNavigation}
        />
        <RootStack.Screen name="AddItem" options={{ headerShown: false }} component={AddItem} />
        <RootStack.Screen name="AddProduct" options={{ headerShown: false }} component={AddProduct} />
        <RootStack.Screen name="AddPost" options={{ headerShown: false }} component={AddPost} />
        <RootStack.Screen name="AddProductLastStep" options={{ headerShown: false }} component={AddProductLastStep} />
        <RootStack.Screen name="AddPostLastStep" options={{ headerShown: false }} component={AddPostLastStep} />
        <RootStack.Screen name="ProductDetail" options={{ headerShown: false }} component={ProductDetail} />
        <RootStack.Screen name="PostDetail" options={{ headerShown: false }} component={PostDetail} />

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
        {/*         <RootStack.Screen name="HomeNavigation" options={{ headerShown: false }} component={HomeNavigation} />
 */}
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
        <RootStack.Screen name="PostsSaved" options={({ navigation }) => ({
          title: 'Tin đã lưu',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderIconButton
              onPress={() => navigation.goBack()}
              name={BACK_ICON}
              color={color.primaryColor}
            />
          ),

        })} component={PostsSaved} />
        <RootStack.Screen name="ProductsSaved" options={({ navigation }) => ({
          title: 'Yêu thích',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderIconButton
              onPress={() => navigation.goBack()}
              name={BACK_ICON}
              color={color.primaryColor}
            />
          ),

        })} component={ProductsSaved} />
        <RootStack.Screen name="Notification" options={({ navigation }) => ({
          title: 'Thông báo',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderIconButton
              onPress={() => navigation.goBack()}
              name={BACK_ICON}
              color={color.primaryColor}
            />
          ),

        })} component={Notification} />
        <RootStack.Screen name="RegisterSuccessful" options={{ headerShown: false }} component={RegisterSuccessful} />
      </RootStack.Navigator>

    </NavigationContainer>
  );
};

export default MainNavigator;