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
const PeopleAlsoSearched = ({ product }: productProps) => {
    const navigation = useNavigation();
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
        <View>
            <View style={styles.root}>
                <View style={styles.topContainer}>

                    <View style={styles.imageContainer}>

                        <Image style={styles.productImage} source={product.image} />
                    </View>

                    <View style={styles.middleContainer}>

                        <Text onPress={() => { navigation.navigate('ProductDetail', { data }); }}
                            numberOfLines={1} style={styles.title}>{product.name}
                        </Text>

                    </View>
                </View>


            </View>
        </View>
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
        padding: 5



    },

    bottomContainer: {


        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 5,


    },

    imageContainer: {


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