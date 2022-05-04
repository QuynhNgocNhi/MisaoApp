import React, { useRef } from 'react';
import { View, StyleSheet, TextInput, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CategoryList from '../../component/CategoryItem';
import PostItem from '../../component/PostItem';
//import data
import category from '../../assets/data/category';
import post from '../../assets/data/post';
// import components
import Button from '../../component/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Header } from 'react-native-elements';
import HeaderIconButton from '../../component/HeaderButton'
import VirtualKeyboard from 'react-native-virtual-keyboard';

import LinkButton from '../../component/Button/LinkButton';
const BACK_ICON = Platform.OS === 'ios' ? 'ios-chevron-back-outline' : 'md-chevron-back';
import OTPInputView from '@twotalltotems/react-native-otp-input'

/* to ignore the warning message: 'VirtualizedLists should never be nested inside plain ScrollViews 
with the same orientation because it can break windowing and other functionality - use another 
VirtualizedList-backed container instead.' */
import LogBox from 'react-native';
// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';
//set something when screen is focused(status bar), because it is not rerendered when screen is load
import { useIsFocused } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';

const AddScreen = ({ route }) => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const state = {
        text: '',
    };
    const data = route.params.user;



    return (
        <SafeAreaProvider>

            <SafeAreaView style={styles.screenContainer}>
                {isFocused ? (<StatusBar backgroundColor={color.background} barStyle={'dark-content'} />) : null}

                <View style={styles.container}>


                    <View style={styles.contentContainer}>
                        <View style={styles.paragraphGroup}>
                            <Heading6 style={[styles.headingText, { paddingTop: 50 }]}>{data}Nhập mã OTP vừa được gửi đến số điện thoại +84 {route.params.phoneNumber} </Heading6>
                        </View>





                    </View>

                    <View style={styles.enterOTP}>
                        <OTPInputView
                            style={{ width: '80%', height: 200 }}
                            pinCount={4}
                            editable
                            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                            // onCodeChanged = {code => { this.setState({code})}}
                            autoFocusOnLoad={false}
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeFilled={(code) => {
                                console.log(`Code is ${code}, you are good to go!`)
                            }}
                            keyboardType="phone-pad"
                            clearInputs={true}
                        />
                    </View>


                </View>

            </SafeAreaView>
        </SafeAreaProvider >
    );
};
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: color.background,
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,


    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',



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


    buttonsGroup: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

        marginBottom: 50,
        justifyContent: 'space-evenly'

    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: color.linkButton,
    },

    underlineStyleBase: {
        width: 40,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        color: color.normalText,
        borderColor: color.borderColor,

        fontSize: 20
    },

    underlineStyleHighLighted: {

        borderColor: color.primaryLightColor,

    },
    enterOTP: {
        flex: 1,
        alignItems: 'center',

    }


});

export default AddScreen