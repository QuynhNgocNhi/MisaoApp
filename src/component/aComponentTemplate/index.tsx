import { Image, View, Text, ImagePropTypes, StyleSheet, LogBox } from 'react-native'
import React, { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Heading6 } from '../../component/Text';
// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';
import NumberFormat from 'react-number-format';


//import image from '../../data/image'
interface ItemProps {
    item: {
        id: string,
        title: string,
        image: string,
        price: number,
        oldPrice?: number,
        discountPercentage?: number,
        unitPrice: string,
        askedTimes: number,
        //for optional props: oldPrice? 

    }
}


const Item = ({ item }: ItemProps) => {
    useEffect(() => {

        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    }, [])
    return (
        <View>

        </View>

    )
}
const styles = StyleSheet.create({

});
export default Item;