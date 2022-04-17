import { Image, View, Text, ImagePropTypes, StyleSheet, LogBox } from 'react-native'
import React, { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Heading6 } from '../../component/Text';
// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';
import NumberFormat from 'react-number-format';
import { Avatar } from 'react-native-elements';


//import image from '../../data/image'
interface userItemProps {
    User: {
        id: string,
        chatTypeId: string,
        productId: string,
        content: string,
        userId: string,
        name: string,
        avatar: string,
        hour: number,
        minute: number,
        timePeriod: number,
        productImage?: string,
    }
}


const userItem = ({ User }: userItemProps) => {
    useEffect(() => {

        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    }, [])
    return (
        <View style={styles.chatItemContainer}>

            <Avatar
                size="medium"
                rounded
                containerStyle={{
                    borderColor: 'grey',
                    borderStyle: 'solid',
                    borderWidth: 1,
                }}
                source={User.avatar}
            />
            <View style={[styles.userItem, { width: User.productImage ? '70%' : '90%', }]}>

                <View style={styles.userNameContainer}>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>

                        <Text style={[styles.userName, { fontSize: 18 }]} numberOfLines={1}>{User.name}</Text>
                        <Text style={styles.commentTime} numberOfLines={1}>{User.hour}:{User.minute} {User.timePeriod == 0 ? ('AM') : ('PM')}</Text>

                    </View>

                </View>
                <View style={styles.commentContentContainer}>
                    <Text style={styles.commentContent} numberOfLines={1}>{User.content}</Text>

                </View>
            </View>
            {User.productImage && (
                <View style={styles.productImageContainer}>

                    <Image style={styles.productImage} source={User.productImage} />
                </View>
            )}



        </View>
    )
}
const styles = StyleSheet.create({
    chatItemContainer: {
        flexDirection: 'row',
        width: '95%',
        paddingBottom: 10,
        justifyContent: 'flex-start',

        alignItems: 'center',
        alignSelf: 'center'
    },

    userItem: {

        padding: 10,
        alignSelf: 'center',

    },
    userNameContainer: {

        flexDirection: 'row',
        justifyContent: 'flex-start',

        alignItems: 'center',
    },
    userName: {
        fontWeight: '600',
        color: '#000',
        fontSize: 20
    },
    commentTime: {
        paddingLeft: 10,
    },
    commentContentContainer: {

        flexDirection: 'row',
        alignItems: 'center',


    },
    commentContent: {

        fontSize: 16,

    },
    productImageContainer: {


    },
    productImage: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: color.borderColor,
    }
});
export default userItem;