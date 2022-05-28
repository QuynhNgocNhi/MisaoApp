//to do: onpress change state button
//to do: xem trước khi đăng để có chỉnh sửa gì rồi về trang chủ
import React, { useState, Component } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image, TextInput, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import { Button } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import CategoryList from '../../component/CategoryItem';
//import data
import category from '../../assets/data/category';

// import components
import ButtonNormal from '../../component/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Header } from 'react-native-elements';
import HeaderIconButton from '../../component/HeaderButton'

import LinkButton from '../../component/Button/LinkButton';
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
const AddProductScreen = () => {
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

    const handleConfirm = (date: Date) => {
        setDate(date);
        hideDatePicker();
    };
    const getDate = () => {

        return date !== ''
            ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            : '';
    };
    const onGoToPreview = () => {
        if (product?.inventory_number && product?.unit && product?.price && product?.seller_name && product?.seller_phone && product?.seller_address) {
            let productInfo = {
                ...product,
                out_of_stock_date: date
            }
            navigation.navigate("ProductAddedPreview", { data: productInfo })
        } else {
            Alert.alert("", "Vui lòng điền đầy đủ thông tin của sản phẩm!")
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
                                }>Đăng sản phẩm
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



                            <View style={[styles.box, styles.productPriceContainer]}>
                                <View style={styles.tittleContainer}>

                                    <Icon name='bitcoin' type="material-community" size={28} color='#FDBD18' />
                                    <Heading6 style={[styles.headingText, { paddingLeft: 10 }]}>Giá bán</Heading6>
                                </View>
                                <View style={styles.productRequire}>
                                    <Text style={styles.requireName}>Giá bán</Text>

                                    <View style={styles.verticleLine}></View>

                                    <TextInput style={{ fontSize: 18, padding: 10 }}
                                        value={product?.price}
                                        onChangeText={(value: any) => setProduct({ ...product, price: value })}
                                        maxFontSizeMultiplier={1}
                                        placeholder="Nhập giá bán"
                                        placeholderTextColor={color.normalText}

                                        // Inherit any props passed to it; e.g., multiline, numberOfLines below
                                        multiline={true}
                                        numberOfLines={1}
                                        editable
                                        maxLength={1000}></TextInput>
                                </View>
                                <View style={styles.productRequire}>
                                    <Text style={styles.requireName}>Đơn vị</Text>

                                    <View style={styles.verticleLine}></View>

                                    <TextInput style={{ fontSize: 18, padding: 10 }}
                                        value={product?.unit}
                                        onChangeText={(value: any) => setProduct({ ...product, unit: value })}
                                        maxFontSizeMultiplier={1}
                                        placeholder="Nhập đơn vị (kg, chục, cái)"
                                        placeholderTextColor={'#424242'}

                                        // Inherit any props passed to it; e.g., multiline, numberOfLines below
                                        multiline={true}
                                        numberOfLines={1}
                                        editable
                                        maxLength={1000} ></TextInput>
                                </View>
                                <View style={styles.productRequire}>
                                    <Text style={styles.requireName}>Hiện có</Text>

                                    <View style={styles.verticleLine}></View>

                                    <TextInput style={{ fontSize: 18, padding: 10 }}
                                        value={product?.inventory_number}
                                        onChangeText={(value: any) => setProduct({ ...product, inventory_number: value })}
                                        maxFontSizeMultiplier={1}
                                        placeholder="Nhập số lượng cần bán"
                                        placeholderTextColor={'#424242'}

                                        // Inherit any props passed to it; e.g., multiline, numberOfLines below
                                        multiline={true}
                                        numberOfLines={1}
                                        editable
                                        maxLength={1000}></TextInput>
                                </View>
                                <View style={styles.productRequire}>
                                    <Text style={styles.requireName}>Giảm giá</Text>

                                    <View style={styles.verticleLine}></View>

                                    <TextInput style={{ fontSize: 18, padding: 10 }}
                                        value={product?.discount}
                                        onChangeText={(value: any) => setProduct({ ...product, discount: value })}
                                        maxFontSizeMultiplier={1}
                                        placeholder="5, 10, 15 %"
                                        placeholderTextColor={'#424242'}

                                        // Inherit any props passed to it; e.g., multiline, numberOfLines below
                                        multiline={true}
                                        numberOfLines={1}
                                        editable
                                        maxLength={1000}></TextInput>
                                </View>

                            </View>
                            <View style={[styles.box, styles.productStatusContainer, { marginTop: 10 }]}>
                                <View style={styles.tittleContainer}>

                                    <FontAwesome name='hourglass-half' size={24} color='#5C8700' />
                                    <Heading6 style={[styles.headingText, { paddingLeft: 10 }]}>Tình trạng</Heading6>
                                </View>
                                <ButtonNormal
                                    outlined={product.is_availabel === 0}
                                    buttonStyle={styles.customButton}
                                    onPress={() => setProduct({ ...product, is_availabel: 0 })}
                                    title={'Đang có'.toUpperCase()}
                                />
                                <ButtonNormal
                                    outlined={product.is_availabel === 1}
                                    buttonStyle={styles.customButton}
                                    onPress={() => setProduct({ ...product, is_availabel: 1 })}
                                    title={'Sắp có'.toUpperCase()}
                                />


                            </View>
                            <View style={[styles.box, styles.productDescriptionAddContainer, { marginTop: 10 }]}>
                                <View style={styles.tittleContainer}>
                                    <Icon name='calendar-month-outline' type="material-community" size={26} color='#5C8700' />
                                    <Heading6 style={[styles.headingText, { paddingLeft: 10, paddingRight: 20 }]}>Ngày hết hàng</Heading6>
                                </View>
                                <View style={[styles.productOutOfStockDateContainer, styles.shadowStyle]}>

                                    <Text onPress={showDatePicker} style={{ fontSize: 22, fontWeight: '500', color: 'black' }}>{getDate()}</Text>
                                    <DateTimePickerModal

                                        minimumDate={new Date(1950, 0, 1)}
                                        isVisible={isDatePickerVisible}
                                        mode="date"
                                        onConfirm={handleConfirm}
                                        onCancel={hideDatePicker}
                                        date={date}
                                        onChange={(value: any) => setDate(value)}
                                    />
                                    <Icon

                                        name='date'
                                        type='fontisto'
                                        color={color.important}
                                        size={25}
                                        onPress={showDatePicker}

                                    />

                                </View>

                            </View>
                            <View style={[styles.box, styles.productCategoryAddContainer, { marginTop: 10 }]}>
                                <View style={styles.tittleContainer}>

                                    <Ionicons name='location' size={26} color='#5C8700' />
                                    <Heading6 style={[styles.headingText, { paddingLeft: 10 }]}>Địa chỉ</Heading6>
                                </View>
                                <View style={styles.ownerAddress}>
                                    <View style={styles.addressBox}>
                                        <TextInput
                                            value={product?.seller_name}
                                            placeholder="Tên người bán"
                                            onChangeText={(value: any) => setProduct({ ...product, seller_name: value })}
                                            style={{
                                                fontSize: 18, marginBottom: 5, paddingHorizontal: 5,
                                                borderBottomWidth: 1, borderRadius: 4, borderColor: '#A0BCC2'
                                            }}
                                        />
                                        <TextInput
                                            value={product?.seller_phone}
                                            placeholder="SDT người bán"
                                            onChangeText={(value: any) => setProduct({ ...product, seller_phone: value })}
                                            style={{
                                                fontSize: 18, marginBottom: 5, paddingHorizontal: 5,
                                                borderBottomWidth: 1, borderRadius: 4, borderColor: '#A0BCC2'
                                            }}
                                        />
                                        <TextInput
                                            value={product?.seller_address}
                                            placeholder="Địa chỉ người bán"
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
                            <View style={[styles.contentContainer]}>

                                <View style={styles.buttonsGroup}>
                                    <View style={styles.bottomContainer}>
                                        <Text style={styles.tipsText}>Mẹo: Hãy nhập địa chỉ gửi nông sản của bạn để người mua dễ nhận biết.</Text>
                                    </View>
                                    <ButtonNormal
                                        outlined

                                        buttonStyle={styles.customButtonAdd}
                                        onPress={onGoToPreview}
                                        title={'Đăng sản phẩm'.toUpperCase()}
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
    productOutOfStockDateContainer: {
        width: 100,
    },
    productOutOfStockDateContainer: {
        width: '100%',
        height: 60,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 25,

        marginVertical: 10,

    },
    shadowStyle: {

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    datePickerStyle: {
        width: '80%',
        color: '#FFFFFF',

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
    tagInActive: {
        width: '30%',
        borderRadius: 15,
        height: 40,
        borderColor: '#A0BCC2'
    },
    tagActive: {
        width: '30%',
        borderRadius: 15,
        height: 40,
    },
    customButtonAdd: {
        width: '60%',
        borderRadius: 100,

    }

});

export default AddProductScreen