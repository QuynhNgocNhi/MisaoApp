

// import dependencies
import React, { Component } from 'react';
import { ImageBackground, StatusBar, StyleSheet, View, SafeAreaView } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// import components
import Button from '../../component/Button';
import { Logo, Heading6 } from '../../component/Text';
import LinkButton from '../../component/Button/LinkButton';
import UnderlineTextInput from '../../component/InputText';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { RootStackParameterList } from '../../MainNavigator';

// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';

// Welcome Config
const headerImg = require('../../image/HappyFarmerGirl.jpg')


type WelcomeProps = NativeStackScreenProps<RootStackParameterList, "Welcome">

// Welcome
const Welcome: React.FC<WelcomeProps> = ({ phoneNumber }) => {
  const navigationRef = useNavigationContainerRef();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar translucent backgroundColor='transparent' />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.content}>
          <ImageBackground source={headerImg} style={styles.headerImg}>
            <View style={styles.top}>
            </View>
          </ImageBackground>
          <View style={styles.footer}>
            <View style={styles.center}>
              <Logo style={styles.Logo}>Misao</Logo>
            </View>

            <View style={styles.paragraphGroup}>
              <Heading6 style={styles.headingText}>Mua bán và trãi nghiệm sản phẩm cây trồng</Heading6>
              <Heading6 style={styles.headingText}>trên khắp mọi vùng miền tại Việt Nam</Heading6>
            </View>


            <View style={styles.center}>

              <View style={styles.buttonsGroup}>
                <UnderlineTextInput
                  inputContainerStyle={styles.inputContainer}

                  blurOnSubmit={false}
                  keyboardType="phone-pad"
                  placeholder="Số điện thoại"

                />
              </View>

              <View style={styles.buttonsGroup}>
                <Button
                  buttonStyle={styles.customButton}
                  onPress={() => { navigation.navigate('Login'); }}
                  title={'Tiếp tục'.toUpperCase()}
                />
              </View>

              <LinkButton
                onPress={() => { navigation.navigate('Register'); }}
                title="Chưa có tài khoản"
                titleStyle={styles.linkButtonText}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );

};
// Welcome Styles
const styles = StyleSheet.create({
  screenContainer: {
    height: '100%',
    flexDirection: "column",
    backgroundColor: color.black,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  headerImg: {
    height: layout.SCREEN_HEIGHT * 0.6,

  },
  top: {
    flex: 1,

  },
  Logo: {
    paddingTop: 35

  },

  footer: {
    backgroundColor: color.background,
    flex: 1
  },
  paragraphGroup: {
    alignItems: 'center',
  },
  headingText: {
    paddingTop: 15,

  },
  center: {
    alignItems: 'center',

  },
  buttonsGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    paddingTop: 5,

  },
  customButton: {
    width: '80%',
    borderRadius: 5
  },

  linkButtonText: {
    color: color.black,
    textDecorationLine: 'underline',
  },
  inputContainer: {
    width: '80%',
  }
});

export default Welcome;