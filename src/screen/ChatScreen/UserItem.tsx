import { Image, View, Text, ImagePropTypes, StyleSheet, LogBox } from 'react-native'
import React, { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Heading6 } from '../../component/Text';
// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';
import NumberFormat from 'react-number-format';
import { Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { userSelector } from '../../modules/user/selectors';



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


const userItem = ({ chatRoom }: any) => {
    const navigation = useNavigation<any>();
    const user = useSelector(userSelector)



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
                source={{ uri: user?.id === chatRoom?.buyer?.id ? chatRoom?.seller?.profile_image_url : chatRoom?.buyer?.profile_image_url }}
            />
            <View style={[styles.userItem, { width: '90%', }]}>

                <View style={styles.userNameContainer}>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>

                        <Text onPress={() => navigation.navigate('ChatRoomScreen', { id: chatRoom?.id })} style={[styles.userName, { fontSize: 18 }]} numberOfLines={1}>{user?.id === chatRoom?.buyer?.id ? chatRoom?.seller?.name : chatRoom?.buyer?.name}</Text>
                        <Text onPress={() => navigation.navigate('ChatRoomScreen', { id: chatRoom?.id })} style={styles.commentTime} numberOfLines={1}>{moment(chatRoom?.last_message?.updated_at).fromNow()}</Text>

                    </View>

                </View>
                <View style={styles.commentContentContainer}>
                    <Text onPress={() => navigation.navigate('ChatRoomScreen', { id: chatRoom?.id })} style={styles.commentContent} numberOfLines={1}>{chatRoom?.last_message?.content ?? 'Hãy bắt đầu trò chuyện'}</Text>

                </View>
            </View>
            {user?.id === chatRoom?.buyer?.id ? chatRoom?.seller?.profile_image : chatRoom?.buyer?.profile_image && (
                <View style={styles.productImageContainer}>

                    <Image onPress={() => navigation.navigate('ChatRoomScreen', { id: chatRoom.id })} style={styles.productImage} source={{ uri: user?.id === chatRoom?.buyer?.id ? chatRoom?.seller?.profile_image_url : chatRoom?.buyer?.profile_image_url }} />
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