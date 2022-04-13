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
        CategoryId: string,
        CategoryName: string,
        CategoryImage: string,

    }
}


const CategoryList = ({ item }: CategoryItemProps) => {
    useEffect(() => {

        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    }, [])
    return (
        <View style={styles.container}>

            <View style={styles.bottomContainer}>

                <Image style={styles.image} source={item.image} />
                <View style={styles.tittleContainer}>
                    <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
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
    
    image: {

        width: '100%',
        height: 80,
        resizeMode: 'cover',
        
    },
   
    title: {
        flex: 1,
        marginTop: 5,
        color: '#000',
        fontSize: 16
    },
  
    
    text: {

        color: '#000',

    },
   
});
export default CategoryList;