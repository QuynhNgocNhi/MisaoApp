import { Image, View, Text, ImagePropTypes, StyleSheet, LogBox, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Heading6 } from '../../component/Text';
// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';
import NumberFormat from 'react-number-format';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { masterDataSelector } from '../../modules/search/selectors';
const RecentSearchItem = ({ item, onSearchWithKeyword }: any) => {
    console.log({ item });

    const categories = useSelector(masterDataSelector)


    return (
        <TouchableOpacity
            onPress={() => onSearchWithKeyword(item?.query?.keyword ? item?.query?.keyword : categories?.find((e: any) => e.value == item?.query?.category_id)?.label)}
            style={styles.recentSearchItem}>
            <Icon
                name='time-outline'
                type='ionicon'
                color={color.borderColor}
                size={30}
            />
            <Text numberOfLines={1} style={{ marginLeft: 20, fontSize: 18, color: color.normalText, textAlign: 'left', width: '70%', alignSelf: 'center' }}>
                {item?.query?.keyword ? item?.query?.keyword : categories?.find((e: any) => e.value == item?.query?.category_id)?.label}</Text>
            {/* <Icon
                name='cross'
                type='entypo'
                color={color.borderColor}
                size={30}
            /> */}
        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    recentSearchItem: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginBottom: 10
    }
});
export default RecentSearchItem;