import { Image, View, Text, ImagePropTypes, StyleSheet, LogBox } from 'react-native'
import React, { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Heading6 } from '../../component/Text';
// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';
import NumberFormat from 'react-number-format';
import { Icon } from 'react-native-elements';

interface ItemProps {
    item: {
        id: string,
        content: string,
        userId: string,


    }
}

const RecentSearchItem = ({ item }: ItemProps) => {

    return (
        <View style={styles.recentSearchItem}>
            <Icon
                name='time-outline'
                type='ionicon'
                color={color.borderColor}
                size={30}
            />
            <Text numberOfLines={1} style={{ fontSize: 18, color: color.normalText, textAlign: 'left', width: '70%', alignSelf: 'center' }}>

                {item.content}</Text>
            <Icon
                name='cross'
                type='entypo'
                color={color.borderColor}
                size={30}
            />
        </View>

    )
}
const styles = StyleSheet.create({
    recentSearchItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    }
});
export default RecentSearchItem;