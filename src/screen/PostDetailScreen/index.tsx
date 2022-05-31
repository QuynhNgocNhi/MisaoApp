//to do: onpress change state button

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, TouchableOpacity, SafeAreaView, ActivityIndicator, ScrollView, Platform, Image, TextInput } from 'react-native';
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

import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { masterDataSelector } from '../../modules/search/selectors';

import { getPostListAPI, getPostDetailAPI, orderProductAPI, followUserAPI } from '../../services';
import { tokenSelector } from '../../modules/auth/selectors';

import { userSelector } from '../../modules/user/selectors';



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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
import Comment from '../../assets/data/comment';



const PostDetailScreen = ({ Props, route }) => {
    const navigation = useNavigation<any>();
    const routeParams = route?.params?.data;
    const [date, setDate] = useState('09-10-2020');
    const [data, setData] = useState<any>()
    const [updating, setUpdating] = useState<boolean>(false)
    const userInfo = useSelector(userSelector)

    const [loading, setLoading] = useState<boolean>(true)
    const [isFollow, setIsFollow] = useState<boolean>(true)

    const [postList, setPostList] = useState<any>([])
    const fetchPostDetail = async () => {
        setLoading(true)
        const response = await getPostDetailAPI(routeParams?.postId)
        if (response.__typename !== 'ErrorResponse') {
            setData(response.data)
        }
        setLoading(false)
    }

    const onFollowUser = async (userID: any) => {
        const response = await followUserAPI(userID)
        if (response.__typename !== 'ErrorResponse') {
            setIsFollow(!isFollow)
        }
    }

    const onOrderProduct = async () => {
        setUpdating(true)
        const response = await orderProductAPI({
            confirm: true,
            user_seller_id: data?.user?.id,
            product_id: data?.id
        })

        if (response.__typename !== 'ErrorResponse') {
            navigation.navigate('ChatRoomScreen', {
                id: response?.data?.chat_room?.id
            })
        }
        setUpdating(false)


    }


    useEffect(() => {
        fetchPostDetail()
    }, [routeParams?.id])



    const token = useSelector(tokenSelector)
    const fetchData = async () => {
        if (!token) {
            navigation.replace('')
        }
        setLoading(true)
        const postResponse = await getPostListAPI()

        if (postResponse.__typename !== 'ErrorResponse') {

            setPostList(postResponse.data)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])
    const checkFollow = (_data: any) => {
        let list = []
        list.push(userInfo?.following?.find(user => user?.following_id === userInfo?.id && user?.followed_id === _data?.user_id))
        console.log({ list });

        if (!list[0]) {
            setIsFollow(false)
        } else {
            setIsFollow(true)
        }
    }

    if (loading) {
        return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator animating />
        </View>)
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.screenContainer}>
                <StatusBar translucent backgroundColor='transparent' barStyle={'dark-content'} />
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Header
                            containerStyle={{ borderBottomWidth: 0, marginVertical: 10 }}
                            backgroundColor={color.white}
                            centerComponent={
                                <Text style={
                                    { fontSize: 18, color: color.primaryText, fontWeight: '500', textTransform: 'uppercase', paddingTop: 5 }
                                }>Tin mua</Text>

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
                                <View style={[styles.userContainer, { paddingTop: 0 }]}>

                                    <View style={styles.userNameContainer}>
                                        <Avatar
                                            containerStyle={{
                                                borderColor: 'grey',
                                                borderStyle: 'solid',
                                                borderWidth: 1,
                                            }}
                                            size="medium"
                                            rounded
                                            source={data?.user?.profile_image ? { uri: data?.user?.profile_image_url } : require('../../image/symbol.png')}
                                        />
                                        <View style={{ alignItems: 'center' }}>

                                            <Text onPress={() => { navigation.navigate('UserProfileScreen'); }}
                                                style={styles.userName} numberOfLines={1}>{data?.user?.name}</Text>
                                            {/* <Text style={styles.activeLastTime} numberOfLines={1}>{data?.time} {data?.timeUnit} trước</Text> */}
                                        </View>
                                    </View>
                                    {userInfo?.id !== data?.user?.id ? (
                                        <TouchableOpacity
                                            onPress={() => onFollowUser(data?.user?.id)}
                                            style={styles.followContainer}>
                                            <ButtonNormal onPress={() => onFollowUser(data?.user?.id)} outlined buttonStyle={styles.followButton} title={isFollow ? 'Đã hóng' : 'Hóng'}></ButtonNormal>
                                        </TouchableOpacity>
                                    ) : <View style={{ width: 10, height: 10 }} />}

                                </View>

                                <View style={[styles.productContainer, styles.productStatusContainer]}>
                                    <Text style={styles.productName}>{data?.name ?? ''}</Text>



                                </View>
                                <View style={[styles.productContainer, styles.productDescriptionContainer]}>
                                    <Text style={styles.productDescription}>
                                        {data?.description ?? ''}
                                    </Text>


                                </View>
                                <View style={[styles.productContainer, styles.productAdjust]}>
                                    <Text style={styles.productStatus}>Chi tiết tin mua</Text>
                                    <View style={styles.productStatusItem}>

                                        <Text style={styles.requireName}>Danh mục</Text>
                                        <Text style={styles.requireAnswer}>{data?.category?.name}</Text>
                                    </View>
                                    <View style={styles.productStatusItem}>

                                        <Text style={styles.requireName}>Giao tới</Text>
                                        <Text style={styles.requireAnswer}>{data?.seller_address}</Text>
                                    </View>
                                    <View style={styles.productStatusItem}>

                                        <Text style={styles.requireName}>Ngày còn hạn</Text>
                                        <Text style={styles.requireAnswer}>{data?.limited_date}</Text>
                                    </View>

                                    <View style={styles.productStatusItem}>

                                        <Text style={{ fontSize: 18, color: color.normalText, borderRadius: 10, borderWidth: 1, borderColor: color.borderColor, padding: 10 }}><FontAwesome name='shopping-bag' size={22} color={color.disableText} /> {data?.order?.length ? (data?.order?.length) : '0'} người đang hỏi</Text>
                                        <Text style={{ fontSize: 18, padding: 10 }}>Báo xấu <FontAwesome name='exclamation-circle' size={22} color={color.disableText} /></Text>
                                    </View>


                                </View>



                            </View>
                            <View style={[styles.box, { marginTop: 10 }]}>

                                <View style={[styles.userContainer]}>

                                    <View style={styles.userNameContainer}>
                                        <Avatar
                                            containerStyle={{
                                                borderColor: 'grey',
                                                borderStyle: 'solid',
                                                borderWidth: 1,
                                            }}
                                            size="medium"
                                            rounded
                                            source={data?.user?.profile_image ? { uri: data?.user?.profile_image_url } : require('../../image/symbol.png')}
                                        />
                                        <View style={{ alignItems: 'center' }}>

                                            <Text onPress={() => { navigation.navigate('UserProfileScreen'); }}
                                                style={styles.userName} numberOfLines={1}>{data?.user?.name}</Text>
                                            {/* <Text style={styles.activeLastTime} numberOfLines={1}>{data?.time} {data?.timeUnit} trước</Text> */}
                                        </View>
                                    </View>
                                    {userInfo?.id !== data?.user?.id ? (
                                        <TouchableOpacity
                                            onPress={() => onFollowUser(data?.user?.id)}
                                            style={styles.followContainer}>
                                            <ButtonNormal onPress={() => onFollowUser(data?.user?.id)} outlined buttonStyle={styles.followButton} title={isFollow ? 'Đã hóng' : 'Hóng'}></ButtonNormal>
                                        </TouchableOpacity>
                                    ) : <View style={{ width: 10, height: 10 }} />}
                                </View>
                                <View style={[styles.userInfomationContainer]}>
                                    <Text style={{ fontSize: 18, }}>@Sockute</Text>
                                    <Text style={{ fontSize: 18, color: color.primaryText, }} numberOfLines={1}>Bán hoài không nghỉ</Text>


                                </View>
                                <View style={styles.userInfomationCounters}>
                                    <Text style={{ fontSize: 16, }}><Heading6>54</Heading6> ngày ở Misao</Text>
                                    <Text style={{ fontSize: 16, }}><Heading6>4</Heading6> đang bán</Text>
                                    <Text style={{ fontSize: 16, }}><Heading6>5</Heading6> đang mua</Text>
                                </View>




                            </View>
                            <View style={[styles.box, styles.commentContainer, { marginTop: 10 }]}>
                                <View style={styles.commentCountContainer}>

                                    <FontAwesome name='comment-o' size={24} color={color.borderColor} />
                                    <Heading6 style={[styles.headingText, { paddingLeft: 10 }]}>7 bình luận</Heading6>
                                </View>
                                <View style={[styles.commentList, { marginTop: 10 }]}>
                                    <FlatList

                                        data={comment}

                                        renderItem={({ item }) => <CommentItem comment={item} />}
                                    />

                                </View>
                                <View style={styles.AddCommentContainer}>
                                    <AddComment />
                                </View>


                            </View>
                            <View style={[styles.upSellProduct, { marginTop: 10 }]}>
                                <View style={styles.bottomContainer}>


                                    <Heading6 style={styles.titleText}>Có thể bạn quan tâm </Heading6>

                                    <FlatList
                                        contentContainerStyle={styles.postListContainer}

                                        data={postList}

                                        renderItem={({ item }) => <PostItem post={item} />}
                                    />
                                </View>

                            </View>

                        </View>
                    </ScrollView>
                    <View style={[styles.box, styles.contentContainer]}>


                        <ButtonNormal
                            buttonStyle={styles.customButtonChatNow}
                            onPress={() => { navigation.navigate('Login'); }}
                            title={'Hỏi Thăm'.toUpperCase()}
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
        backgroundColor: color.underBackground,
    },
    container: {
        flex: 1,
    },
    box: {
        padding: 20,
        backgroundColor: color.background,
        alignItems: 'center',
    },
    userContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',



    },
    userNameContainer: {
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
    customButtonChatNow: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: color.primaryColor,
    }
});

export default PostDetailScreen