//to do: onpress change state button

import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image, TextInput } from 'react-native';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Avatar } from 'react-native-elements';
import CommentItem from '../../component/CommentItem';
import ProductItem from '../../component/ProductItem';
import AddComment from '../../component/AddComment';

//import data
import comment from '../../assets/data/comment';
import products from '../../assets/data/product';





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

import { useNavigation } from '@react-navigation/native';



const ProductDetailScreen = ({ Props, route }) => {
    const navigation = useNavigation();
    const { data } = route.params;
    const [date, setDate] = useState('09-10-2020');

    const stateName = 'Nguyễn Văn A'
    const statePhone = '097773777'
    const stateAddress = '107, ấp 7, xã Ngã Bãy, huyện Châu Thành, tỉnh An Giang'


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
                                }>{data.productId}
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
                                <View style={[styles.userContainer, styles.box]}>

                                    <View style={styles.userNameContainer}>
                                        <Avatar
                                            containerStyle={{
                                                borderColor: 'grey',
                                                borderStyle: 'solid',
                                                borderWidth: 1,
                                            }}
                                            size="medium"
                                            rounded
                                            source={require('../../image/symbol.png')}
                                        />
                                        <View style={{ alignItems: 'center' }}>

                                            <Text style={styles.userName} numberOfLines={1}>Nguyễn lỵ</Text>
                                            <Text style={styles.activeLastTime} numberOfLines={1}>2 phút trước</Text>
                                        </View>
                                    </View>
                                    <View style={styles.followContainer}>

                                        <ButtonNormal outlined onPress={() => { navigation.navigate('Login'); }} buttonStyle={styles.followButton} title={'Hóng'}></ButtonNormal>
                                    </View>
                                </View>
                                <View style={styles.productContainer}>

                                    <View style={styles.unitPriceRow}>

                                        <Text style={styles.price}>50000 đ</Text>
                                        <Text style={styles.oldPrice}> 59000 đ</Text>

                                    </View>
                                    <View style={styles.Line}></View>


                                </View>
                                <View style={[styles.productContainer, styles.productStatusContainer]}>
                                    <Text style={styles.productStatus}>Tình trạng</Text>

                                    <ButtonNormal buttonStyle={styles.statusButton} outlined title={'Còn hàng'}></ButtonNormal>


                                </View>
                                <View style={[styles.productContainer, styles.productDescriptionContainer]}>
                                    <Text style={[styles.productStatus, { marginBottom: 20 }]}>Mô tả sản phẩm</Text>
                                    <Text style={styles.productDescription}>
                                        Panse mang một vẻ đẹp ngọt ngào, đằm thắm nhưng không kém phần rực rỡ mà không phải loài hoa nào cũng có.
                                        Nó là loài cây biểu tượng của mặt trời của hi vọng, của sự ấm áp, hướng về những điều tốt đẹp nhất. Hiện nay có khá nhiều người yêu thích loại cây xinh đẹp này, trồng trong nhà như một cây trang trí tô điểm không gian.
                                    </Text>


                                </View>
                                <View style={[styles.productContainer, styles.productAdjust]}>
                                    <Text style={styles.productStatus}>Chi tiết sản phẩm</Text>
                                    <View style={styles.productStatusItem}>

                                        <Text style={{ fontSize: 18 }}>Danh mục</Text>
                                        <Text style={{ fontSize: 18 }}>Trái cây</Text>
                                    </View>
                                    <View style={styles.productStatusItem}>

                                        <Text style={{ fontSize: 18 }}>Nơi bán</Text>
                                        <Text style={{ fontSize: 18 }}>Tiền Giang</Text>
                                    </View>
                                    <View style={styles.productStatusItem}>

                                        <Text style={{ fontSize: 18 }}>Số lượng</Text>
                                        <Text style={{ fontSize: 18 }}>50 kg</Text>
                                    </View>




                                </View>
                                <View style={styles.productImageContainer}>

                                    <Text style={[styles.productStatus, { alignSelf: 'flex-start' }]}>Ảnh sản phẩm</Text>

                                    <View style={styles.productImage}>

                                        <Image style={styles.image} source={require('../../assets/productImage/mango-1.jpg')} />
                                        <Image style={styles.image} source={require('../../assets/productImage/mango-2.jpg')} />
                                        <Image style={styles.image} source={require('../../assets/productImage/mango-3.jpg')} />
                                    </View>
                                    <View style={styles.productStatusItem}>

                                        <Text style={{ fontSize: 18, color: color.normalText, borderRadius: 10, borderWidth: 1, borderColor: color.borderColor, padding: 10 }}><FontAwesome name='shopping-bag' size={22} color={color.disableText} /> 20 người đang hỏi</Text>
                                        <Text style={{ fontSize: 18, padding: 10 }}>Báo xấu <FontAwesome name='exclamation-circle' size={22} color={color.disableText} /></Text>
                                    </View>
                                </View>


                            </View>
                            <View style={[styles.box, { marginTop: 10 }]}>

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

                                            source={require('../../assets/avatar/11.png')}
                                        />
                                        <View style={{ alignItems: 'center' }}>

                                            <Text style={styles.userName} numberOfLines={1}>Nguyễn lỵ</Text>
                                            <Text style={styles.activeLastTime} numberOfLines={1}>2 phút trước</Text>
                                        </View>
                                    </View>
                                    <View style={styles.followContainer}>

                                        <ButtonNormal outlined onPress={() => { navigation.navigate('Login'); }} buttonStyle={styles.followButton} title={'Hóng'}></ButtonNormal>
                                    </View>

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
                                        contentContainerStyle={styles.ProductItemList}
                                        data={products}
                                        numColumns={2}
                                        renderItem={({ item }) => <ProductItem item={item} />}
                                    />
                                </View>

                            </View>

                        </View>
                    </ScrollView>
                    <View style={[styles.box, styles.contentContainer]}>


                        <ButtonNormal
                            buttonStyle={styles.customButtonBackToHome}
                            onPress={() => { navigation.navigate('Login'); }}
                            title={'Chốt'.toUpperCase()}
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


    },
    userNameContainer: {
        width: '90%',
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
    }
});

export default ProductDetailScreen