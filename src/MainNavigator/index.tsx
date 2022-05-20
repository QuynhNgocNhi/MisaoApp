// import dependencies
import React, { useContext, useEffect, useState } from 'react';
import { StatusBar, View, Platform } from 'react-native';
import Home from '../../src/screen/HomeScreen';
import Login from '../../src/screen/LoginScreen';
import Register from '../../src/screen/RegisterScreen';
import RegisterSuccessful from '../../src/screen/RegisterSuccessfulScreen';
import Welcome from '../../src/screen/Welcome';
import EnterOTP from '../screen/EnterOTP/index';
import EnterPhoneNumber from '../screen/EnterPhoneNumber';
import PostsScreen from '../../src/screen/PostsScreen';
import PostsSaved from '../../src/screen/PostsSaved';
import ProductsSaved from '../../src/screen/ProductsSaved';
import Notification from '../../src/screen/Notification';
import HomeNavigation from '../../src/TabNavigation';
import UserProfileScreen from '../../src/screen/ProfileScreen/UserProfileScreen';
// import Add screen
import AddItem from '../screen/AddScreen';
import ChatRoomScreen from '../screen/ChatRoom';
// import Add Product screen
import AddProduct from '../screen/AddScreen/AddProduct';
import AddPost from '../screen/AddScreen/AddPost';
import AddProductLastStep from '../screen/AddScreen/AddProductLastStep';
import AddPostLastStep from '../screen/AddScreen/AddPostLastStep';
import PostAddedPreview from '../screen/AddScreen/PostAddedPreview';
import ProductAddedPreview from '../screen/AddScreen/ProductAddedPreview';
import ProductDetail from '../screen/ProductDetailScreen';
import PostDetail from '../screen/PostDetailScreen';
import MyProfileScreen from '../screen/ProfileScreen/MyProfileScreen';
import ModalSearch from '../screen/Search';
import PostSearchedByCategory from '../screen/Search/PostSearchedByCategory';
import ProductSearchedByCategory from '../screen/Search/ProductSearchedByCategory';
import HeaderIconButton from '../component/HeaderButton'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// create stack navigator
/* export type StackParameterList = {
  Home: undefined,
}; */
// import color, layout, style
import color from '../theme/color';
import { useDispatch, useSelector } from 'react-redux';
import { tokenSelector } from '../modules/auth/selectors';
import { _setToken } from '../services';
import { getUserInfo } from '../modules/user/slice';
import ChatScreen from '../screen/ChatScreen';
import MyProducts from '../screen/MyProducts';
import MyBuyRequest from '../screen/MyBuyRequest';

// MainNavigatorA Config
const BACK_ICON = Platform.OS === 'ios' ? 'ios-chevron-back-outline' : 'md-chevron-back';
export type RootStackParameterList = {
  HomeNavigation: {
    userName: string;
  };
  SearchModal: any;
  Posts: any;
  PostsSaved: any;
  PostSearchedByCategory: any;
  ProductSearchedByCategory: any;
  ProductsSaved: any;
  Notification: any;
  AddItem: any;
  AddProduct: any;
  AddPost: {
    postId: string;
  };
  AddProductLastStep: {
    productId: string;
  };
  ProductAddedPreview: {
    productId: string;
  };
  AddPostLastStep: {
    productId: string;
  };
  PostAddedPreview: {
    productId: string;
  };
  ProductDetail: {
    productId: string;
  };
  PostDetail: {
    postId: string;

  };

  ChatScreen: any;
  ChatRoomScreen: any;
  ProfileScreen: any;
  UserProfileScreen: {
    userId: string;
  };
  MyProfileScreen: {
    userId: string;
  };
  Welcome: {
    phoneNumber: number;
  };
  EnterPhoneNumber: {
    phoneNumber: number;
  };
  EnterOTP: {
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
  EnterOTPRegister: {};
  MyProducts: {};
  MyBuyRequest: {};
};

const RootStack = createNativeStackNavigator<RootStackParameterList>();

// MainNavigator
const MainNavigator = () => {
  const dispatch = useDispatch()
  const token = useSelector(tokenSelector)
  const [loading, setLoading] = useState<boolean>(true)
  console.log({ token });

  useEffect(() => {
    _setToken(token)
    if (token) {
      dispatch(getUserInfo())
    }
    setLoading(false)

  }, [token])

  if (loading) return null
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={token ? 'HomeNavigation' : 'Welcome'} >
        <RootStack.Group>
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
          <RootStack.Screen name="HomeNavigation" options={{ headerShown: false }} component={HomeNavigation} />
          <RootStack.Screen name="ChatRoomScreen" options={{ headerShown: false }} component={ChatRoomScreen} />
          <RootStack.Screen name="PostSearchedByCategory" options={{ headerShown: false }} component={PostSearchedByCategory} />
          <RootStack.Screen name="ProductSearchedByCategory" options={{ headerShown: false }} component={ProductSearchedByCategory} />
          <RootStack.Screen name="UserProfileScreen" options={{ headerShown: false }} component={UserProfileScreen} />
          <RootStack.Screen name="MyProfileScreen" options={{ headerShown: false }} component={MyProfileScreen} />

          <RootStack.Screen name="ChatScreen" options={{ headerShown: false }} component={ChatScreen} />
          <RootStack.Screen name="AddItem" options={{ headerShown: false }} component={AddItem} />
          <RootStack.Screen name="AddProduct" options={{ headerShown: false }} component={AddProduct} />
          <RootStack.Screen name="AddProductLastStep" options={{ headerShown: false }} component={AddProductLastStep} />
          <RootStack.Screen name="ProductAddedPreview" options={{ headerShown: false }} component={ProductAddedPreview} />
          <RootStack.Screen name="AddPost" options={{ headerShown: false }} component={AddPost} />
          <RootStack.Screen name="AddPostLastStep" options={{ headerShown: false }} component={AddPostLastStep} />
          <RootStack.Screen name="PostAddedPreview" options={{ headerShown: false }} component={PostAddedPreview} />
          <RootStack.Screen name="ProductDetail" options={{ headerShown: false }} component={ProductDetail} />
          <RootStack.Screen name="PostDetail" options={{ headerShown: false }} component={PostDetail} />


          <RootStack.Screen name="EnterPhoneNumber" options={({ navigation }) => ({
            title: 'Nhập số điện thoại',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <HeaderIconButton
                onPress={() => navigation.goBack()}
                name={BACK_ICON}
                color={color.primaryColor}
              />
            ),
          })}
            component={EnterPhoneNumber} />
          <RootStack.Screen name="EnterOTP" options={({ navigation }) => ({
            title: 'Xác nhận OTP',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <HeaderIconButton
                onPress={() => navigation.goBack()}
                name={BACK_ICON}
                color={color.primaryColor}
              />
            ),
          })}
            component={EnterOTP} />
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
          <RootStack.Screen name="MyProducts" options={({ navigation }) => ({
            title: 'Sản phẩm của tôi',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <HeaderIconButton
                onPress={() => navigation.goBack()}
                name={BACK_ICON}
                color={color.primaryColor}
              />
            ),

          })} component={MyProducts} />
          <RootStack.Screen name="MyBuyRequest" options={({ navigation }) => ({
            title: 'Tin mua của tôi',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <HeaderIconButton
                onPress={() => navigation.goBack()}
                name={BACK_ICON}
                color={color.primaryColor}
              />
            ),

          })} component={MyBuyRequest} />
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
        </RootStack.Group>
        <RootStack.Group>
          <RootStack.Screen name="SearchModal" component={ModalSearch} options={{ headerShown: false }} />

        </RootStack.Group>
      </RootStack.Navigator>

    </NavigationContainer>
  );
};

export default MainNavigator;