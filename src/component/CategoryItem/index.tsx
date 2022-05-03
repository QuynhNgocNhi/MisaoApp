import { Image, View, Text, ImagePropTypes, StyleSheet, LogBox, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react';
// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';




//10 latest product that have oldprice

interface categoryItemProps {
    category: {
        value: number,
        label: string,
        image: string,
    }
}


const CategoryItem = ({ category }: categoryItemProps) => {
    const navigation = useNavigation();
    const data = { categoryId: category.value, categoryName: category.label }

    return (
        <TouchableOpacity
            onPress={() => { navigation.navigate('ProductSearchedByCategory', { data }); }}
            style={styles.container}>

            <View style={styles.bottomContainer}>
                <FastImage resizeMode={FastImage.resizeMode.cover}
                    style={styles.image}
                    source={{ uri: category.image }} />
                <View style={styles.tittleContainer}>
                    <Text style={styles.title}

                        numberOfLines={2}>{category.label}</Text>
                </View>
            </View>
        </TouchableOpacity>

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