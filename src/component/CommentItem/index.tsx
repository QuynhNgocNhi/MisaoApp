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
interface commentItemProps {
    comment: {
        id: string,
        productId: string,
        content: string,
        userId: string,
        name: string,
        avatar: string,
        time: number,
        timeUnit: string,
    }
}


const commentItem = ({ comment }: commentItemProps) => {
    useEffect(() => {

        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    }, [])
    return (
        <View style={styles.commentItem}>

            <View style={styles.userNameContainer}>
                <Avatar
                    size="small"
                    rounded
                    containerStyle={{
                        borderColor: 'grey',
                        borderStyle: 'solid',
                        borderWidth: 1,
                    }}
                    source={comment.avatar}
                />
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>

                    <Text style={[styles.userName, { fontSize: 18, paddingLeft: 0 }]} numberOfLines={1}>{comment.name}</Text>
                    <Text style={styles.commentTime} numberOfLines={1}>{comment.time} {comment.timeUnit} trước</Text>

                </View>

            </View>
            <View style={styles.commentContentContainer}>

                <Text style={styles.commentContent} numberOfLines={2}>{comment.content}</Text>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({


    commentItem: {
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,

    },
    userNameContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-start',

        alignItems: 'center',
    },
    userName: {
        margin: 5,
        paddingLeft: 5,
        fontWeight: '600',
        color: '#000',
        fontSize: 20
    },
    commentTime: {
        paddingLeft: 10,
    },
    commentContentContainer: {
        width: '100%',



    },
    commentContent: {
        fontSize: 18,
        width: '90%',
        alignSelf: 'flex-end',



    },
});
export default commentItem;