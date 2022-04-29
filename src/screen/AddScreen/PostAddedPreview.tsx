//to do: onpress change state button

import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image, TextInput } from 'react-native';
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
import { useNavigation } from '@react-navigation/native';

const PostAddedPreviewScreen = ({ Props, route }) => {
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
                                            source={require('../../image/symbol.png')}
                                        />
                                        <View style={{ alignItems: 'center' }}>

                                            <Text style={styles.userName} numberOfLines={1}>Nguyễn lỵ</Text>
                                            <Text style={styles.activeLastTime} numberOfLines={1}>2 phút trước</Text>
                                        </View>
                                    </View>

                                </View>

                                <View style={[styles.productContainer, styles.productStatusContainer]}>
                                    <Text style={styles.productName}>Cần mua 20kh cần tây</Text>



                                </View>
                                <View style={[styles.productContainer, styles.productDescriptionContainer]}>
                                    <Text style={styles.productDescription}>
                                        Panse mang một vẻ đẹp ngọt ngào, đằm thắm nhưng không kém phần rực rỡ mà không phải loài hoa nào cũng có.
                                        Nó là loài cây biểu tượng của mặt trời của hi vọng, của sự ấm áp, hướng về những điều tốt đẹp nhất. Hiện nay có khá nhiều người yêu thích loại cây xinh đẹp này, trồng trong nhà như một cây trang trí tô điểm không gian.
                                    </Text>


                                </View>
                                <View style={[styles.productContainer, styles.productAdjust]}>
                                    <Text style={styles.productStatus}>Chi tiết tin mua</Text>
                                    <View style={styles.productStatusItem}>

                                        <Text style={styles.requireName}>Danh mục</Text>
                                        <Text style={styles.requireAnswer}>Trái cây</Text>
                                    </View>
                                    <View style={styles.productStatusItem}>

                                        <Text style={styles.requireName}>Giao tới</Text>
                                        <Text style={styles.requireAnswer}>Tiền Giang</Text>
                                    </View>
                                    <View style={styles.productStatusItem}>

                                        <Text style={styles.requireName}>Ngày còn hạn</Text>
                                        <Text style={styles.requireAnswer}>21/10/2022</Text>
                                    </View>




                                </View>



                            </View>


                        </View>
                    </ScrollView>
                    <View style={[styles.box, styles.contentContainer]}>


                        <ButtonNormal
                            buttonStyle={styles.customButtonBackToHome}
                            onPress={() => { navigation.navigate('HomeNavigation'); }}
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