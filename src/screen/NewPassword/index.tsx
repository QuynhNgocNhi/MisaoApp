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


const PLACEHOLDER_TEXT_COLOR = color.Text;
const INPUT_TEXT_COLOR = color.Text;
const INPUT_BORDER_COLOR = color.borderColor;
const INPUT_FOCUSED_BORDER_COLOR = color.onPrimaryColor;


const NewPassword = ({ route }: any) => {
    const [password, setPassword] = useState<string>()



    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const onChangePassword = async () => {
        if (password) {

            Alert.alert("", password, [

                { text: "Tiếp tục", onPress: () => navigation.navigate('Login') }
            ]);

        }
        else {
            Alert.alert("", "Vui lòng nhập mã OTP được gửi đến bạn!")
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
                                    value={password}
                                    onChangeText={(value: any) => setPassword(value)}
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
                                    value={password}
                                    onChangeText={(value: any) => setPassword(value)}
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