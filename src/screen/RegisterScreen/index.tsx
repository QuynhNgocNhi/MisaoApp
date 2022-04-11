import React, { Component } from 'react';
import { Dimensions, StatusBar, StyleSheet, View, Text, ImageBackground, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from 'react-navigation-stack';

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


// Register Config
const PLACEHOLDER_TEXT_COLOR = color.Text;
const INPUT_TEXT_COLOR = color.Text;
const INPUT_BORDER_COLOR = color.borderColor;
const INPUT_FOCUSED_BORDER_COLOR = color.onPrimaryColor;

export default class Register extends Component {
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
                <StatusBar barStyle="dark-content" translucent backgroundColor={color.background} />

                <KeyboardAwareScrollView
                    contentContainerStyle={styles.contentContainerStyle}>
                    <View style={styles.content}>
                        <View style={styles.top}>
                            <View style={styles.box}>
                                <Paragraph style={styles.topText}>
                                    Đã đăng ký trước đây
                                </Paragraph>
                                <View style={styles.signIn}>
                                    <LinkButton
                                        onPress={this.navigateTo('HomeNavigator')}
                                        title="Đăng nhập"
                                        titleStyle={styles.signInText}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.footer}>
                            
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
                                    />
                                </View>
                                <View style={styles.inputGroup}>

                                    <UnderlineTextInput
                                        blurOnSubmit={false}
                                        keyboardType="email-address"
                                        placeholder="Số điện thoại của bạn"
                                        placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                                        inputTextColor={INPUT_TEXT_COLOR}
                                        borderColor={INPUT_BORDER_COLOR}
                                        focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                                        inputContainerStyle={styles.inputContainer}
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
                                    />
                                </View>
                                <View style={styles.buttonsGroup}>
                                    <Button
                                        buttonStyle={styles.customButton}
                                        onPress={this.navigateTo('Register')}
                                        title={'Đăng ký'.toUpperCase()}
                                    />
                                </View>
                                <LinkButton
                                    onPress={this.navigateTo('HomeNavigator')}
                                    title="Quay trở lại"
                                    titleStyle={styles.goBackButton}
                                />
                            </View>
                            <View style={styles.vSpacer} />
                            <View style={styles.termBox}>
                                <TouchableWithoutFeedback
                                    onPress={this.navigateTo('TermsConditions')}>
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
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView >
        );
    }
}
//Login styles
const styles = StyleSheet.create({
    screenContainer: {
        height: '100%',
        flexDirection: "column",
        backgroundColor: color.primaryColor,
       
    },
    contentContainerStyle: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        
    },
    top: {
       
    },
    box: {
        paddingTop: 23,
        backgroundColor: color.background,
        height: 80,

        justifyContent: 'flex-end',
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
    footer: {
        
       flex: 1,
        backgroundColor: color.background,
        
    },
    form: {
        paddingHorizontal: layout.LARGE_PADDING,
        alignItems: 'center',
        
        flexDirection:'column',
        justifyContent: "flex-end",
        flex: 1,
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
    buttonContainer: { paddingTop: 23 },
    center: {
        alignItems: 'center',
    },
    termBox: {
        
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
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
    goBackButton: {
        color: color.black,
        textDecorationLine: 'underline',
    },
});

