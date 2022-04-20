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
        categoryId: string,
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

                    <View style={styles.userContainer}>
                        <Avatar
                            size="medium"
                            rounded
                            source={post.avatar}
                        />

                        <Text style={styles.content}><Text onPress={() => navigation.navigate('UserProfileScreen')}
                            style={styles.userName} numberOfLines={2}>{post.name}

                        </Text> {post.content}</Text>

                    </View>



                    <View style={styles.bottomContainer}>


                        <Text numberOfLines={1} style={styles.postTime}><FontAwesome name={'clock-o'} size={22} /> {post.time} {post.timeUnit} trước
                        </Text>


                    </View>
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
        width: '100%',
    },

    topContainer:
    {
        width: '90%',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 5,
    },
    userContainer:
    {
        margin: 5,
        flexDirection: 'row',


    },
    bookmarkContainer: {
        position: 'absolute',
        top: 10,
        right: 0,

    },

    userName: {

        paddingLeft: 10,
        paddingRight: 10,
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