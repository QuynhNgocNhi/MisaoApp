import React, { useState } from 'react';
import { View, StyleSheet, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// import components

import { Header } from 'react-native-elements';
import HeaderIconButton from '../../component/HeaderButton';
import SearchBar from '../../component/SearchBar/SearchBarItem';
const BACK_ICON = Platform.OS === 'ios' ? 'ios-chevron-back-outline' : 'md-chevron-back';
const DELETE_ICON = Platform.OS === 'ios' ? 'ios-trash-outline' : 'md-trash-outline';

// import color, layout, style
import color from '../../theme/color';

//set something when screen is focused(status bar), because it is not rerendered when screen is load
import { useIsFocused } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';

import ChatTypeScreen from './ChatTypeScreen'

import CustomSwitch from '../../component/CustomSwitch/CustomThreeSwitch';

const ChatScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [ChatTab, setChatTab] = useState(1);
  const onSelectSwitch = value => {
    setChatTab(value);
  };


  return (
    <SafeAreaProvider>

      <SafeAreaView style={styles.screenContainer}>
        {isFocused ? (<StatusBar backgroundColor={color.background} barStyle={'dark-content'} />) : null}

        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Header

              containerStyle={{ borderBottomWidth: 0, marginVertical: 10 }}
              backgroundColor={color.white}
              centerComponent={
                <Text style={{ fontSize: 18, color: color.primaryText, fontWeight: '500', textTransform: 'uppercase', paddingTop: 5 }}>Trò chuyện</Text>
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

          <View style={styles.middleContainer} >

            <View style={styles.search} >
              <SearchBar />
            </View>

          </View>
          <View style={styles.switchTabContainer}>
            <CustomSwitch
              selectionMode={1}
              option1="Bán hàng"
              option2="Mua hàng"
              option3="Tất cả"
              onSelectSwitch={onSelectSwitch}
            />

          </View>
          {ChatTab == 1 &&
            <ChatTypeScreen chatTypeId='1' />}
          {ChatTab == 2 &&
            <ChatTypeScreen chatTypeId='2' />}
          {ChatTab == 3 &&
            <ChatTypeScreen chatTypeId='3' />}





        </View>

      </SafeAreaView>
    </SafeAreaProvider >
  );
};
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: color.background,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,


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
  switchTabContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginBottom: 30
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