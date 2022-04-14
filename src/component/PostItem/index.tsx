import { Image, View, Text, ImagePropTypes, StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Avatar } from 'react-native-elements';

// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';


//import image from '../../data/image'
interface PostsProps {
    /*  user: {
         id: string,
         name: string,
         avatar: string,
 
 
     }, */
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
    return (
        <View>
            <View style={styles.root}>
                <View style={styles.topContainer}>

                    <View style={styles.userContainer}>
                        <Avatar
                            size="medium"
                            rounded
                            source={post.avatar}
                        />

                        <Text style={styles.userName} numberOfLines={1}>{post.name}</Text>
                    </View>
                    <View style={styles.bookmarkContainer}>

                        <FontAwesome name={'bookmark-o'} color={color.lightBlack} size={22} />
                    </View>
                </View>

                <View style={styles.middleContainer}>

                    <Text numberOfLines={1} style={styles.title}>{post.title}
                    </Text>
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
        flexDirection: 'column',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#d1d1d1',
        backgroundColor: '#fff',
        borderRadius: 5,

    },

    topContainer:
    {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
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

    }

});
export default PostItem;