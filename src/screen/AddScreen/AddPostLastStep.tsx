//to do: onpress change state button

import React, { useState, Component } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image, TextInput, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import components
import { Button } from 'react-native-elements';
import ButtonNormal from '../../component/Button';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Header } from 'react-native-elements';
import HeaderIconButton from '../../component/HeaderButton'
import DateTimePickerModal from "react-native-modal-datetime-picker";

const BACK_ICON = Platform.OS === 'ios' ? 'ios-chevron-back-outline' : 'md-chevron-back';

// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';


import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { userSelector } from '../../modules/user/selectors';
type RouteParams = {
    data: any
}


const AddPostLastStep = (Props) => {
    const navigation = useNavigation<any>();
    const { params } = useRoute<RouteProp<Record<string, RouteParams>, string>>();
    const userInfo = useSelector(userSelector)

    const [date, setDate] = useState(new Date());
    const [product, setProduct] = useState<any>({
        ...params?.data,
        seller_name: userInfo?.name,
        seller_phone: userInfo?.phone,
        seller_address: userInfo?.address,
        is_availabel: 0
    })



    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date);
        hideDatePicker();

    };
    const getDate = () => {

        return date !== ''
            ? `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
            : '';
    };
    const onGoToPreview = () => {
        if (product?.seller_name && product?.seller_phone && product?.seller_address) {
            let productInfo = {
                ...product,
                out_of_stock_date: date
            }
            navigation.navigate("PostAddedPreview", { data: productInfo })
        } else {
            Alert.alert("", "Vui lòng điền đầy đủ thông tin của tin mua!")
        }
    }



    return (
        <SafeAreaProvider>

            <SafeAreaView style={styles.screenContainer}>
                <StatusBar translucent backgroundColor='transparent' />

                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Header
                            containerStyle={{ borderBottomWidth: 0, marginVertical: 10 }}
                            backgroundColor={color.white}
                            centerComponent={
                                <Text style={
                                    { fontSize: 18, color: color.primaryText, fontWeight: '500', textTransform: 'uppercase', paddingTop: 5 }
                                }>Đăng tin mua
                                </Text>
                            }
                            leftComponent={
                                <HeaderIconButton
                                    onPress={() => navigation.goBack()}
                                    name={BACK_ICON}
                                    color={color.lightBlack}
                                />
                            }


                        />
                    </View>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.container}>


                            <View style={[styles.box, styles.productDescriptionAddContainer]}>
                                <View style={styles.tittleContainer}>
                                    <Icon name='calendar-month-outline' size={26} color='#5C8700' />
                                    <Heading6 style={[styles.headingText, { paddingLeft: 10, paddingRight: 20 }]}>Ngày hết mua</Heading6>
                                </View>
                                <View style={[styles.tittleContainer, { width: '100%', justifyContent: 'space-between', alignItems: 'center', }]}>

                                    <ButtonNormal outlined buttonStyle={styles.datePickerStyle} title="Chọn ngày" onPress={showDatePicker} />
                                    <TextInput
                                        style={{ fontSize: 20, padding: 10, borderBottomWidth: 1, borderColor: color.borderColor, }}
                                        value={getDate()}
                                        placeholder="Date..."
                                    />
                                </View>
                                <View style={styles.productOutOfStockDateContainer}>
                                    <DateTimePickerModal


                                        minimumDate={new Date()}
                                        isVisible={isDatePickerVisible}
                                        mode="date"
                                        onConfirm={handleConfirm}
                                        onCancel={hideDatePicker}
                                        onChange={(value: any) => setDate(value)}
                                        date={date}
                                    />

                                </View>

                            </View>
                            <View style={[styles.box, styles.productCategoryAddContainer, { marginTop: 10, flexGrow: 1 }]}>
                                <View style={styles.tittleContainer}>

                                    <Ionicons name='location' size={26} color='#5C8700' />
                                    <Heading6 style={[styles.headingText, { paddingLeft: 10 }]}>Địa chỉ</Heading6>
                                </View>
                                <View style={styles.ownerAddress}>
                                    <View style={styles.addressBox}>
                                        <TextInput
                                            value={product?.seller_name}
                                            placeholder="Tên người mua"
                                            onChangeText={(value: any) => setProduct({ ...product, seller_name: value })}
                                            style={{

                                                fontSize: 18, marginBottom: 5, paddingHorizontal: 5,
                                                borderBottomWidth: 1, borderRadius: 4, borderColor: '#A0BCC2'
                                            }}
                                        />
                                        <TextInput
                                            value={product?.seller_phone}
                                            placeholder="SDT người mua"
                                            onChangeText={(value: any) => setProduct({ ...product, seller_phone: value })}
                                            style={{
                                                fontSize: 18, marginBottom: 5, paddingHorizontal: 5,
                                                borderBottomWidth: 1, borderRadius: 4, borderColor: '#A0BCC2'
                                            }}
                                        />
                                        <TextInput
                                            value={product?.seller_address}
                                            placeholder="Địa chỉ người mua"
                                            onChangeText={(value: any) => setProduct({ ...product, seller_address: value })}
                                            style={{
                                                fontSize: 18, marginBottom: 5, paddingHorizontal: 5,
                                                borderBottomWidth: 1, borderRadius: 4, borderColor: '#A0BCC2'
                                            }}
                                        />
                                    </View>

                                    {/* <View style={styles.verticleLine}></View> */}
                                    {/* <Text onPress={() => { navigation.navigate('Login'); }} style={{ fontSize: 18, padding: 10, color: color.primaryText }}>Đổi</Text> */}
                                </View>

                            </View>
                            <View style={styles.contentContainer}>

                                <View style={styles.buttonsGroup}>
                                    <View style={styles.bottomContainer}>
                                        <Text style={styles.tipsText}>Lưu ý: Địa chỉ của bạn sẽ xuất hiện trong bài đăng.</Text>
                                    </View>
                                    <ButtonNormal
                                        outlined

                                        buttonStyle={styles.customButtonAdd}
                                        onPress={onGoToPreview}
                                        title={'Đăng tin mua'.toUpperCase()}
                                    />

                                </View>
                            </View>
                        </View>
                    </ScrollView>


                </View>

            </SafeAreaView>
        </SafeAreaProvider >
    );
};
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: color.underBackground,
    },
    container: {
        flex: 1,
    },
    box: {
        padding: 20,
        backgroundColor: color.background,
    },

    tittleContainer: {
        flexDirection: 'row',
        paddingBottom: 5
    },
    productRequire: {


        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: color.borderColor,
        paddingLeft: 10,
        marginTop: 10,
        borderRadius: 5,


    },
    requireName: {
        fontSize: 20,
        width: '25%',
        color: color.primaryText
    },
    verticleLine: {

        height: '80%',
        width: 1,
        backgroundColor: '#909090',
    },
    productStatusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    productOutOfStockDateContainerContainer: {
        width: 100,
    },

    datePickerStyle: {
        width: '40%',

        backgroundColor: color.primaryColorLight,
    },
    productNameAddBox: {
        alignItems: 'center',


        width: '90%',
        alignSelf: 'center',
        borderWidth: 1.5,
        borderColor: color.borderColor,
    },

    ownerAddress: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: color.borderColor,
        padding: 10,
        marginTop: 10,


    },
    addressBox: {
        width: '100%',
    },
    bottomContainer: {

        marginBottom: 30,
        width: '80%',
        backgroundColor: '#E0FFD8',
        borderWidth: 1.5,
        borderColor: color.lightBlack,
        borderRadius: 9,
        alignSelf: 'center',

    },
    tipsText: {
        padding: 10,
        fontSize: 18,
        color: color.primaryText
    },

    headingText: {
        fontSize: 20,
        textAlign: 'left',

    },
    center: {
        alignItems: 'center',

    },
    imageContainer: {

        alignItems: 'center',

    },
    image: {
        height: 150,
        width: 150,


    },

    buttonsGroup: {
        flexGrow: 1,
        backgroundColor: color.background,
        alignItems: 'center',

        paddingBottom: 20,





    },
    customButton: {
        width: '30%',
        borderRadius: 15,
        height: 40

    },
    customButtonAdd: {
        width: '60%',
        borderRadius: 100,

    }

});

export default AddPostLastStep