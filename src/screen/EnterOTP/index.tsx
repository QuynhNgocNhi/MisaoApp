import React, { useState } from 'react';
import { Image, StatusBar, SafeAreaView, Text, View, StyleSheet, Alert } from 'react-native';
import Button from '../../component/Button';
import LinkButton from '../../component/Button/LinkButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import color, layout, style
import color from '../../theme/color';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { sendOtpRegisterAPI, sendOtpResetPasswordAPI } from '../../services';
import LoadingOverlay from '../../component/LoadingOverlay';
// enterOTP Config
const headerImg = require('../../assets/image/receiveMessage.png')
const CELL_COUNT = 6;

const EnterOTP = ({ route }: any) => {
    const [phone, setPhone] = useState<string>(route.params.phoneNumber ?? '')

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState(route.params.OTP ?? '')

    const onCheckOTP = async () => {

        if (value && route.params.typeOTP == "Register" && value === otp) {
            navigation.navigate('Register',
                { phoneNumber: route.params.phoneNumber ?? '', OTP: value })
        }
        else if (value && route.params.typeOTP == "forgetPassword" && value === otp) {
            navigation.navigate('NewPassword', {
                phoneNumber: route.params.phoneNumber ?? '', OTP: value
            })
        }
        else {
            Alert.alert("", "Vui lòng nhập mã OTP được gửi đến bạn!")
        }
    }
    const onSendOTPAgain = async () => {
        setLoading(true)
        if (route.params.typeOTP == "Register") {
            const response: any = await sendOtpRegisterAPI(route.params.phoneNumber);
            if (response.__typename !== 'ErrorResponse') {
                setOtp(response.data.otp)
                Alert.alert("", "Mã OTP đã được gửi đến bạn!")
            }
        } else {
            const response: any = await sendOtpResetPasswordAPI(route.params.phoneNumber);
            if (response.__typename !== 'ErrorResponse') {
                setOtp(response.data.otp)
                Alert.alert("", "Mã OTP đã được gửi đến bạn!")
            }
        }
        setLoading(false)

    }

    return (
        <SafeAreaProvider>

            <SafeAreaView style={styles.screenContainer}>
                {isFocused ? (<StatusBar backgroundColor={color.background} barStyle={'dark-content'} />) : null}
                <View style={styles.container}>

                    <View style={styles.paragraphGroup}>
                        <Heading6 style={[styles.headingText, { paddingTop: 50 }]}>
                            Nhập mã OTP vừa được gửi đến số điện thoại +{route.params.phoneNumber}
                        </Heading6>
                    </View>
                    <View>

                        <Image source={headerImg} style={styles.imageReceiveMessage}>

                        </Image>
                    </View>

                    <View style={styles.enterOTP}>

                        <CodeField
                            ref={ref}
                            {...props}
                            value={value}
                            onChangeText={setValue}
                            cellCount={CELL_COUNT}
                            rootStyle={styles.codeFieldRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({ index, symbol, isFocused }) => (
                                <View
                                    // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                                    onLayout={getCellOnLayoutHandler(index)}
                                    key={index}
                                    style={[styles.cellRoot, isFocused && styles.focusCell]}>
                                    <Text style={styles.cellText}>
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </Text>
                                </View>
                            )}
                        />
                        <Text style={styles.textResendOTP}>Bạn chưa nhận được OTP?
                            <LinkButton
                                titleStyle={styles.buttonResendOTP}
                                onPress={onSendOTPAgain}
                                title={' Gửi Lại OTP!'}
                            >
                            </LinkButton>
                        </Text>
                        <Button
                            buttonStyle={styles.customButton}
                            onPress={onCheckOTP}
                            title={'Tiếp tục'.toUpperCase()}>
                            Xác nhận OTP</Button>

                    </View>

                </View>
                <LoadingOverlay loading={loading} />
            </SafeAreaView>
        </SafeAreaProvider >
    );
};
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: color.background,

    },
    container: {
        flex: 1,
        marginBottom: 200

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
    enterOTP: {
        flex: 1,
        width: '95%',
        alignSelf: 'center',
    },
    textResendOTP: {
        paddingTop: 60,
        alignSelf: 'center',
        fontSize: 18,
        color: color.normalText
    },
    buttonResendOTP: {
        fontSize: 18
    },
    customButton: {
        marginTop: 20,

        width: '80%',
        alignSelf: 'center',
    },
    imageReceiveMessage: {
        width: 200,
        height: 200,
        alignSelf: 'center',
    },

    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: {
        marginTop: 50,
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cellRoot: {
        width: 50,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    cellText: {
        color: '#000',
        fontSize: 36,
        textAlign: 'center',
    },
    focusCell: {
        borderBottomColor: '#FF5656',
        borderBottomWidth: 2,
    },

});
export default EnterOTP;