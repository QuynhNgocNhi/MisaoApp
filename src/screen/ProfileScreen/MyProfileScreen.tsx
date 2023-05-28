//to do: onpress change state button

import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Heading6 } from '../../component/Text';

import { Avatar } from 'react-native-elements';
import HistoryTab from './HistoryTab';
import PostTab from './PostTab';
import ProductTab from './ProductTab';

import { Icon } from 'react-native-elements';

// import components
import { Header } from 'react-native-elements';
import ButtonNormal from '../../component/Button';

// import color, layout, style
import color from '../../theme/color';

import { useNavigation } from '@react-navigation/native';

import { useSelector } from 'react-redux';
import CustomSwitch from '../../component/CustomSwitch/CustomThreeSwitchUnderLine';
import { userSelector } from '../../modules/user/selectors';
import { getListOrderAPI } from '../../services';
const ProductDetailScreen = ({ Props, route }) => {
  const navigation = useNavigation();

  const userInfo = useSelector(userSelector);

  console.log('🚀 -----------------------🚀');
  console.log('🚀 ~ userInfo:', userInfo);
  console.log('🚀 -----------------------🚀');

  const [ProfileTab, setProfileTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any>([]);
  const onSelectSwitch = (value) => {
    setProfileTab(value);
  };

  const fetchOrderList = async () => {
    setLoading(true);
    const response = await getListOrderAPI();
    if (response.__typename !== 'ErrorResponse') {
      setOrders(response.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchOrderList();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Header
              containerStyle={{ borderBottomWidth: 0, marginVertical: 10 }}
              backgroundColor={color.pinkBackgroundLight}
              leftComponent={
                <Icon
                  name="chevron-left-circle"
                  type="material-community"
                  color="#FFffff"
                  size={40}
                  onPress={() => navigation.goBack()}
                />
              }
            />
          </View>

          <View style={styles.container}>
            <View style={[styles.box]}>
              <View style={[styles.r]}>
                <View style={styles.userNameContainer}>
                  <Avatar
                    size="large"
                    rounded
                    containerStyle={{
                      borderColor: 'grey',
                      borderStyle: 'solid',
                      borderWidth: 1
                    }}
                    source={
                      userInfo?.profile_image
                        ? { uri: userInfo?.profile_image_url }
                        : require('../../assets/avatar/11.png')
                    }
                  />

                  <View style={styles.followContainer}>
                    <View style={styles.userAttributes}>
                      <Heading6>{userInfo?.following?.length}</Heading6>
                      <Text style={styles.userAttributesText}> đang theo</Text>
                    </View>
                    <View style={styles.userAttributes}>
                      <Heading6>{userInfo?.followed?.length}</Heading6>
                      <Text style={styles.userAttributesText}> người theo</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between'
                  }}
                >
                  <View style={[styles.userInfomationContainer]}>
                    <Text style={styles.userName} numberOfLines={1}>
                      {userInfo?.name}
                    </Text>
                    <Text style={{ fontSize: 18 }}>{userInfo?.phone}</Text>

                    <Text
                      style={{ fontSize: 18, color: color.primaryText }}
                      numberOfLines={1}
                    >
                      {userInfo?.description}
                    </Text>
                    <Text
                      style={{
                        position: 'absolute',
                        top: 50,
                        fontSize: 18,
                        color: color.primaryColor,
                        fontWeight: '600'
                      }}
                      numberOfLines={1}
                    >
                      {userInfo.address && (
                        <Icon
                          name="md-location-outline"
                          type="ionicon"
                          color={color.primaryColor}
                          size={30}
                        />
                      )}
                      {userInfo?.address}
                    </Text>
                  </View>
                  <View style={styles.editProfileButtonContainer}>
                    <ButtonNormal
                      outlined
                      borderColor={color.linkButton}
                      titleColor={color.linkButton}
                      onPress={() => {
                        navigation.navigate('EditProfile');
                      }}
                      buttonStyle={styles.editProfileButton}
                      title={'Chỉnh sửa thông tin'}
                    />
                  </View>
                  {/*   <View style={styles.editProfileButtonContainer}>
                     <ButtonNormal
                      outlined
                      borderColor={color.linkButton}
                      titleColor={color.linkButton}
                      onPress={() => {
                        navigation.navigate('Login');
                      }}
                      buttonStyle={styles.editProfileButton}
                      title={'Chỉnh sửa thông tin'}
                    /> 
                     <Text
                      style={{
                        fontSize: 18,
                        color: color.primaryText,
                        fontWeight: '600',
                        flexDirection: 'column'
                      }}
                      numberOfLines={1}
                    >
                      <Icon
                        name="md-location-outline"
                        type="ionicon"
                        color={color.black}
                        size={30}
                      />{' '}
                      Đà Lạt
                    </Text> 
                  </View>*/}
                </View>
              </View>
            </View>

            <View style={styles.switchTabContainer}>
              <CustomSwitch
                selectionMode={1}
                option1="Sản phẩm"
                option2="Tin Mua"
                option3="Lịch sử"
                onSelectSwitch={onSelectSwitch}
              />
            </View>
            {/* {ProfileTab == 1 && <ProductTab />}
            {ProfileTab == 2 && <PostTab />}
            {ProfileTab == 3 && <HistoryTab />} */}
            {ProfileTab == 1 && <ProductTab products={userInfo?.product} />}
            {ProfileTab == 2 && <PostTab buyRequest={userInfo?.buy_request} />}
            {ProfileTab == 3 && (
              <HistoryTab
                products={userInfo?.product}
                buyRequest={userInfo?.buy_request}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: color.background
  },
  container: {
    flex: 1
  },
  box: {
    width: '90%',
    backgroundColor: color.background,
    alignItems: 'center',
    alignSelf: 'center'
  },
  r: {
    width: '100%',
    // flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userNameContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userName: {
    fontWeight: '600',
    color: '#000',
    fontSize: 20
  },
  editProfileButtonContainer: {
    justifyContent: 'center'
  },
  editProfileButton: {
    padding: 10,
    height: 40,
    borderRadius: 20,
    color: '#000'

    /*  backgroundColor: color.white, */
  },

  userInfomationContainer: {},
  userInfomationCounters: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  upSellProduct: {
    backgroundColor: color.background
  },
  titleText: {
    padding: 10
  },
  customButtonBackToHome: {
    position: 'absolute',
    bottom: 0
  },
  switchTabContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: color.borderColor,
    marginBottom: 20
  },

  userAttributes: {
    alignItems: 'center'
  },
  followContainer: {
    width: '60%',

    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-around'
  },
  userAttributesText: {
    fontSize: 18
  }
});

export default ProductDetailScreen;
