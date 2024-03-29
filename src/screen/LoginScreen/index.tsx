
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
// import color
import Icon from '../../component/Icon';
import color from '../../theme/color';
import layout from '../../theme/layout';
// import components
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ButtonNormal from '../../component/Button';
import LinkButton from '../../component/Button/LinkButton';
import UnderlinePasswordInput from '../../component/InputPassword';
import UnderlineTextInput from '../../component/InputText';

import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import LoadingOverlay from '../../component/LoadingOverlay';
import { loadingLoginSelector } from '../../modules/auth/selectors';
import { onlogin } from '../../modules/auth/slice';
import { getMasterData } from '../../modules/search/slice';
import { getUserInfo } from '../../modules/user/slice';
import { sendOtpResetPasswordAPI } from '../../services';
// SignIn Config
const headerImg = require('../../image/LoginHeader.jpg');

const PLACEHOLDER_TEXT_COLOR = color.Text;
const INPUT_TEXT_COLOR = color.Text;
const INPUT_BORDER_COLOR = color.borderColor;
const INPUT_FOCUSED_BORDER_COLOR = color.onPrimaryColor;

const Login = ({ route }: any) => {
  const [phone, setPhone] = useState<string>(route.params?.phoneNumber ?? '');
  const [password, setPassword] = useState<string>();
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const loading = useSelector(loadingLoginSelector);
  const [updating, setUpdating] = useState(false);

  const onClickLogin = () => {
    if (phone && password) {
      dispatch(
        onlogin({
          data: {
            phone: phone,
            password: password
          },
          onSuccess: (response: any) => {
            dispatch(getUserInfo());
            dispatch(getMasterData());
            navigation.replace('HomeNavigation');
          },
          onError: () => {}
        })
      );
    } else {
      Alert.alert('', 'Vui lòng nhập mật khẩu của bạn!');
    }
  };

  const onResetPassword = async () => {
    setUpdating(true);
    const response: any = await sendOtpResetPasswordAPI(phone);
    if (response.__typename !== 'ErrorResponse') {
      navigation.navigate('EnterOTP', {
        typeOTP: 'forgetPassword',
        phoneNumber: route.params.phoneNumber,
        OTP: response.data.otp
      });
    }
    setUpdating(false);
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar translucent backgroundColor="transparent" />

      <View style={styles.top}>
        <View style={styles.box}>
          <ImageBackground
            source={headerImg}
            resizeMode="cover"
            style={styles.image}
          >
            <StatusBar translucent backgroundColor="transparent" />
            <Svg
              height={750}
              width={Dimensions.get('screen').width}
              viewBox="0 0 1440 320"
            >
              <Path
                fill="#ffffff"
                d="M0,64L48,74.7C96,85,192,107,288,101.3C384,96,480,64,576,90.7C672,117,768,203,864,234.7C960,267,1056,245,1152,208C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
            </Svg>
          </ImageBackground>

          <View style={styles.iconContainer}>
            <Button
              type="clear"
              onPress={() => navigation.goBack()}
              icon={
                <Icon
                  name={'md-chevron-back-circle-sharp'}
                  size={42}
                  color={color.white}
                />
              }
            />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.contentContainerStyle}
        >
          <View style={styles.form}>
            {/* <Text style={styles.statusChecked}>{statusChecked}</Text> */}

            <View style={styles.inputGroup}>
              <UnderlineTextInput
                blurOnSubmit={false}
                keyboardType="email-address"
                value={route.params.phoneNumber}
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                inputContainerStyle={styles.inputContainer}
                onChangeText={(val: string) => setPhoneNumber(val)}
              />
            </View>
            <View style={styles.inputGroup}>
              <UnderlinePasswordInput
                returnKeyType="done"
                placeholder="Nhập mật khẩu của bạn"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                value={password}
                onChangeText={(value: any) => setPassword(value)}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                // onChangeText={(val: string) => setPassword(val)}
              />
            </View>
            <View style={styles.buttonsGroup}>
              <ButtonNormal
                buttonStyle={styles.customButton}
                onPress={onClickLogin}
                title={'Đăng nhập'.toUpperCase()}
              />
            </View>
            <LinkButton
              onPress={onResetPassword}
              title="Quên mật khẩu"
              titleStyle={styles.forgotPasswordText}
            />
            <Text>{route.params.paramKey}</Text>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.termBox}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.push('Welcome');
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
      <LoadingOverlay loading={updating} />
    </SafeAreaView>
  );
};

//Login styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'space-between',


  },
  iconContainer: {
    position: "absolute",
    top: 50,
    left: 10,



  },


  top: {
    flex: 1,


  },
  box: {

    backgroundColor: color.background,
    height: 480,

  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },
  footer: {
    backgroundColor: color.background,
    flex: 1
  },
  form: {
    paddingTop: 23,
    paddingHorizontal: layout.LARGE_PADDING,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  buttonsGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    paddingTop: 23,
  },
  customButton: {
    width: '80%',
    borderRadius: 5
  },
  inputGroup: {},
  inputContainer: { marginBottom: 7 },
  buttonContainer: { paddingTop: 23 },
  center: {
    alignItems: 'center',
  },
  termBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  forgotPasswordText: {
    color: color.black,
    textDecorationLine: 'underline',
  },
  statusChecked: {
    color: color.important,
    paddingBottom: 10
  }
});

export default Login;