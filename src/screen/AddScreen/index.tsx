import React, { useRef } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CategoryList from '../../component/CategoryItem';
import PostItem from '../../component/PostItem';
//import data
import category from '../../assets/data/category';
import post from '../../assets/data/post';
// import components
import Button from '../../component/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Header } from 'react-native-elements';
import HeaderIconButton from '../../component/HeaderButton'

import LinkButton from '../../component/Button/LinkButton';
const BACK_ICON = Platform.OS === 'ios' ? 'ios-chevron-back-outline' : 'md-chevron-back';

/* to ignore the warning message: 'VirtualizedLists should never be nested inside plain ScrollViews 
with the same orientation because it can break windowing and other functionality - use another 
VirtualizedList-backed container instead.' */
import LogBox from 'react-native';
// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';
//set something when screen is focused(status bar), because it is not rerendered when screen is load
import { useIsFocused } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';

const AddScreen = () => {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();


  return (
    <SafeAreaProvider>

      <SafeAreaView style={styles.screenContainer}>
        {isFocused ? (<StatusBar backgroundColor={color.background} barStyle={'dark-content'} />) : null}

        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Header
              placement="left"
              containerStyle={{ borderBottomWidth: 0, marginVertical: 10 }}
              backgroundColor={color.white}
              centerComponent={
                <Text style={{ fontSize: 18, color: color.primaryText, fontWeight: '500', textTransform: 'uppercase', paddingTop: 5 }}>????ng s???n ph???m/ Tin mua</Text>
              }
              leftComponent={
                <HeaderIconButton
                  onPress={() => navigation.goBack()}
                  name={BACK_ICON}
                  color={color.lightBlack}
                />
              }


            />
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={require('../../image/symbol.png')} />
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.paragraphGroup}>
              <Heading6 style={[styles.headingText, { paddingTop: 10 }]}>B???n mu???n ????ng g???</Heading6>
              <Text style={[styles.headingText, { paddingTop: 10, color: color.black }]}>B???n c?? th??? <Heading6 style={styles.headingText}>????ng s???n ph???m</Heading6> ??ang c??/s???p c?? l??n ????y ?????
                <Heading6 style={styles.headingText}> t??m ng?????i mua</Heading6>
              </Text>
              <Text style={styles.headingText}>ho???c</Text>
              <Text style={[styles.headingText, { color: color.black }]}>
                B???n c?? th??? <Heading6 style={styles.headingText}>????ng tin c???n mua</Heading6>  n??ng s???n ?????
                <Heading6 style={styles.headingText}> t??m ng?????i b??n</Heading6> </Text>
            </View>
            <View style={styles.buttonsGroup}>
              <Button
                outlined
                buttonStyle={styles.customButton}
                onPress={() => { navigation.navigate('AddProduct'); }}
                title={'????ng b??n s???n ph???m'.toUpperCase()}
              />
              <Button
                outlined
                buttonStyle={styles.customButton}
                onPress={() => { navigation.navigate('AddPost'); }}
                title={'????ng tin mua'.toUpperCase()}
              />
            </View>
          </View>
          <View style={[styles.bottomContainer, { marginBottom: 100 }]}>
            <Text style={styles.tipsText}>M???o: B???n c?? th??? b??n s???n ph???m s???p c?? ????? t??ng c?? h???i ???????c ?????t tr?????c.</Text>
          </View>
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
  contentContainer: {
    flex: 1,
    flexDirection: 'column',



  },
  paragraphGroup: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    flex: 1

  },
  headingText: {
    fontSize: 20,
    textAlign: 'center',

  },
  center: {
    alignItems: 'center',

  },
  imageContainer: {

    alignItems: 'center',

  },
  image: {
    height: 150,
    width: 150,


  },

  buttonsGroup: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',

    marginBottom: 50,
    justifyContent: 'space-evenly'

  },
  customButton: {
    width: '80%',
    borderRadius: 100,

  },
  bottomContainer: {

    width: '80%',
    backgroundColor: '#E0FFD8',
    borderWidth: 1.5,
    borderColor: color.lightBlack,
    borderRadius: 9,
    alignSelf: 'center',

  },
  tipsText: {
    padding: 10,
    fontSize: 18,
    color: color.primaryText
  }

});

export default AddScreen