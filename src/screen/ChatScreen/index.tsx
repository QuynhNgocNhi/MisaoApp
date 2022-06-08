import React, { useLayoutEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, StyleSheet, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image } from 'react-native';

import ChatRoomScreen from '../ChatRoom'
import { BuyList } from './BuyList'
import { SellList } from './SellList'
import color from '../../theme/color';
import CustomSwitch from '../../component/CustomSwitch/CustomThreeSwitch';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const Tab = createMaterialTopTabNavigator()
import { useIsFocused } from '@react-navigation/native';
import { Header } from 'react-native-elements';
import HeaderIconButton from '../../component/HeaderButton';
const BACK_ICON = Platform.OS === 'ios' ? 'ios-chevron-back-outline' : 'md-chevron-back';
const DELETE_ICON = Platform.OS === 'ios' ? 'ios-trash-outline' : 'md-trash-outline';
const ChatScreen = () => {
  const isFocused = useIsFocused();
  const route = useRoute<any>()
  const navigation = useNavigation()
  const [tab, setTab] = useState<any>('purchase')
  console.log(tab);
  useLayoutEffect(() => {
    if (route?.params?.tab) {
      setTab(route?.params?.tab)
      navigation.setOptions({
        initialRouteName: route?.params?.tab
      })
    }

  }, [route?.params?.tab, navigation])
  const [ChatTab, setChatTab] = useState(1);
  const onSelectSwitch = value => {
    setChatTab(value);
  };
  return (
    <SafeAreaProvider>

      <SafeAreaView style={styles.screenContainer}>
        {isFocused ? (<StatusBar backgroundColor={color.primaryColorLight} barStyle={'dark-content'} />) : null}

        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Header

              containerStyle={{ borderBottomWidth: 0, borderBottomColor: color.border, }}
              backgroundColor={color.primaryColorLight}
              centerComponent={
                <Text style={{ fontSize: 18, color: color.primaryText, fontWeight: '500', textTransform: 'uppercase', }}>Trò chuyện</Text>
              }
              leftComponent={
                <HeaderIconButton
                  onPress={() => navigation.goBack()}
                  name={BACK_ICON}
                  color={color.lightBlack}
                />
              }
              rightComponent={
                <HeaderIconButton
                  onPress={() => navigation.goBack()}
                  name={DELETE_ICON}
                  color={color.lightBlack}
                />

              }


            />
          </View>





          <Tab.Navigator
            style={{}}
            screenOptions={{
              title: 'Từ bạn',
              lazy: true,
            }}
            initialRouteName={'purchase'}
          >
            <Tab.Screen
              name="purchase"
              component={BuyList}
              options={{
                title: "Từ bạn",
              }}
            />
            <Tab.Screen
              name="sale"
              component={SellList}
              options={{
                title: "Đến bạn",
              }} />
          </Tab.Navigator>






        </View>

      </SafeAreaView>
    </SafeAreaProvider >
  );

}
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: color.background,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,


  },
  headerContainer: {
    backgroundColor: color.primaryColorLight
  },
  headingText: {
    fontSize: 20,
    textAlign: 'center',

  },
  center: {
    alignItems: 'center',

  },
  middleContainer: {
    alignItems: 'center',
    width: '100%',
    bottom: 20,


  },
  search: {

    width: '100%',
    paddingTop: 20,


  },

  switchButton: {
    padding: 10,
    height: 40,
    width: '30%',
    justifyContent: 'space-between',
    backgroundColor: color.themeBackground,

  },


});

export default ChatScreen