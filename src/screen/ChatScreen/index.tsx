import React, { useLayoutEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View } from 'react-native'
import ChatRoomScreen from '../ChatRoom'
import { BuyList } from './BuyList'
import { SellList } from './SellList'
import color from '../../theme/color';


const Tab = createMaterialTopTabNavigator()
const ChatScreen = () => {
  const route = useRoute<any>()
  const navigation = useNavigation()
  const [tab, setTab] = useState<any>('purchase')

  useLayoutEffect(() => {
    if (route?.params?.tab) {
      setTab(route?.params?.tab)
      navigation.setOptions({
        initialRouteName: route?.params?.tab
      })
    }

  }, [route?.params?.tab, navigation])

  return (
    // <View>
    //     {tab && (
    <Tab.Navigator
      style={{ marginTop: 20, backgroundColor: color.white }}
      screenOptions={{

        title: 'Mua hàng',
        lazy: true,
      }}
      initialRouteName={'purchase'}
    >
      <Tab.Screen
        name="purchase"
        component={BuyList}
        options={{
          title: "Mua hàng",
        }}
      />
      <Tab.Screen
        name="sale"
        component={SellList}
        options={{
          title: "Bán hàng",
        }} />
    </Tab.Navigator>
    //     )}
    // </View>
  )
}
export default ChatScreen