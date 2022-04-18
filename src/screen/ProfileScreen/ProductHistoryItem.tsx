import { Image, View, Text, ImagePropTypes, StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Avatar } from 'react-native-elements';

// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';
import { useNavigation } from '@react-navigation/native';


interface productProps {

    product: {
        id: string,
        title: string,
        description: string,
        image: string,
        userId: string,
        name: string,
        avatar: string,
        time: number,
        timeUnit: string,
        price: number,

        unitPrice: string,

        askedTimes: number,
        dateCreated: string,

    }
}
const ProductHistoryItem = ({ product }: productProps) => {
    const navigation = useNavigation();
    const data = { productId: product.id, title: product.title, content: product.description, userId: product.userId, userName: product.name }

    return (
        <View>
            <View style={styles.root}>
                <View style={styles.topContainer}>

                    <View style={styles.imageContainer}>

                        <Image style={styles.productImage} source={product.image} />
                    </View>

                    <View style={styles.middleContainer}>

                        <Text onPress={() => { navigation.navigate('ProductDetail', { data }); }} numberOfLines={1} style={styles.title}>{product.title}
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                            <Text numberOfLines={1} style={[styles.content, { color: color.important, }]}>{product.price} đ/{product.unitPrice}</Text>
                            <Text numberOfLines={1} style={styles.content}>{product.askedTimes} {product.unitPrice}</Text>
                        </View>

                    </View>
                </View>


            </View>
        </View>
    )
}
const styles = StyleSheet.create({

    root: {
        width: '95%',
        flexDirection: 'column',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#d1d1d1',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,

    },

    topContainer:
    {

        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    userContainer:
    {
        flexDirection: 'row',


    },
    bookmarkContainer: {
        position: 'absolute',
        top: 10,
        right: 0,

    },

    userName: {
        margin: 5,
        paddingLeft: 10,
        fontWeight: 'bold',
        color: '#000',
        fontSize: 20
    },
    middleContainer: {
        width: '80%',
        marginLeft: 10,

    },
    title: {

        marginBottom: 0,
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',

    },
    content: {

        marginTop: 0,
        color: '#000',
        fontSize: 18,


    },
    bottomContainer: {

        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 5,


    },
    productTime: {

    },
    imageContainer: {

    },
    productImage: {

        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: color.borderColor,
    }

});
export default ProductHistoryItem;