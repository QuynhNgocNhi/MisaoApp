import React, { useRef } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeHeader from '../../component/AnimatedHeader';
import CategoryItem from '../../component/CategoryItem';
import PostItem from '../../component/PostItem';
import { Avatar } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';
//import data
import category from '../../assets/data/category';
import post from '../../assets/data/post';

import LinkButton from '../../component/Button/LinkButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

/* to ignore the warning message: 'VirtualizedLists should never be nested inside plain ScrollViews 
with the same orientation because it can break windowing and other functionality - use another 
VirtualizedList-backed container instead.' */
import LogBox from 'react-native';
// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';
//set something when screen is focused(status bar), because it is not rerendered when screen is load
import { useIsFocused } from '@react-navigation/native';
import ButtonNormal from '../../component/Button';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const data = { name: 'Sóc kute', userName: 'pizza03' }

    return (
        <SafeAreaProvider>

            <SafeAreaView style={styles.screenContainer}>
                {isFocused ? (<StatusBar backgroundColor={color.background} barStyle={'dark-content'} />) : null}

                <View style={styles.container}>
                    <View style={[styles.box, styles.profileOpenContainer]}>

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
                                <View style={{ alignItems: 'center' }}>

                                    <Text style={styles.userName} numberOfLines={1}>Nguyễn lỵ</Text>
                                    <Text style={{ fontSize: 18, }}>@Sockute</Text>
                                </View>

                            </View>


                            <View style={styles.iconContainer} >
                                <Icon

                                    name='chevron-right'
                                    type='material-community'
                                    color='#000000'
                                    size={45}
                                    onPress={() => navigation.navigate('MyProfileScreen', { data })}
                                />
                            </View>

                        </View>

                        <View style={styles.userInfomationCounters}>
                            <View style={styles.userAttributes}>

                                <Heading6>4</Heading6>
                                <Text style={{ fontSize: 16, }}> Món đang bán</Text>
                            </View>
                            <View style={styles.userAttributes}>

                                <Heading6>5</Heading6>
                                <Text style={{ fontSize: 16, }}> Tin mua</Text>
                            </View>
                            <View style={styles.userAttributes}>

                                <Heading6>54</Heading6>
                                <Text style={{ fontSize: 16, }}> đang theo</Text>
                            </View>
                            <View style={styles.userAttributes}>

                                <Heading6>5</Heading6>
                                <Text style={{ fontSize: 16, }}> đang hóng</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.titleContainer}>

                        <Text style={styles.headingText}>Kệ hàng của tôi</Text>
                    </View>
                    <View style={[styles.box, styles.buttonGroupContainer]}>
                        <View style={styles.buttonContainer}>

                            <Icon
                                raised
                                name='md-home'
                                type='ionicon'
                                color='#000000'
                                size={25}
                                onPress={() => navigation.goBack()}
                            />
                            <Text style={styles.buttonName}>Sản phẩm</Text>
                        </View>
                        <View style={styles.buttonContainer}>

                            <Icon
                                raised
                                name='file-multiple-outline'
                                type='material-community'
                                color='#FFB22D'
                                size={25}
                                onPress={() => navigation.goBack()}
                            />
                            <Text style={styles.buttonName}>Tin mua</Text>
                        </View>

                    </View>
                    <View style={styles.titleContainer}>

                        <Text style={styles.headingText}>Thông tin hỗ trợ</Text>
                    </View>
                    <View style={[styles.box, styles.buttonGroupContainer]}>
                        <View style={styles.buttonContainer}>

                            <Icon
                                raised
                                name='address-book-o'
                                type='font-awesome'
                                color='#7339ab'
                                size={25}
                                onPress={() => navigation.goBack()}
                            />
                            <Text style={styles.buttonName}>Thông tin  cá nhân</Text>
                        </View>
                        <View style={styles.buttonContainer}>

                            <Icon
                                raised
                                name='md-location-outline'
                                type='ionicon'
                                color='#0E9F7C'
                                size={25}
                                onPress={() => navigation.goBack()}
                            />
                            <Text style={styles.buttonName}>Địa chỉ</Text>
                        </View>
                        <View style={styles.buttonContainer}>

                            <Icon
                                raised
                                name='android'
                                type='material-community'
                                color='#000000'
                                size={25}
                                onPress={() => navigation.goBack()}
                            />
                            <Text style={styles.buttonName}>Trung tâm
                                hỗ trợ</Text>
                        </View>
                        <View style={styles.buttonContainer}>

                            <Icon
                                raised
                                name='reddit'
                                type='zocial'
                                color='#FA6B74'
                                size={25}
                                onPress={() => navigation.goBack()}
                            />
                            <Text style={styles.buttonName}>Hướng dẫn
                                sử dụng</Text>
                        </View>

                    </View>
                    <View style={styles.titleContainer}>

                        <Text style={styles.headingText}>Tiện ích</Text>
                    </View>
                    <View style={[styles.box, styles.buttonGroupContainer, { flex: 1 }]}>
                        <View style={styles.buttonContainer}>

                            <Icon
                                raised
                                name='favorite'
                                type='material'
                                color='#FF6A6A'
                                size={25}
                                onPress={() => navigation.navigate('ProductsSaved')}
                            />
                            <Text style={styles.buttonName}>Sản phẩm yêu thích</Text>
                        </View>
                        <View style={styles.buttonContainer}>

                            <Icon
                                raised
                                name='bookmark-o'
                                type='font-awesome'
                                color='#FFB22D'
                                size={25}
                                onPress={() => navigation.navigate('PostsSaved')}
                            />
                            <Text style={styles.buttonName}>Tin mua  đã lưu</Text>
                        </View>
                        <View style={styles.buttonContainer}>

                            <Icon
                                raised
                                name='account-lock-outline'
                                type='material-community'
                                color='#000000'
                                size={25}
                                onPress={() => navigation.goBack()}
                            />
                            <Text style={styles.buttonName}>Đổi mật khẩu</Text>
                        </View>
                        <View style={styles.buttonContainer}>

                            <Icon
                                raised
                                name='logout'
                                type='material-community'
                                color='#EA4239'
                                size={25}
                                onPress={() => { navigation.navigate('Login'); }}
                            />
                            <Text style={styles.buttonName}>Đăng xuất</Text>
                        </View>

                    </View>


                </View>

            </SafeAreaView>
        </SafeAreaProvider>
    );
};
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        // backgroundColor: colors.themeBackground,
    },
    container: {
        flex: 1,

    },

    box: {
        padding: 20,
        backgroundColor: color.background,
        alignItems: 'center',
    },
    profileOpenContainer: {
        marginTop: 10,
    },
    userContainer: {
        flexDirection: 'row',
        padding: 20

    },
    userNameContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',

        alignItems: 'center',
    },
    userName: {
        margin: 5,
        paddingLeft: 5,
        fontWeight: '600',
        color: '#000',
        fontSize: 20
    },
    followContainer: {
        justifyContent: 'center',


    },

    userInfomationCounters: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    userAttributes: {

        alignItems: 'center',
    },
    iconContainer: {
        alignItems: 'center',
        alignSelf: 'center',



    },
    titleContainer: {
        marginTop: 5,
        paddingTop: 5,
        backgroundColor: color.background
    },
    headingText: {
        fontSize: 20,
        color: color.normalText,
        fontWeight: '500',
        paddingLeft: 20

    },
    buttonGroupContainer: {

        alignItems: 'flex-start',
        flexDirection: 'row',
        width: '100%',


    },
    buttonContainer: {
        paddingRight: 10,
        width: '25%'
    },
    buttonStyle: {
        backgroundColor: color.pinkBackgroundLight,
        borderRadius: 100,

    },
    buttonName: {
        textAlign: 'center',
        fontSize: 15,

    }

});

export default HomeScreen