import React, { Component, useState } from 'react';
import { Dimensions, StatusBar, StyleSheet, View, Text, ImageBackground, TouchableWithoutFeedback, SafeAreaView, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack';

// import color
import color from '../../theme/color';
import layout from '../../theme/layout';

// import components
import Button from '../../component/Button';
import { Paragraph } from '../../component/Text';
import LinkButton from '../../component/Button/LinkButton';
import UnderlineTextInput from '../../component/InputText';
import UnderlinePasswordInput from '../../component/InputPassword';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';

// Register Config
const PLACEHOLDER_TEXT_COLOR = color.Text;
const INPUT_TEXT_COLOR = color.Text;
const INPUT_BORDER_COLOR = color.borderColor;
const INPUT_FOCUSED_BORDER_COLOR = color.onPrimaryColor;
import { register, registerAPI } from '../../services';
import LoadingOverlay from '../../component/LoadingOverlay';

const Register = ({ route }: any) => {
  const [phoneNumber, setPhoneNumber] = useState(route.params.phoneNumber);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const onClickRegister = async () => {
    if (phoneNumber && password && name) {
      if (password === confirmPassword) {
        setLoading(true);
        const data = {
          phone: phoneNumber,
          password: password,
          name: name,
          otp: route?.params?.otp,
          confirm: true
        };

        const response = await registerAPI(data);
        if (response.__typename !== 'ErrorResponse') {
          Alert.alert('', 'Đăng ký tài khoản thành công!', [
            {
              text: 'Tiếp tục',
              onPress: () =>
                navigation.navigate('Login', { phoneNumber: phoneNumber })
            }
          ]);
        }
        setLoading(false);
      } else {
        Alert.alert('', 'Mật khẩu không khớp!');
      }
    } else {
      Alert.alert('', 'Vui lòng nhập đầy đủ thông tin bên dưới!');
    }
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={color.background}
      />

      <View style={styles.top}>
        <View style={styles.box}>
          <Paragraph style={styles.topText}>Đã đăng ký trước đây</Paragraph>
          <View style={styles.signIn}>
            <LinkButton
              onPress={() => {
                navigation.navigate('Login');
              }}
              title="Đăng nhập"
              titleStyle={styles.signInText}
            />
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <KeyboardAwareScrollView style={styles.scroll}>
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <UnderlineTextInput
                blurOnSubmit={false}
                keyboardType="email-address"
                placeholder="Tên của bạn"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                inputContainerStyle={styles.inputContainer}
                value={name}
                onChangeText={(val: any) => setName(val)}
              />
            </View>
            <View style={styles.inputGroup}>
              <UnderlineTextInput
                editable={false}
                blurOnSubmit={false}
                keyboardType="email-address"
                placeholder="Số điện thoại của bạn"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                inputContainerStyle={styles.inputContainer}
                onChangeText={(val: any) => setPhoneNumber(val)}
                value={phoneNumber}
              />
            </View>
            <View style={styles.inputGroup}>
              <UnderlineTextInput
                blurOnSubmit={false}
                keyboardType="email-address"
                placeholder="Nhập mật khẩu của bạn"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                inputContainerStyle={styles.inputContainer}
                value={password}
                onChangeText={(val: any) => setPassword(val)}
              />
            </View>
            <View style={styles.inputGroup}>
              <UnderlinePasswordInput
                returnKeyType="done"
                placeholder="Nhập lại mật khẩu của bạn"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                value={confirmPassword}
                onChangeText={(val: any) => setConfirmPassword(val)}
              />
            </View>
            <View style={styles.buttonsGroup}>
              <Button
                buttonStyle={styles.customButton}
                onPress={onClickRegister}
                /*                                 onPress={() => { navigation.navigate('EnterOTP', { phoneNumber: phoneNumber }); }}
                 */
                title={'Đăng ký'.toUpperCase()}
              />
            </View>
            <LinkButton
              onPress={() => {
                navigation.navigate('Welcome');
              }}
              title="Quay trở lại"
              titleStyle={styles.goBackButton}
            />
          </View>
          {/* <View style={styles.vSpacer} /> */}
        </KeyboardAwareScrollView>
        <View style={styles.termBox}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('TermsConditions');
            }}
          >
            <View style={styles.termAndCondition}>
              <Text style={styles.footerText}>
                Bằng việc đăng nhập/đăng ký, bạn đồng ý với
              </Text>
              <View style={styles.termsContainer}>
                <Text style={[styles.footerText, styles.footerLink]}>
                  Điều khoản & Điều kiện
                </Text>
                <Text style={styles.footerText}> and </Text>
                <Text style={[styles.footerText, styles.footerLink]}>
                  Chính sách bảo mật
                </Text>
                <Text style={styles.footerText}>.</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <LoadingOverlay loading={loading} />
    </SafeAreaView>
  );
}
//Login styles
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'space-between',


    },

    top: {
        flex: 1,

        backgroundColor: color.background,
    },
    scroll: {

    },
    footer: {

        flex: 5,
        backgroundColor: color.white,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    box: {

        /*   backgroundColor: color.background, */
        height: 80,

        justifyContent: 'center',
        paddingRight: 10,

    },
    topText: {
        textAlign: 'right',
        fontWeight: '500',
        color: color.black,
    },
    signIn: {
        alignItems: 'flex-end',
    },
    signInText: {
        color: color.linkText
    },
    form: {
        flex: 1,
        paddingHorizontal: layout.LARGE_PADDING,
        alignItems: 'center',
        flexDirection: 'column',


        backgroundColor: color.white,
    },
    buttonsGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        paddingTop: 40,

    },
    customButton: {
        width: '80%',
        borderRadius: 5
    },
    inputGroup: {},
    inputContainer: { marginBottom: 7 },
    buttonContainer: {

    },
    center: {
        alignItems: 'center',
    },
    termBox: {
        justifyContent: 'center',
        flexDirection: 'row',

        margin: 5
    },
    termAndCondition: {
        alignItems: 'center',
    },
    termsContainer: {
        flexDirection: 'row',
    },
    footerText: {
        fontWeight: '400',
        color: color.black,
    },
    footerLink: {
        fontWeight: '400',
        textDecorationLine: 'underline',
        color: color.linkText,
    },
    vSpacer: {
        height: 25,
    },
    orText: {
        top: -2,
        paddingHorizontal: 8,
        color: PLACEHOLDER_TEXT_COLOR,
    },
    goBackButton: {
        color: color.black,
        textDecorationLine: 'underline',
    },
});

export default Register;