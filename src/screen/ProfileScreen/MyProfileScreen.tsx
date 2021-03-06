//to do: onpress change state button

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image, TextInput, ActivityIndicator } from 'react-native';
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


import CustomSwitch from '../../component/CustomSwitch/CustomThreeSwitchUnderLine';
import { useSelector } from 'react-redux';
import { userSelector } from '../../modules/user/selectors';
import { getListOrderAPI } from '../../services';
const ProductDetailScreen = ({ Props, route }) => {
    const navigation = useNavigation();

    const userInfo = useSelector(userSelector)
    const [ProfileTab, setProfileTab] = useState(1);
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState<any>([])
    const onSelectSwitch = value => {
        setProfileTab(value);
    };

    const fetchOrderList = async () => {
        setLoading(true)
        const response = await getListOrderAPI()
        if (response.__typename !== 'ErrorResponse') {
            setOrders(response.data)
        }
        setLoading(false)
    }
    useEffect(() => {
        fetchOrderList()
    }, [])

    if (loading) {
        return (
            <View>
                <ActivityIndicator animating size="large" />
            </View>
        )
    }

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
                                        source={userInfo?.profile_image ? { uri: userInfo?.profile_image_url } : require('../../assets/avatar/11.png')}
                                    />

                                    <View style={styles.followContainer}>

                                        <View style={styles.userAttributes}>

                                            <Heading6>{userInfo?.following?.length}</Heading6>
                                            <Text style={styles.userAttributesText}> ??ang theo</Text>
                                        </View>
                                        <View style={styles.userAttributes}>

                                            <Heading6>{userInfo?.followed?.length}</Heading6>
                                            <Text style={styles.userAttributesText}> ng?????i theo</Text>
                                        </View>

                                    </View>

                                </View>


                            </View>
                            <View style={styles.userContainer}>

                                <View style={[styles.userInfomationContainer]}>

                                    <Text style={styles.userName} numberOfLines={1}>{userInfo?.name}</Text>
                                    <Text style={{ fontSize: 18, }}>{userInfo?.phone}</Text>

                                    <Text style={{ fontSize: 18, color: color.primaryText, }} numberOfLines={1}>{userInfo?.description}</Text>
                                    <Text style={{ position: 'absolute', top: 50, fontSize: 18, color: color.primaryColor, fontWeight: '600', }} numberOfLines={1}>
                                        {(userInfo.address) && (<Icon

                                            name='md-location-outline'
                                            type='ionicon'
                                            color={color.primaryColor}
                                            size={30}
                                        />)
                                        }{userInfo?.address}

                                    </Text>

                                </View>
                                <View style={styles.editProfileButtonContainer}>
                                    <ButtonNormal
                                        outlined
                                        borderColor={color.linkButton}
                                        titleColor={color.linkButton}
                                        onPress={() => { navigation.navigate('EditProfile'); }}
                                        buttonStyle={styles.editProfileButton}
                                        title={'Ch???nh s???a th??ng tin'}>
                                    </ButtonNormal>

                                </View>
                            </View>






                        </View>

                        <View style={styles.switchTabContainer}>
                            <CustomSwitch
                                selectionMode={1}
                                option1="S???n ph???m"
                                option2="Tin Mua"
                                option3="L???ch s???"
                                onSelectSwitch={onSelectSwitch}
                            />

                        </View>
                        {ProfileTab == 1 &&
                            <ProductTab products={userInfo?.product} />}
                        {ProfileTab == 2 &&
                            <PostTab buyRequest={userInfo?.buy_request} />}
                        {ProfileTab == 3 &&
                            <HistoryTab products={userInfo?.product} buyRequest={userInfo?.buy_request} />}
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
    editProfileButtonContainer: {
        justifyContent: 'center',


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
    userAttributesText: {
        fontSize: 18,

    }

});

export default ProductDetailScreen