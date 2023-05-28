

// import dependencies
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';

// import components
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RootStackParameterList } from '../../MainNavigator';
import Button from '../../component/Button';
import LinkButton from '../../component/Button/LinkButton';
import UnderlineTextInput from '../../component/InputText';
import { Heading6 } from '../../component/Text';

// import color, layout, style
import LoadingOverlay from '../../component/LoadingOverlay';
import { checkPhoneExistsAPI, sendOtpRegisterAPI } from '../../services';
import color from '../../theme/color';

// Welcome Config
const headerImg = require('../../assets/image/PhoneNumber.png');

type WelcomeProps = NativeStackScreenProps<RootStackParameterList, 'Welcome'>;

// Welcome
const EnterPhoneNumber: React.FC<WelcomeProps> = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const [phoneNumber, setPhoneNumber] = useState(
    route.params?.phoneNumber ?? ''
  );
  const [loading, setLoading] = useState<boolean>(false);
  const onCheckPhoneExists = async () => {
    if (phoneNumber) {
      setLoading(true);
      const response = await checkPhoneExistsAPI(phoneNumber);
      if (response.__typename === 'ErrorResponse') {
        const otpResponse: any = await sendOtpRegisterAPI(phoneNumber);
        if (otpResponse.__typename !== 'ErrorResponse') {
          navigation.navigate('EnterOTP', {
            typeOTP: 'Register',
            phoneNumber: phoneNumber,
            OTP: otpResponse.data.otp
          });
        }
      } else {
        Alert.alert('', 'Bạn đã đăng ký tài khoản với số điện thoại này!', [
          {
            text: 'Ok',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'Đăng nhập', onPress: () => navigation.navigate('Login') }
        ]);
      }

      setLoading(false);
    } else {
      Alert.alert('', 'Vui lòng nhập số điện thoại!');
    }
  };
  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar translucent backgroundColor="transparent" />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.content}>
          <View style={styles.footer}>
            <View style={styles.paragraphGroup}>
              <Heading6 style={[styles.headingText, { paddingTop: 50 }]}>
                Vui lòng nhập số điện thoại của bạn để tạo tài khoản
              </Heading6>
            </View>

            <Image source={headerImg} style={styles.headerImg}></Image>

            <View style={styles.center}>
              <View style={styles.buttonsGroup}>
                <UnderlineTextInput
                  inputContainerStyle={styles.inputContainer}
                  value={phoneNumber}
                  // blurOnSubmit={false}
                  keyboardType="phone-pad"
                  placeholder="Số điện thoại"
                  onChangeText={(val: any) => setPhoneNumber(val)}
                />
              </View>

              <View style={styles.buttonsGroup}>
                <Button
                  buttonStyle={styles.customButton}
                  onPress={onCheckPhoneExists}
                  title={'Tiếp tục'.toUpperCase()}
                />
              </View>

              <LinkButton
                onPress={() => {
                  navigation.navigate('Welcome');
                }}
                title="Đã có tài khoản"
                titleStyle={styles.linkButtonText}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <LoadingOverlay loading={loading} />
    </SafeAreaView>
  );
};
// Welcome Styles
const styles = StyleSheet.create({
    screenContainer: {
        height: '100%',
        flexDirection: "column",
        backgroundColor: color.background,
    },
    contentContainerStyle: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
    },
    headerImg: {
        width: 200,
        height: 200,
        alignSelf: 'center',

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

        alignSelf: 'center',
        width: '90%',

    },
    headingText: {
        paddingTop: 15,
        fontSize: 20,
        textAlign: 'center',
    },
    center: {
        alignItems: 'center',

    },
    buttonsGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        paddingTop: 50,

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

export default EnterPhoneNumber;