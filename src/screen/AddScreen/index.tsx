import React, { useRef } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CategoryList from '../../component/CategoryList';
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

import { useNavigation } from '@react-navigation/native';

const AddScreen = () => {
  const navigation = useNavigation();


  return (
    <SafeAreaProvider>

      <SafeAreaView style={styles.screenContainer}>
        <StatusBar translucent backgroundColor='transparent' />

        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Header
              placement="left"
              containerStyle={{ borderBottomWidth: 0, marginVertical: 10 }}
              backgroundColor={color.white}
              centerComponent={
                <Text style={{ fontSize: 18, color: color.primaryText, fontWeight: '500', textTransform: 'uppercase', paddingTop: 5 }}>Đăng sản phẩm/ Tin mua</Text>
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
              <Heading6 style={[styles.headingText, { paddingTop: 10 }]}>Bạn muốn đăng gì?</Heading6>
              <Text style={[styles.headingText, { paddingTop: 10, color: color.black }]}>Bạn có thể <Heading6 style={styles.headingText}>đăng sản phẩm</Heading6> đang có/sắp có lên đây để
                <Heading6 style={styles.headingText}> tìm người mua</Heading6>
              </Text>
              <Text style={styles.headingText}>hoặc</Text>
              <Text style={[styles.headingText, { color: color.black }]}>
                Bạn có thể <Heading6 style={styles.headingText}>đăng tin cần mua</Heading6>  nông sản để
                <Heading6 style={styles.headingText}> tìm người bán</Heading6> </Text>
            </View>
            <View style={styles.buttonsGroup}>
              <Button
                outlined
                buttonStyle={styles.customButton}
                onPress={() => { navigation.navigate('AddProduct'); }}
                title={'Đăng bán sản phẩm'.toUpperCase()}
              />
              <Button
                outlined
                buttonStyle={styles.customButton}
                onPress={() => { navigation.navigate('Login'); }}
                title={'Đăng tin mua'.toUpperCase()}
              />
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.tipsText}>Mẹo: Bạn có thể bán sản phẩm sắp có để tăng cơ hội được đặt trước.</Text>
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