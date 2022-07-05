import { Image, View, Text, ImagePropTypes, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Avatar } from 'react-native-elements';

// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';


interface productProps {

    product: {
        id: string,
        name: string,
        description: string,
        image: string,
        price: number,
        oldPrice?: number,
        discountPercentage?: number,
        unitPrice: string,
        askedTimes: number,
        userId: string,
        userName: string,
        userAvatar: string,
        time: number,
        timeUnit: string,
        dateCreated: string,
        availability: number,
    }
}
const PeopleAlsoSearched = ({ product }: any) => {
    const navigation = useNavigation<any>();
    const data = {
        productId: product.id,
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
        <TouchableOpacity
            onPress={() => { navigation.navigate('ProductDetail', { data: product }); }}
        >
            <View style={styles.root}>
                <View style={styles.topContainer}>

                    <View style={styles.imageContainer}>

                        <FastImage style={styles.productImage} source={{ uri: product.images && product.images?.length > 0 && product?.images[0].url && product.images[0].url_full }} />
                    </View>

                    <View style={styles.middleContainer}>

                        <Text onPress={() => { navigation.navigate('ProductDetail', { data }); }}
                            numberOfLines={1} style={styles.title}>{product.name}
                        </Text>

                    </View>
                </View>


            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({

    root: {

        width: (layout.SCREEN_WIDTH - 30) / 2,
        flex: 1,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#d1d1d1',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 5,
        marginTop: 10,
        marginLeft: 10

    },

    topContainer:
    {

        flexDirection: 'row',
        justifyContent: 'space-between',

    },


    title: {

        marginBottom: 0,
        color: '#000',
        fontSize: 16,
        padding: 5,
        width: '80%',
        alignSelf: 'center',



    },

    bottomContainer: {


        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 5,


    },

    imageContainer: {
        width: '20%'

    },
    middleContainer: {
        width: '90%',
    },
    productImage: {
        marginLeft: 10,
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: color.borderColor,
    }

});
export default PeopleAlsoSearched;