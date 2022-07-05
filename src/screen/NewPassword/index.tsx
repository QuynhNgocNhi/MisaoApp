import React, { useState } from 'react';
import { Image, StatusBar, SafeAreaView, Text, View, StyleSheet, Alert } from 'react-native';

import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';


import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
// enterOTP Config
// import components
import ButtonNormal from '../../component/Button';
import { Button } from 'react-native-elements';
import LinkButton from '../../component/Button/LinkButton';
import UnderlinePasswordInput from '../../component/InputPassword';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { resetPasswordAPI } from '../../services';
import LoadingOverlay from '../../component/LoadingOverlay';


const PLACEHOLDER_TEXT_COLOR = color.Text;
const INPUT_TEXT_COLOR = color.Text;
const INPUT_BORDER_COLOR = color.borderColor;
const INPUT_FOCUSED_BORDER_COLOR = color.onPrimaryColor;


const NewPassword = ({ route }: any) => {
    const [password1, setPassword1] = useState<string>()
    const [password2, setPassword2] = useState<string>()

    const [loading, setLoading] = useState(false)

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const onChangePassword = async () => {
        if (password1 && password2 && password1 === password2) {
            setLoading(true)
            const response = await resetPasswordAPI(route.params.phoneNumber, password1, route.params.OTP)
            if (response.__typename !== 'ErrorResponse') {
                Alert.alert("", "Đổi mật khẩu thành công!", [
                    {
                        text: "Tiếp tục", onPress: () => navigation.navigate('Login', {
                            phoneNumber: route.params.phoneNumber ?? ''
                        })
                    }
                ]);
            }
            setLoading(false)
        }
        else if (password1 && !password2) {
            Alert.alert("", "Vui lòng nhập 2 lần mật khẩu mới của bạn!")

        }
        else if (password2 && !password1) {
            Alert.alert("", "Vui lòng nhập 2 lần mật khẩu mới của bạn!")

        }
        else {
            Alert.alert("", "Vui lòng nhập mật khẩu trùng khớp!")
        }
    }

    return (
        <SafeAreaProvider>

            <SafeAreaView style={styles.screenContainer}>
                {isFocused ? (<StatusBar backgroundColor={color.background} barStyle={'dark-content'} />) : null}
                <View style={styles.container}>
                    <KeyboardAwareScrollView
                        contentContainerStyle={styles.contentContainerStyle}>
                        <View style={styles.form}>
                            <View style={styles.inputGroup}>
                                <UnderlinePasswordInput
                                    returnKeyType="done"
                                    placeholder="Nhập mật khẩu mới của bạn"
                                    placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                                    inputTextColor={INPUT_TEXT_COLOR}
                                    value={password1}
                                    onChangeText={(value: any) => setPassword1(value)}
                                    borderColor={INPUT_BORDER_COLOR}
                                    focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <UnderlinePasswordInput
                                    returnKeyType="done"
                                    placeholder="Nhập lại mật khẩu mới của bạn"
                                    placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                                    inputTextColor={INPUT_TEXT_COLOR}
                                    value={password2}
                                    onChangeText={(value: any) => setPassword2(value)}
                                    borderColor={INPUT_BORDER_COLOR}
                                    focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                                />
                            </View>
                            <View style={styles.buttonsGroup}>
                                <ButtonNormal
                                    buttonStyle={styles.customButton}
                                    onPress={onChangePassword}
                                    title={'Đổi mật khẩu'.toUpperCase()}
                                />
                            </View>

                        </View>
                    </KeyboardAwareScrollView>
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

    },
    form: {
        paddingTop: 56,
        paddingHorizontal: layout.LARGE_PADDING,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    buttonsGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        paddingTop: 56,
    },
    customButton: {
        width: '80%',
        borderRadius: 5
    },


});
export default NewPassword;