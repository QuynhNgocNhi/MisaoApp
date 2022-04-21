import { Image, View, Text, ImagePropTypes, StyleSheet, LogBox } from 'react-native'
import React, { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Heading6 } from '../../component/Text';
// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';



//10 latest product that have oldprice

//import image from '../../data/image'
interface ProductItemProps {
    item: {
        id: string,
        name: string,
        image: string,
        price: number,
        oldPrice?: number,
        discountPercentage?: number,
        //for optional props: oldPrice? 

    }
}


const HotDealItem = ({ item }: ProductItemProps) => {
    useEffect(() => {

        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    }, [])
    return (
        <View style={styles.container}>

            <View style={styles.bottomContainer}>

                <Image style={styles.image} source={item.image} />
                <View style={styles.tittleContainer}>
                    <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
                </View>



                <Text style={styles.price}>đ{item.price}

                </Text>
                <View style={styles.discountLabelContainer}>
                    <Text style={styles.label}>{`- ${item.discountPercentage}%`}</Text>
                </View>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {

        margin: 4,
        width: (layout.SCREEN_WIDTH - 5 * 8) / 5,
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
    /*  root: {
         flexDirection: 'column',
         width: '25%',
         borderWidth: 1,
         borderColor: '#d1d1d1',
         backgroundColor: '#fff',
         borderRadius: 5,
 
     }, */
    image: {

        width: '100%',
        height: 80,
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: '#FF0000',
    },
    /* bottomContainer: {
        padding: 5,
        width: '25%',
        flex: 1.5,
    }, */

    title: {
        flex: 1,
        marginTop: 5,
        color: '#000',
        fontSize: 16
    },
    price: {
        marginBottom: 5,
        color: '#FF0000',
        fontSize: 16,
        fontWeight: 'bold',

    },

    text: {

        color: '#000',

    },
    discountLabelContainer: {
        position: 'absolute',
        top: 5,
        right: 5,
        borderRadius: 6,
        paddingVertical: 2,
        paddingHorizontal: 6,
        backgroundColor: '#FF9A9A',
        borderWidth: 1,
        borderColor: '#FF0000',
    },
    label: {
        fontSize: 11,
        color: color.onPrimaryColor,
    },
});
export default HotDealItem;