//to do: onpress change state button

import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image, TextInput } from 'react-native';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Avatar } from 'react-native-elements';
import ProductTab from './ProductTab';
import PostTab from './PostTab';
import HistoryTab from './HistoryTab';


import { Icon } from 'react-native-elements';

// import components
import ButtonNormal from '../../component/Button';
import { Header } from 'react-native-elements';

// import color, layout, style
import color from '../../theme/color';

import { useNavigation } from '@react-navigation/native';

import ChatTypeScreen from '../ChatScreen/ChatTypeScreen'

import CustomSwitch from '../../component/CustomSwitch/CustomThreeSwitchUnderLine';



const ProductDetailScreen = ({ Props, route }) => {
    const navigation = useNavigation();
    /*     const { data } = route.params;
     */
    const [ProfileTab, setProfileTab] = useState(1);
    const onSelectSwitch = value => {
        setProfileTab(value);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.screenContainer}>
                <StatusBar translucent backgroundColor='transparent' />
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Header
                            containerStyle={{ borderBottomWidth: 0, marginVertical: 10 }}
                            backgroundColor={color.pinkBackgroundLight}

                            leftComponent={
                                <Icon

                                    name='chevron-left-circle'
                                    type='material-community'
                                    color='#FFffff'
                                    size={40}
                                    onPress={() => navigation.goBack()}
                                />
                            }
                        />
                    </View>

                    <View style={styles.container}>
                        <View style={[styles.box,]}>

                            <View style={[styles.userContainer]}>

                                <View style={styles.userNameContainer}>
                                    <Avatar
                                        size="large"
                                        rounded
                                        containerStyle={{
                                            borderColor: 'grey',
                                            borderStyle: 'solid',
                                            borderWidth: 1,
                                        }}

                                        source={require('../../assets/avatar/11.png')}
                                    />

                                    <View style={styles.followContainer}>

                                        <View style={styles.userAttributes}>

                                            <Heading6>4</Heading6>
                                            <Text style={styles.userAttributesText}> đang theo</Text>
                                        </View>
                                        <View style={styles.userAttributes}>

                                            <Heading6>5</Heading6>
                                            <Text style={styles.userAttributesText}> người theo</Text>
                                        </View>

                                    </View>

                                </View>


                            </View>
                            <View style={styles.userContainer}>

                                <View style={[styles.userInfomationContainer]}>

                                    <Text style={styles.userName} numberOfLines={1}>Mén Nguyễn</Text>
                                    <Text style={{ fontSize: 18, }}>@Sockute</Text>

                                    <Text style={{ fontSize: 18, color: color.primaryText, }} numberOfLines={1}>Bán hoài không nghỉ</Text>


                                </View>
                                <View style={styles.followProfileButtonContainer}>

                                    <View style={styles.followButtonContainer}>

                                        <ButtonNormal outlined onPress={() => { navigation.navigate('Login'); }} buttonStyle={styles.followButton} title={'Hóng'}></ButtonNormal>
                                    </View>
                                    <Text style={styles.addressBox} numberOfLines={1}>
                                        <Icon

                                            name='md-location-outline'
                                            type='ionicon'
                                            color={color.black}
                                            size={30}
                                        /> Đà Lạt
                                    </Text>
                                </View>
                            </View>





                        </View>

                        <View style={styles.switchTabContainer}>
                            <CustomSwitch
                                selectionMode={1}
                                option1="Sản phẩm"
                                option2="Tin Mua"
                                option3="Lịch sử"
                                onSelectSwitch={onSelectSwitch}
                            />

                        </View>
                        {ProfileTab == 1 &&
                            <ProductTab />}
                        {ProfileTab == 2 &&
                            <PostTab />}
                        {ProfileTab == 3 &&
                            <HistoryTab />}
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
    },
    container: {
        flex: 1,
    },
    box: {
        width: '90%',
        backgroundColor: color.background,
        alignItems: 'center',
        alignSelf: 'center',
    },
    userContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'


    },
    userNameContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',


    },
    userName: {


        fontWeight: '600',
        color: '#000',
        fontSize: 20
    },
    followProfileButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',

        width: '60%',

    },
    editProfileButton: {
        padding: 10,
        height: 40,
        borderRadius: 20,
        color: '#000',

        /*  backgroundColor: color.white, */

    },


    userInfomationContainer: {

    },
    userInfomationCounters: {
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'

    },

    upSellProduct: {


        backgroundColor: color.background,
    },
    titleText: {

        padding: 10
    },
    customButtonBackToHome: {
        position: 'absolute',
        bottom: 0,
    },
    switchTabContainer: {
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: color.borderColor

    },

    userAttributes: {

        alignItems: 'center',
    },
    followContainer: {
        width: '60%',

        flexDirection: 'row',
        alignItems: 'center',

        justifyContent: 'space-around',
    },
    followButtonContainer: {

    },
    followButton: {
        height: 30,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: color.themeBackground,

    },
    userAttributesText: {
        fontSize: 18,

    },
    addressBox: {
        fontSize: 18,
        color: color.primaryText,

        fontWeight: '600',
        flexDirection: 'column',
        marginTop: 10,
    }

});

export default ProductDetailScreen