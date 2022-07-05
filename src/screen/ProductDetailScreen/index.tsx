//to do: onpress change state button

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image, TextInput, ActivityIndicator, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Avatar } from 'react-native-elements';
import CommentItem from '../../component/CommentItem';
import ProductItem from '../../component/ProductItem';
import AddComment from '../../component/AddComment';

import 'intl';
import 'intl/locale-data/jsonp/en';




interface productProps {

    product: {
        id: string,
        title: string,
        description: string,
        image: string,
        averageRating: number,
        rating: number,
        price: number,
        oldPrice: number,
        unitPrice: string,
        discountPercentage: number,
        askedTimes: number,
        dateCreated: string,

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

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { deleteProductAPI, followUserAPI, getProductDetailAPI, orderProductAPI } from '../../services';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../modules/user/selectors';
import LoadingOverlay from '../../component/LoadingOverlay';

import { getHotProductListAPI, getProductListAPI } from '../../services';
import { tokenSelector } from '../../modules/auth/selectors';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParameterList } from '../../MainNavigator';
import { getUserInfo } from '../../modules/user/slice';
type HomeProps = NativeStackScreenProps<RootStackParameterList, "Home">

const ProductDetailScreen = ({ Props, route }: any) => {
    const navigation = useNavigation<any>();
    const routeParams = route?.params?.data;
    console.log(routeParams?.productId);
    const [data, setData] = useState<any>()

    const [updating, setUpdating] = useState<boolean>(false)
    const userInfo = useSelector(userSelector)
    const isFocused = useIsFocused()
    const [loading, setLoading] = useState<boolean>(true)
    const [isFollow, setIsFollow] = useState<boolean>(true)
    const fetchProductDetail = async () => {

        setLoading(true)
        const response = await getProductDetailAPI(routeParams?.productId)
        if (response.__typename !== 'ErrorResponse') {
            setData(response.data)

            checkFollow(response.data)
        }
        setLoading(false)
    }
    const dispatch = useDispatch()
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

    const onDeleteProduct = () => {
        Alert.alert("", "Bạn chắc chắn muốn xóa sản phẩm này?", [
            {
                text: 'Hủy',
                onPress: () => { },
                style: 'cancel'
            },
            {
                text: 'Xóa sản phẩm',
                onPress: async () => {
                    setUpdating(true)
                    const response = await deleteProductAPI(data?.id)
                    if (response.__typename !== 'ErrorResponse') {
                        Alert.alert("", "Xóa thành công", [
                            {
                                text: 'Ok',
                                onPress: () => navigation.goBack(),
                                style: 'cancel'
                            }
                        ])
                    } else {
                        Alert.alert("", "Xóa thất bại")
                    }
                    setUpdating(false)
                },
                style: 'cancel'
            },
        ])
    }

    const onEditProduct = () => {
        navigation.navigate("EditProduct", { data: { productId: data.id } });
    }


    useEffect(() => {
        fetchProductDetail()
    }, [routeParams?.productId, isFocused])



    const [productList, setProductList] = useState<any>([])
    const token = useSelector(tokenSelector)

    const fetchData = async () => {
        if (!token) {
            navigation.replace('')
        }
        setLoading(true)
        const productResponse = await getProductListAPI()
        const response = await getHotProductListAPI()
        if (response.__typename !== 'ErrorResponse' && productResponse.__typename !== 'ErrorResponse') {

            setProductList(response.data)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])


    const checkFollow = (_data: any) => {
        let list = []
        list.push(userInfo?.following?.find(user => user?.followed_id === _data?.user.id))

        if (!list[0]) {
            setIsFollow(false)
        } else {
            setIsFollow(true)
        }
    }

    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator animating />
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
                            backgroundColor={color.white}
                            centerComponent={
                                <Text numberOfLines={1} style={

                                    { fontSize: 18, color: color.primaryText, fontWeight: '500', textTransform: 'uppercase', paddingTop: 5 }
                                }>{data?.name ?? ''}
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

                                <View style={[styles.userContainer, { paddingBottom: 10 }]}>

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

                                            <Text onPress={() => { navigation.navigate('UserProfileScreen', { id: data?.user?.id }); }}
                                                style={styles.userName} numberOfLines={1}>{data?.user?.name}</Text>
                                            {/* <Text style={styles.activeLastTime} numberOfLines={1}>{data?.time} {data?.timeUnit} trước</Text> */}
                                        </View>
                                    </View>
                                    {userInfo?.id !== data?.user?.id ? (
                                        <TouchableOpacity
                                            onPress={() => onFollowUser(data?.user?.id)}
                                            style={styles.followContainer}>
                                            <ButtonNormal
                                                onPress={() => onFollowUser(data?.user?.id)}
                                                outlined buttonStyle={styles.followButton}
                                                title={isFollow ? 'Đã hóng' : 'Hóng'}></ButtonNormal>
                                        </TouchableOpacity>
                                    ) : <View style={{ width: 10, height: 10 }} />}

                                </View>
                                <View style={styles.productContainer}>
                                    <Text style={styles.productName}>{data?.name ?? ''}
                                    </Text>
                                    {data?.discount > 0 ? (
                                        <View style={styles.unitPriceRow}>
                                            <Text style={styles.price}>{new Intl.NumberFormat().format(data?.price - data?.price * (data?.discount / 100))} đ</Text>
                                            <Text style={styles.oldPrice}> {new Intl.NumberFormat().format(data?.price)} đ</Text>

                                        </View>
                                    ) : (
                                        <View style={styles.unitPriceRow}>
                                            <Text style={styles.price}>{new Intl.NumberFormat().format(data?.price)} đ</Text>
                                        </View>
                                    )}

                                    <View style={styles.Line}></View>


                                </View>
                                <View style={[styles.productContainer, styles.productStatusContainer]}>
                                    <Text style={styles.productStatus}>Tình trạng</Text>

                                    <ButtonNormal buttonStyle={styles.statusButton} outlined title={data?.is_availabel === 0 ? 'Còn hàng' : 'Hết hàng'}></ButtonNormal>
                                </View>
                                <View style={[styles.productContainer, styles.productDescriptionContainer]}>
                                    <Text style={[styles.productStatus, { marginBottom: 20 }]}>Mô tả sản phẩm</Text>
                                    <Text style={styles.productDescription}>
                                        {data?.description}
                                    </Text>


                                </View>
                                <View style={[styles.productContainer, styles.productAdjust]}>
                                    <Text style={styles.productStatus}>Chi tiết sản phẩm</Text>
                                    <View style={styles.productStatusItem}>

                                        <Text style={{ fontSize: 18 }}>Danh mục</Text>
                                        <Text style={{ fontSize: 18 }}>{data?.category?.name}</Text>
                                    </View>
                                    <View style={styles.productStatusItem}>

                                        <Text style={{ fontSize: 18 }}>Nơi bán</Text>
                                        <Text style={{ fontSize: 18 }}>{data?.seller_address}</Text>
                                    </View>
                                    <View style={styles.productStatusItem}>

                                        <Text style={{ fontSize: 18 }}>Số lượng</Text>
                                        <Text style={{ fontSize: 18 }}>{data?.inventory_number ?? '-'} {data?.unit ?? ''}</Text>
                                    </View>




                                </View>
                                <View style={styles.productImageContainer}>

                                    <Text style={[styles.productStatus, { alignSelf: 'flex-start' }]}>Ảnh sản phẩm</Text>

                                    <View style={styles.productImage}>
                                        {data?.images?.map((image: any, index: number) => (
                                            <Image style={styles.image} key={index} source={{ uri: image?.url_full ?? '' }} />

                                        ))}
                                    </View>
                                    <View style={styles.productStatusItem}>

                                        <Text
                                            style={{ fontSize: 18, color: color.normalText, borderRadius: 10, borderWidth: 1, borderColor: color.borderColor, padding: 10 }}>
                                            <FontAwesome name='shopping-bag'
                                                size={22}
                                                color={color.disableText} /> {routeParams.askedTimes ? (routeParams.askedTimes) : '0'} người đang hỏi</Text>
                                        <Text style={{ fontSize: 18, padding: 10 }}>Báo xấu <FontAwesome name='exclamation-circle' size={22} color={color.disableText} /></Text>
                                    </View>
                                </View>


                            </View>
                            <View style={[styles.box, { marginTop: 10, }]}>

                                <View style={[styles.userContainer]}>

                                    <View style={styles.userNameContainer}>
                                        <Avatar
                                            size="medium"
                                            rounded
                                            containerStyle={{
                                                borderColor: 'grey',
                                                borderStyle: 'solid',
                                                borderWidth: 1,
                                            }}
                                            source={data?.user?.profile_image ? { uri: data?.user?.profile_image_url } : require('../../image/symbol.png')}
                                        />
                                        <View style={{ alignItems: 'center' }}>
                                            <Text onPress={() => { navigation.navigate('UserProfileScreen'); }}
                                                style={styles.userName} numberOfLines={1}>{data?.user?.name}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.followContainer}>

                                        {userInfo?.id !== data?.user?.id ? (
                                            <TouchableOpacity
                                                onPress={() => onFollowUser(data?.user?.id)}
                                                style={styles.followContainer}>
                                                <ButtonNormal outlined buttonStyle={styles.followButton} title={isFollow ? 'Đã hóng' : 'Hóng'}></ButtonNormal>
                                            </TouchableOpacity>
                                        ) : <View style={{ width: 10, height: 10 }} />}
                                    </View>

                                </View>
                                <View style={[styles.userInfomationContainer]}>
                                    <Text style={{ fontSize: 18, }}>{data?.user?.phone}</Text>
                                    <Text style={{ fontSize: 18, color: color.primaryText, }} numberOfLines={1}>{data?.user?.description}</Text>


                                </View>
                                <View style={styles.userInfomationCounters}>
                                    <Text style={{ fontSize: 16, }}><Heading6>54</Heading6> ngày ở Misao</Text>
                                    <Text style={{ fontSize: 16, }}><Heading6>4</Heading6> đang bán</Text>
                                    <Text style={{ fontSize: 16, }}><Heading6>5</Heading6> đang mua</Text>
                                </View>




                            </View>
                            {/* <View style={[styles.box, styles.commentContainer, { marginTop: 10 }]}>
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


                            </View> */}
                            <View style={[styles.upSellProduct, { marginTop: 10 }]}>
                                <View style={styles.bottomContainer}>


                                    <Heading6 style={styles.titleText}>Có thể bạn quan tâm </Heading6>

                                    <FlatList
                                        contentContainerStyle={styles.ProductItemList}
                                        data={productList}
                                        numColumns={2}
                                        renderItem={({ item }) => <ProductItem product={item} />}
                                    />
                                </View>

                            </View>

                        </View>
                    </ScrollView>
                    {userInfo?.id !== data?.user?.id ? (
                        <View style={[styles.box, styles.contentContainer]}>
                            <ButtonNormal
                                buttonStyle={styles.customButtonBackToHome}
                                onPress={onOrderProduct}
                                title={'Chốt'.toUpperCase()}
                            />
                        </View>
                    ) : (
                        <View style={{
                            position: 'absolute', bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                            width: Dimensions.get('window').width, backgroundColor: color.background, padding: 10
                        }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: color.normalButton, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 5,
                                    width: (Dimensions.get('window').width - 150) / 2, marginRight: 20
                                }}
                                onPress={onEditProduct}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Sửa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: color.important, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 5,
                                    width: (Dimensions.get('window').width - 150) / 2
                                }}
                                onPress={onDeleteProduct}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

            </SafeAreaView>
            <LoadingOverlay loading={updating} />
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
        backgroundColor: color.primaryColor
    },
    productName:

    {

        fontSize: 20,
        color: color.primaryText,
        fontWeight: '500',
        textTransform: 'capitalize',
        paddingBottom: 20


    }
});

export default ProductDetailScreen