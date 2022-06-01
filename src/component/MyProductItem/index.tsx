import { Image, View, Text, ImagePropTypes, StyleSheet, LogBox, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Heading6 } from '../../component/Text';
// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';
import { Icon } from 'react-native-elements';
import NumberFormat from 'react-number-format';
import { useNavigation } from '@react-navigation/native';
import 'intl';
import 'intl/locale-data/jsonp/en';
import FastImage from 'react-native-fast-image';
import { likeProductAPI } from '../../services';
LogBox.ignoreLogs(["VirtualizedLists should never be nested"])

const MyProductItem = ({ product }: any) => {
    const navigation = useNavigation();
    const data = {
        productId: product.id,
        categoryId: product.category_id,
        productName: product.name,
        productDescription: product.description,
        productPrice: product.price,
        oldPrice: product.oldPrice,
        productImage: product.image,
        productDiscount: product.discountPercentage,
        productUnitPrice: product.unitPrice,
        productAskTime: product.askedTimes,
        userId: product.userId,
        userName: product.userName,
        userAvatar: product.userAvatar,
        time: product.time,
        timeUnit: product.timeUnit,
    }


    return (
        <View style={styles.container} >
            <View style={styles.bottomContainer}>
                {product.images && product.images?.length > 0 && product.images[0].url && product.images[0].url_full ? (
                    <FastImage style={styles.image}
                        source={{ uri: product.images && product.images?.length > 0 && product.images[0].url && product.images[0].url_full }} />
                ) : (
                    <></>
                )}
                <View style={styles.tittleContainer}>
                    <Text onPress={() => { navigation.navigate('ProductDetail', { data }); }}
                        style={styles.title} numberOfLines={2}>{product?.name}</Text>
                </View>


                <View style={styles.unitPriceRow}>

                    <Text style={styles.price}>đ{new Intl.NumberFormat().format(product?.price)}

                    </Text>
                    <Text style={styles.unitPrice}> {product?.unit} </Text>
                </View>
                <Text style={styles.askedTimes}> {product?.order?.length ? (product?.order?.length) : '0'} người đang hỏi</Text>

                {product.discount ? (<View style={styles.discountLabelContainer}>
                    <Text style={styles.label}>{`- ${product?.discount}%`}</Text>

                </View>) : <></>}
                {/* <TouchableOpacity
                    onPress={onLikeProduct}
                    style={styles.editContainer}>
                    <FontAwesome style={styles.editIcon} name='edit' color={'#000'} size={30} />
                </TouchableOpacity> */}
                <View style={styles.editContainer}>

                    <Icon
                        raised
                        name='edit'
                        type='feather'
                        color='#000000'
                        size={25}
                        onPress={() => { navigation.navigate("EditProduct", { data }); }}

                    />

                </View>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: color.white,
        width: (layout.SCREEN_WIDTH) / 2,
        borderWidth: 0.5,
        borderColor: color.borderColor,
    },
    borderContainer: {
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: 'rgba(0, 0, 0, 0.08)',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        backgroundColor: color.surface,
        overflow: 'hidden',
    },
    titleContainer: {
        paddingTop: 12,
        paddingHorizontal: 12,
        height: 52,
    },

    image: {
        alignSelf: 'center',

        width: '80%',
        marginTop: 15,
        height: 150,
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: color.borderColor,
    },


    title: {
        flex: 1,
        margin: 10,
        color: '#000',
        fontSize: 16
    },
    price: {
        marginBottom: 5,
        marginLeft: 5,
        color: '#FF0000',
        fontSize: 16,
        fontWeight: 'bold',

    },

    discountLabelContainer: {
        position: 'absolute',
        top: 5,
        left: 5,
        borderRadius: 2,
        paddingVertical: 2,
        paddingHorizontal: 6,
        backgroundColor: '#FF9A9A',
        borderWidth: 1,
        borderColor: '#FF0000',
    },
    label: {
        fontSize: 12,
        color: color.onPrimaryColor,
    },
    editContainer: {
        position: 'absolute',
        top: 0,
        right: 0,

    },

    oldPrice: {

        color: '#000',
        fontSize: 12,
        textDecorationLine: 'line-through',
    },
    text: {
        marginLeft: 10,
        color: '#000',

    },
    unitPriceRow: {

        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    unitPrice: {
        marginRight: 10,

        fontSize: 16,

    },
    askedTimes: {
        marginRight: 10,
        alignSelf: 'flex-end',
        paddingBottom: 5,
    },

});
export default MyProductItem;