import { Image, View, Text, ImagePropTypes, StyleSheet, LogBox } from 'react-native'
import React, { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Heading6 } from '../Text';
// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';
import { useNavigation } from '@react-navigation/native';




//10 latest product that have oldprice

//import image from '../../data/image'
interface categoryItemProps {
    category: {
        id: string,
        name: string,
        image: string,


    }
}


const CategoryItem = ({ category }: categoryItemProps) => {
    const navigation = useNavigation();

    const data = { categoryId: category.id, categoryName: category.name }
    return (
        <View style={styles.container}>

            <View style={styles.bottomContainer}>

                <Image style={styles.image} source={category.image} />
                <View style={styles.tittleContainer}>
                    <Text style={styles.title}
                        onPress={() => { navigation.navigate('PostSearchedByCategory', { data }); }}
                        numberOfLines={2}>{category.name}</Text>
                </View>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {

        margin: 5,
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

        height: 70,
        width: 70,

    },

    title: {
        flex: 1,
        marginTop: 5,
        color: '#000',
        fontSize: 16,
        textAlign: 'center'
    },


    text: {

        color: '#000',

    },

});
export default CategoryItem;