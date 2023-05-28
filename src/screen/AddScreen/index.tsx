import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Heading6 } from '../../component/Text';
//import data
// import components
import { Header } from 'react-native-elements';
import Button from '../../component/Button';
import HeaderIconButton from '../../component/HeaderButton';

const BACK_ICON =
  Platform.OS === 'ios' ? 'ios-chevron-back-outline' : 'md-chevron-back';

/* to ignore the warning message: 'VirtualizedLists should never be nested inside plain ScrollViews 
with the same orientation because it can break windowing and other functionality - use another 
VirtualizedList-backed container instead.' */
// import color, layout, style
import color from '../../theme/color';
//set something when screen is focused(status bar), because it is not rerendered when screen is load
import { useIsFocused } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';

const AddScreen = () => {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screenContainer}>
        {isFocused ? (
          <StatusBar
            backgroundColor={color.background}
            barStyle={'dark-content'}
          />
        ) : null}

        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Header
              placement="left"
              containerStyle={{ borderBottomWidth: 0, marginVertical: 10 }}
              backgroundColor={color.white}
              centerComponent={
                <Text
                  style={{
                    fontSize: 18,
                    color: color.primaryText,
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    paddingTop: 5
                  }}
                >
                  Đăng sản phẩm/ Tin mua
                </Text>
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
            <Image
              style={styles.image}
              source={require('../../image/symbol.png')}
            />
          </View>
          <Heading6
            style={[{ fontSize: 20, textAlign: 'center', paddingVertical: 20 }]}
          >
            Bạn muốn đăng gì?
          </Heading6>
          <View style={styles.contentContainer}>
            <View style={styles.buttonsGroup}>
              <Button
                outlined
                buttonStyle={styles.customButton}
                onPress={() => {
                  navigation.navigate('AddProduct');
                }}
                title={'Đăng bán sản phẩm'.toUpperCase()}
              />
              <Button
                outlined
                buttonStyle={styles.customButton}
                onPress={() => {
                  navigation.navigate('AddPost');
                }}
                title={'Đăng tin mua'.toUpperCase()}
              />
            </View>
          </View>
          <View style={styles.paragraphGroup}>
            <Text style={[styles.headingText, { color: color.black }]}>
              <Text style={styles.headingText}>Đăng sản phẩm</Text> đang có/sắp
              có để
              <Text style={styles.headingText}> tìm người mua </Text>
            </Text>

            <Text style={[styles.headingText, { color: color.black }]}>
              <Text style={styles.headingText}>Đăng tin cần mua</Text> nông sản
              để
              <Text style={styles.headingText}> tìm người bán</Text>{' '}
            </Text>
          </View>
          <View style={[styles.bottomContainer, { marginBottom: '10%' }]}>
            <Text style={styles.tipsText}>
              Mẹo: Bạn có thể bán sản phẩm sắp có để tăng cơ hội được đặt trước.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: color.background,
    justifyContent: 'space-between'
  },
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  paragraphGroup: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20
  },
  headingText: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 15
  },
  center: {
    alignItems: 'center'
  },
  imageContainer: {
    alignItems: 'center'
  },
  image: {
    height: 150,
    width: 150
  },

  buttonsGroup: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',

    marginBottom: 20,
    justifyContent: 'space-evenly'
  },
  customButton: {
    width: '80%',
    borderRadius: 100
  },
  bottomContainer: {
    width: '80%',
    backgroundColor: '#E0FFD8',
    borderWidth: 1.5,
    borderColor: color.lightBlack,
    borderRadius: 9,
    alignSelf: 'center'
  },
  tipsText: {
    padding: 10,
    fontSize: 18,
    color: color.primaryText
  }
});

export default AddScreen;
