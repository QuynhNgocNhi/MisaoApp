import { Image, View, Text, ImagePropTypes, StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Avatar } from 'react-native-elements';

// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';
import { useNavigation } from '@react-navigation/native';


//import image from '../../data/image'
interface PostsProps {

    post: {
        id: string,
        title: string,
        content: string,
        userId: string,
        name: string,
        avatar: string,
        time: number,
        timeUnit: string,
        askedTimes: number,

    }
}

const PostItem = ({ post }: PostsProps) => {
    const navigation = useNavigation();
    const data = { postId: post.id, title: post.title, content: post.content, userId: post.userId, userName: post.name }

    return (
        <View>
            <View style={styles.root}>
                <View style={styles.topContainer}>


                </View>

                <View style={styles.middleContainer}>
                    <View style={styles.topContainer}>

                        <Text onPress={() => { navigation.navigate('PostDetail', { data }); }} numberOfLines={1} style={styles.title}>{post.title}
                        </Text>
                        {post.availability == 1 ? (
                            <Text style={styles.stillsAvailable} >Còn mua</Text>) : (
                            <Text style={styles.outOfAvailability} >Hết mua</Text>
                        )}
                    </View>
                    <Text numberOfLines={1} style={styles.content}>{post.content}
                    </Text>
                </View>
                <View style={styles.bottomContainer}>


                    <Text numberOfLines={1} style={styles.postTime}><FontAwesome name={'clock-o'} size={22} /> {post.time} {post.timeUnit} trước
                    </Text>

                    <Text numberOfLines={1} style={styles.askedTimes}>{post.askedTimes} người đang hỏi
                    </Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({

    root: {
        width: '85%',
        flexDirection: 'column',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#d1d1d1',
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingTop: 5

    },

    topContainer:
    {

        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    userContainer:
    {
        flexDirection: 'row',


    },
    bookmarkContainer: {
        position: 'absolute',
        top: 10,
        right: 0,

    },

    userName: {
        margin: 5,
        paddingLeft: 10,
        fontWeight: 'bold',
        color: '#000',
        fontSize: 20
    },
    middleContainer: {
        width: '90%',
    },
    title: {
        width: '70%',
        marginBottom: 0,
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',

    },
    content: {

        marginTop: 0,
        color: '#000',
        fontSize: 18,


    },
    bottomContainer: {

        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 5,


    },
    postTime: {

    },
    stillsAvailable: {
        fontSize: 16, fontWeight: 'bold',
        color: color.primaryColorLight,
        borderWidth: 1, padding: 5,
        borderRadius: 20,
        borderColor: color.primaryColorLight,

    },
    outOfAvailability: {
        fontSize: 16, fontWeight: 'bold',
        color: color.disabledText,
        borderWidth: 1, padding: 5,
        borderRadius: 20,
        borderColor: color.important,

    }

});
export default PostItem;