

// import dependencies
import { useNavigationContainerRef } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

// import components
import { useNavigation } from '@react-navigation/native';
import { RootStackParameterList } from '../../MainNavigator';
import Button from '../../component/Button';
import LinkButton from '../../component/Button/LinkButton';
import UnderlineTextInput from '../../component/InputText';
import { Heading6, Logo } from '../../component/Text';

// import color, layout, style
import LoadingOverlay from '../../component/LoadingOverlay';
import { checkPhoneExistsAPI } from '../../services';
import color from '../../theme/color';

// Welcome Config
const headerImg = require('../../image/HappyFarmerGirl.jpg');

type WelcomeProps = NativeStackScreenProps<RootStackParameterList, 'Welcome'>;

// Welcome
const Welcome: React.FC<WelcomeProps> = () => {
  const navigationRef = useNavigationContainerRef();

  const navigation = useNavigation<any>();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [statusChecked, setStatusChecked] = useState('');
  const data = { phoneNumber: phoneNumber };
  const [loading, setLoading] = useState<boolean>(false);
  const onCheckPhoneExists = async () => {
    if (phoneNumber) {
      setLoading(true);
      const response = await checkPhoneExistsAPI(phoneNumber);
      if (response.__typename !== 'ErrorResponse') {
        navigation.navigate('Login', { phoneNumber: phoneNumber });
      } else {
        Alert.alert('', 'Bạn chưa đăng ký tài khoản với số điện thoại này!', [
          {
            text: 'Hủy',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          {
            text: 'Đăng ký',
            onPress: () =>
              navigation.navigate('EnterPhoneNumber', {
                phoneNumber: phoneNumber
              })
          }
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

      <View style={styles.content}>
        <ImageBackground source={headerImg} style={styles.headerImg}>
          <View style={styles.top}></View>
        </ImageBackground>
        <View style={styles.footer}>
          <View style={styles.center}>
            <Logo style={styles.Logo}>Misao</Logo>
          </View>

          <View style={styles.paragraphGroup}>
            <Heading6 style={styles.headingText}>
              Mua bán và trãi nghiệm sản phẩm cây trồng
            </Heading6>
            <Heading6 style={styles.headingText}>
              trên khắp mọi vùng miền tại Việt Nam
            </Heading6>
          </View>

          <View style={styles.center}>
            <View style={[styles.buttonsGroup, { marginBottom: 5 }]}>
              <UnderlineTextInput
                inputContainerStyle={styles.inputContainer}
                returnKeyType="done"
                blurOnSubmit={true}
                keyboardType="phone-pad"
                placeholder="Số điện thoại"
                onChangeText={(val: any) => setPhoneNumber(val)}
              />
            </View>
            <Text style={styles.statusChecked}>{statusChecked}</Text>

            <View style={styles.buttonsGroup}>
              <Button
                buttonStyle={styles.customButton}
                onPress={onCheckPhoneExists}
                title={'Tiếp tục'.toUpperCase()}
              />
            </View>

            <LinkButton
              onPress={() => {
                navigation.navigate('EnterPhoneNumber');
              }}
              title="Chưa có tài khoản"
              titleStyle={styles.linkButtonText}
            />
          </View>
        </View>
      </View>
      <LoadingOverlay loading={loading} />
    </SafeAreaView>
  );
};
// Welcome Styles
const styles = StyleSheet.create({
  screenContainer: {
    flexDirection: 'column',
    backgroundColor: color.black,
    flex: 1
  },
  contentContainerStyle: {
    // flexGrow: 1
  },
  content: {
    flex: 1
  },
  headerImg: {
    // height: layout.SCREEN_HEIGHT * 0.6
    flex: 1
  },
  top: {
    // flex: 1
  },
  Logo: {
    paddingTop: 35
  },

  footer: {
    backgroundColor: color.background
    // flex: 1
  },
  paragraphGroup: {
    alignItems: 'center'
  },
  headingText: {
    paddingTop: 10
  },
  center: {
    alignItems: 'center'
  },
  buttonsGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    paddingTop: 5
  },
  customButton: {
    width: '80%',
    borderRadius: 5
  },

  linkButtonText: {
    color: color.black,
    textDecorationLine: 'underline'
  },
  inputContainer: {
    width: '80%'
  },
  statusChecked: {
    color: color.important,
    paddingBottom: 10
  }
});

export default Welcome;