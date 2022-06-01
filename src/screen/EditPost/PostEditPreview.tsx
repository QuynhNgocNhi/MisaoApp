//to do: onpress change state button

import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image, TextInput, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Avatar } from 'react-native-elements';
import CommentItem from '../../component/CommentItem';
import AddComment from '../../component/AddComment';
import post from '../../assets/data/post';
import PostItem from '../../component/PostItem';

//import data
import comment from '../../assets/data/comment';

interface productProps {

    product: {
        id: string,
        title: string,
        content: string,
        userId: string,
        name: string,
        avatar: string,
        time: number,
        timeUnit: string,
        askedTimes: number,

    }
}
interface UserProps {
    user: {
        id: string,
        name: string,
        avatar: string,


    }

}
interface commentProps {
    comment: {
        id: string,
        productId: string,
        content: string,
        userId: string,
        name: string,
        avatar: string,
        time: number,
        timeUnit: string,


    }

}

// import components
import ButtonNormal from '../../component/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Header } from 'react-native-elements';
import HeaderIconButton from '../../component/HeaderButton'
const BACK_ICON = Platform.OS === 'ios' ? 'ios-chevron-back-outline' : 'md-chevron-back';

// import color, layout, style
import color from '../../theme/color';

import { NavigationContainer, RouteProp, useRoute } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';
import Comment from '../../assets/data/comment';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../modules/user/selectors';
import { masterDataSelector } from '../../modules/search/selectors';
import LoadingOverlay from '../../component/LoadingOverlay';
import { editPostAPI } from '../../services';
import { getUserInfo } from '../../modules/user/slice';


type RouteParams = {
    data: any
}
const PostAddedPreviewScreen = ({ Props, route }: any) => {
    const navigation = useNavigation<any>();
    const { params } = useRoute<RouteProp<Record<string, RouteParams>, string>>();
    const { data } = route.params;
    const [date, setDate] = useState('09-10-2020');
    const userInfo = useSelector(userSelector)
    const categories = useSelector(masterDataSelector)
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch()
    console.log(data)
    const onAddPost = async () => {
        setLoading(true)
        const response = await editPostAPI(data)
        if (response.__typename !== 'ErrorResponse') {
            dispatch(getUserInfo())
            Alert.alert("", "Sửa tin mua thành công!", [
                {
                    text: 'OK',
                    onPress: () => navigation.replace("HomeNavigation")
                }
            ])
        } else {
            Alert.alert("", "Sửa tin mua thất bại! Vui lòng thử lại sau.", [
                {
                    text: 'OK',
                    onPress: () => { }
                }
            ])
        }
        setLoading(false)
    }
    let limited_date = `${data.limited_date?.getDate()}-${data.limited_date?.getMonth()}-${data.limited_date?.getFullYear()}`
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
                                }>tin mua
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
                            <View style={[styles.box, styles.productDetailContainer]}>
                                <View style={styles.userContainer}>

                                    <View style={[styles.userNameContainer, { width: '100%' }]}>
                                        <Avatar
                                            containerStyle={{
                                                borderColor: 'grey',
                                                borderStyle: 'solid',
                                                borderWidth: 1,
                                            }}
                                            size="medium"
                                            rounded
                                            source={userInfo?.profile_image ? { uri: userInfo?.profile_image_url } : require('../../image/symbol.png')}
                                        />
                                        <View style={{ alignItems: 'center' }}>

                                            <Text style={styles.userName} numberOfLines={1}>{userInfo?.name}</Text>
                                            {/* <Text style={styles.activeLastTime} numberOfLines={1}>2 phút trước</Text> */}
                                        </View>
                                    </View>

                                </View>

                                <View style={[styles.productContainer, styles.productStatusContainer]}>
                                    <Text style={styles.productName}>{data.name}</Text>



                                </View>
                                <View style={[styles.productContainer, styles.productDescriptionContainer]}>
                                    <Text style={styles.productDescription}>
                                        {data?.description}
                                    </Text>


                                </View>
                                <View style={[styles.productContainer, styles.productAdjust]}>
                                    <Text style={styles.productStatus}>Chi tiết tin mua</Text>
                                    <View style={styles.productStatusItem}>

                                        <Text style={styles.requireName}>Danh mục</Text>
                                        <Text style={styles.requireAnswer}>{categories?.find((item: any) => item.value == data?.category_id)?.label}</Text>
                                    </View>
                                    <View style={styles.productStatusItem}>

                                        <Text style={styles.requireName}>Giao tới</Text>
                                        <Text style={styles.requireAnswer}>{data?.seller_address}</Text>
                                    </View>
                                    <View style={styles.productStatusItem}>

                                        <Text style={styles.requireName}>Ngày còn hạn</Text>
                                        <Text style={styles.requireAnswer}>{limited_date}</Text>
                                    </View>




                                </View>



                            </View>


                        </View>
                    </ScrollView>
                    <View style={[styles.box, styles.contentContainer]}>


                        <ButtonNormal
                            buttonStyle={styles.customButtonBackToHome}
                            onPress={onAddPost}
                            title={'Xác nhận'.toUpperCase()}
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
    },
    container: {
        flex: 1,
    },
    box: {
        padding: 20,
        paddingTop: 10,
        backgroundColor: color.background,
        alignItems: 'center',
    },
    userContainer: {
        flexDirection: 'row',


    },
    userNameContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
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
    followButton: {
        padding: 10,
        height: 40,
        backgroundColor: color.themeBackground
    },
    text: {
        marginLeft: 10,
        color: '#000',

    },
    productContainer: {

        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: color.borderColor,
        paddingBottom: 10
    },
    unitPriceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',



    },
    price: {
        padding: 10,
        fontSize: 20,
        color: '#D40000',
        backgroundColor: '#FFA7AD',
        borderRadius: 5

    },

    oldPrice: {
        marginLeft: 10,
        color: '#000',
        fontSize: 20,
        textDecorationLine: 'line-through',
    },
    productStatusContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        justifyContent: 'space-between',
    },
    productName: {

        fontSize: 20,
        color: color.primaryText,
        fontWeight: '500'
    },
    productStatus: {

        fontSize: 20,
        color: color.primaryText,
        fontWeight: '500'
    },
    statusButton: {

        padding: 10,
        height: 40,
        width: 120,

    },
    productDescriptionContainer: {

        paddingTop: 10,
        justifyContent: 'space-between',
    },
    productDescription: {
        fontSize: 20,
        color: color.primaryText


    },
    requireName: {
        fontSize: 18,

        color: color.primaryText
    },
    requireAnswer: {
        fontSize: 18,
        color: color.normalText

    },
    productAdjust: {
        marginTop: 10,
    },

    productStatusItem: {
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',

        justifyContent: 'space-between',

        paddingBottom: 10
    },
    productImageContainer: {
        paddingTop: 10,
        alignItems: 'center',
        width: '100%',

    },
    productImage: {
        width: '90%',

        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'cover',
        marginTop: 20,
        marginBottom: 20,

    },
    userInfomationContainer: {
        width: '100%',
        alignItems: 'flex-start',
    },
    userInfomationCounters: {
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    commentList: {
        width: '100%',
        alignItems: 'flex-start',
    },
    commentContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',

    },
    commentCountContainer: {
        flexDirection: 'row',


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
    }
});

export default PostAddedPreviewScreen