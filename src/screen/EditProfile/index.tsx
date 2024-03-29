import React, { useState, useEffect } from 'react';
import { Item, StatusBar, SafeAreaView, Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';

import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';
import ImagePicker from 'react-native-image-crop-picker';

import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
// enterOTP Config
// import components
import ButtonNormal from '../../component/Button';
import { Button } from 'react-native-elements';
import LinkButton from '../../component/Button/LinkButton';
import UnderlineTextInput from '../../component/InputText';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../modules/user/selectors';
import { isFulfilled } from '@reduxjs/toolkit';
import FastImage from 'react-native-fast-image';
import LoadingOverlay from '../../component/LoadingOverlay';
import { updateProfileAPI } from '../../services';
import { getUserInfo } from '../../modules/user/slice';


const PLACEHOLDER_TEXT_COLOR = color.normalText;
const INPUT_TEXT_COLOR = color.Text;
const INPUT_BORDER_COLOR = color.borderColor;
const INPUT_FOCUSED_BORDER_COLOR = color.onPrimaryColor;
const BUTTON_COLOR_AVAILABLE = color.normalButton;
const BUTTON_COLOR_UNAVAILABLE = color.disabledButton;
let BUTTON_COLOR = BUTTON_COLOR_UNAVAILABLE;



const EditProfile = ({ route }: any) => {

    const userInfo = useSelector(userSelector);
    const [phoneNumber, setPhoneNumber] = useState<string>(userInfo?.phone)
    const [address, setAddress] = useState<string>(userInfo?.address ?? "")
    const [birthDate, setBirthDate] = useState<string>(userInfo?.birthDate ?? "")
    const [gender, setGender] = useState<string>(userInfo?.gender ?? "")
    const [identity, setIdentity] = useState<string>(userInfo?.identity_card_number ?? "")
    const [saveAvailableState, setSaveAvailableState] = React.useState(false);
    const [data, setData] = useState(userInfo)
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [image, setImage] = useState(userInfo?.profile_image ? { id: 0, url_full: userInfo?.profile_image_url } : null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    // const handleChange = () => {
    //     if (identity) {

    //         setSaveAvailableState(saveAvailableState => true);
    //     }
    //     else if (address) {
    //         setSaveAvailableState(saveAvailableState => true);

    //     }

    //     else if (birthDate) {
    //         setSaveAvailableState(saveAvailableState => true);

    //     }
    //     else {
    //         setSaveAvailableState(saveAvailableState => false);
    //     }
    // }
    // useEffect(() => {
    //     handleChange();
    // }, [identity, address, birthDate])
    const onUpdateProfile = async () => {
        setLoading(true)
        const response = await updateProfileAPI(data, image)
        if (response.__typename !== 'ErrorResponse') {
            dispatch(getUserInfo())
            Alert.alert("", "Cập nhật thông tin thành công")
        }
        setLoading(false)
    }
    const onPickImage = () => {
        ImagePicker.openPicker({
            mediaType: 'photo',
        }).then(image => {
            setImage({
                id: -1,
                url_full: image.path,
            })
        });
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
                                <TouchableOpacity
                                    onPress={onPickImage}
                                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <FastImage
                                        source={image ? { uri: image.url_full } : require('../../assets/avatar/11.png')}
                                        style={{
                                            width: 120,
                                            height: 120,
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={onPickImage}
                                >
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'black' }}>Chọn ảnh đại diện</Text>
                                </TouchableOpacity>

                                <UnderlineTextInput
                                    inputStyle={styles.enableInputStyle}
                                    returnKeyType="done"
                                    placeholder="Họ và tên của bạn"
                                    placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                                    inputTextColor={INPUT_TEXT_COLOR}
                                    value={data?.name}
                                    onChangeText={(value: any) => setData({ ...data, name: value })}
                                    borderColor={INPUT_BORDER_COLOR}
                                    focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                                />
                                <UnderlineTextInput
                                    editable={false}
                                    inputStyle={styles.disableInputStyle}
                                    placeholder="Số điện thoại của bạn"
                                    placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                                    inputTextColor={INPUT_TEXT_COLOR}
                                    value={phoneNumber}
                                    borderColor={INPUT_BORDER_COLOR}
                                    focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                                />

                                <UnderlineTextInput
                                    inputStyle={styles.enableInputStyle}
                                    returnKeyType="done"
                                    placeholder="Địa chỉ của bạn"
                                    placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                                    inputTextColor={INPUT_TEXT_COLOR}
                                    value={data?.address ?? ''}
                                    onChangeText={(value: any) => setData({ ...data, address: value })}
                                    borderColor={INPUT_BORDER_COLOR}
                                    focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                                />
                                <UnderlineTextInput
                                    inputStyle={styles.enableInputStyle}
                                    returnKeyType="done"
                                    placeholder="Ngày sinh"
                                    placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                                    inputTextColor={INPUT_TEXT_COLOR}
                                    value={data?.birthday ?? ''}
                                    onChangeText={(value: any) => setData({ ...data, birthday: value })}
                                    borderColor={INPUT_BORDER_COLOR}
                                    focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                                />
                                <UnderlineTextInput
                                    inputStyle={styles.enableInputStyle}
                                    returnKeyType="done"
                                    keyboardType='phone-pad'
                                    placeholder="CMND/CCCD"
                                    placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                                    inputTextColor={INPUT_TEXT_COLOR}
                                    value={data?.identity_card_number ?? ''}
                                    onChangeText={(value: any) => setData({ ...data, identity_card_number: value })}
                                    borderColor={INPUT_BORDER_COLOR}
                                    focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                                />
                            </View>

                            <View style={styles.buttonsGroup}>
                                <ButtonNormal
                                    buttonStyle={{
                                        width: '80%',
                                        borderRadius: 5,
                                        backgroundColor: BUTTON_COLOR_AVAILABLE
                                    }}
                                    onPress={onUpdateProfile}
                                    title={'Lưu thông tin'.toUpperCase()}
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
        borderRadius: 5,
        backgroundColor: BUTTON_COLOR_UNAVAILABLE


    },
    enableInputStyle: {
        fontSize: 20,
        color: color.normalText,
    },
    disableInputStyle: {
        fontSize: 20,
        color: color.disabledText,
    },


});
export default EditProfile;