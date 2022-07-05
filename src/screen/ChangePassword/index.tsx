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
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../modules/user/selectors';
import { changePasswordAPI } from '../../services';
import LoadingOverlay from '../../component/LoadingOverlay';


const PLACEHOLDER_TEXT_COLOR = color.Text;
const INPUT_TEXT_COLOR = color.Text;
const INPUT_BORDER_COLOR = color.borderColor;
const INPUT_FOCUSED_BORDER_COLOR = color.onPrimaryColor;


const ChangePassword = ({ route }: any) => {
    const [currentPassword, setCurrentPassword] = useState<string>()
    const [newPassword, setNewPassword] = useState<string>()
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const navigation = useNavigation()
    const isFocused = useIsFocused();

    const onCheckPassword = async () => {
        if (currentPassword && newPassword && confirmNewPassword) {
            if (newPassword === confirmNewPassword) {
                setLoading(true)
                const response = await changePasswordAPI({
                    current_password: currentPassword,
                    password: newPassword,
                    password_confirmation: confirmNewPassword
                })
                if (response.__typename !== 'ErrorResponse') {
                    Alert.alert("", "Đổi mật khẩu thành công!", [
                        {
                            text: 'OK',
                            onPress: () => navigation.goBack()
                        }
                    ])
                }
                setLoading(false)
            } else {
                Alert.alert("", "Mật khẩu xác nhận không trùng khớp!")
            }
        } else {
            Alert.alert("", "Vui lòng điền đầy đủ các thông tin bên dưới.")
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
                                    placeholder="Nhập mật khẩu hiện tại của bạn"
                                    placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                                    inputTextColor={INPUT_TEXT_COLOR}
                                    value={currentPassword}
                                    onChangeText={(value: any) => setCurrentPassword(value)}
                                    borderColor={INPUT_BORDER_COLOR}
                                    focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                                />
                            </View>
                            <View style={styles.inputGroup}>

                                <UnderlinePasswordInput
                                    returnKeyType="done"
                                    placeholder="Nhập mật khẩu  mới"
                                    placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                                    inputTextColor={INPUT_TEXT_COLOR}
                                    value={newPassword}
                                    onChangeText={(value: any) => setNewPassword(value)}
                                    borderColor={INPUT_BORDER_COLOR}
                                    focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                                />
                            </View>
                            <View style={styles.inputGroup}>

                                <UnderlinePasswordInput
                                    returnKeyType="done"
                                    placeholder="Nhập mật khẩu xác nhận"
                                    placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                                    inputTextColor={INPUT_TEXT_COLOR}
                                    value={confirmNewPassword}
                                    onChangeText={(value: any) => setConfirmNewPassword(value)}
                                    borderColor={INPUT_BORDER_COLOR}
                                    focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                                />
                            </View>

                            <View style={styles.buttonsGroup}>
                                <ButtonNormal
                                    buttonStyle={styles.customButton}
                                    onPress={onCheckPassword}
                                    title={'Xác nhận'.toUpperCase()}
                                />


                            </View>
                            {/* <LinkButton
                                onPress={() => { navigation.navigate('EnterOTP', { typeOTP: 'forgetPassword', phoneNumber: phoneNumber }); }}
                                title="Quên mật khẩu"
                                titleStyle={styles.forgotPasswordText}
                            /> */}

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
export default ChangePassword;