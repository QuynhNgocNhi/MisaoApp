

// import dependencies
import React, { Component } from 'react';
import { ImageBackground, StatusBar, StyleSheet, View, SafeAreaView } from 'react-native';

// import components
import Button from '../../component/Button';
import { Logo, Paragraph } from '../../component/Text';
import LinkButton from '../../component/Button/LinkButton';
import UnderlineTextInput from '../../component/InputText';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';


// Welcome Config
const headerImg = require('../../image/HappyFarmerGirl.jpg')

const PLACEHOLDER_TEXT_COLOR = color.onPrimaryColor;
const INPUT_TEXT_COLOR = color.onPrimaryColor;
const INPUT_BORDER_COLOR = color.onPrimaryColor;
const INPUT_FOCUSED_BORDER_COLOR = color.onPrimaryColor;

// Welcome
export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  render() {
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
                <Paragraph style={styles.headingText}>Chúc mừng bạn đã đăng ký tài khoản</Paragraph>
                <Paragraph style={styles.headingText}>thành công!</Paragraph>
              </View>


              <View style={styles.center}>

                <View style={styles.buttonsGroup}>
                  <Button
                    buttonStyle={styles.customButton}
                    onPress={this.navigateTo('SignIn')}
                    title={'Bắt đầu sử dụng'.toUpperCase()}
                  />
                </View>

                <LinkButton
                  onPress={this.navigateTo('HomeNavigator')}
                  title="Hướng dẫn"
                  titleStyle={styles.linkButtonText}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
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
    paddingTop:15,
    paddingBottom:50
  },
  headingText: {
    paddingTop: 15,
    color: color.themeBackground

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