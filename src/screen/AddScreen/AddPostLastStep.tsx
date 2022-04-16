//to do: onpress change state button

import React, { useState, Component } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

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

import { useNavigation } from '@react-navigation/native';



const AddProductScreen = (Props) => {
    const navigation = useNavigation();

    const [date, setDate] = useState('09-10-2020');

    const stateName = 'Nguyễn Văn A'
    const statePhone = '097773777'
    const stateAddress = '107, ấp 7, xã Ngã Bãy, huyện Châu Thành, tỉnh An Giang'
    const data = { productId: 'Tên tin mua nè' }

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
                    <ScrollView>
                        <View style={styles.container}>



                            <View style={[styles.box, styles.productPriceContainer]}>
                                <View style={styles.tittleContainer}>

                                    <Icon name='bitcoin' size={28} color='#FDBD18' />
                                    <Heading6 style={[styles.headingText, { paddingLeft: 10 }]}>Giá bán</Heading6>
                                </View>
                                <View style={styles.productRequire}>
                                    <Text style={styles.requireName}>Giá bán</Text>

                                    <View style={styles.verticleLine}></View>

                                    <TextInput style={{ fontSize: 18, padding: 10 }}

                                        maxFontSizeMultiplier={1}
                                        placeholder="Nhập giá bán"
                                        placeholderTextColor={'#424242'}

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

                                        maxFontSizeMultiplier={1}
                                        placeholder="Nhập số lượng cần bán"
                                        placeholderTextColor={'#424242'}

                                        // Inherit any props passed to it; e.g., multiline, numberOfLines below
                                        multiline={true}
                                        numberOfLines={1}
                                        editable
                                        maxLength={1000}></TextInput>
                                </View>

                            </View>

                            <View style={[styles.box, styles.productDescriptionAddContainer, { marginTop: 10 }]}>
                                <View style={styles.tittleContainer}>

                                    <Icon name='calendar-month-outline' size={26} color='#5C8700' />
                                    <Heading6 style={[styles.headingText, { paddingLeft: 10 }]}>Ngày hết hàng</Heading6>
                                </View>
                                <View style={styles.productOutOfStockDateContainerContainer}>
                                    {/*  <DateTimePicker
                                      
                                        
                                        mode='date'
                                        display='default'
                                        onChange={date => this.setState({ date })} /> */}
                                </View>

                            </View>
                            <View style={[styles.box, styles.productCategoryAddContainer, { marginTop: 10 }]}>
                                <View style={styles.tittleContainer}>

                                    <Ionicons name='location' size={26} color='#5C8700' />
                                    <Heading6 style={[styles.headingText, { paddingLeft: 10 }]}>Địa chỉ</Heading6>
                                </View>
                                <View style={styles.ownerAddress}>
                                    <View style={styles.addressBox}>

                                        <Text style={{ fontSize: 18 }}>{stateName}</Text>
                                        <Text style={{ fontSize: 18 }}>{statePhone}</Text>
                                        <Text style={{ fontSize: 18 }}>{stateAddress}</Text>
                                    </View>

                                    <View style={styles.verticleLine}></View>
                                    <Text onPress={() => { navigation.navigate('Login'); }} style={{ fontSize: 18, padding: 10, color: color.primaryText }}>Đổi</Text>
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
                                        onPress={() => { navigation.navigate('PostDetail', { data }); }}
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
        width: '80%',
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
        borderRadius: 5,

    },
    addressBox: {
        width: '80%',
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

export default AddProductScreen