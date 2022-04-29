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
        location: string,
        askedQuantity: number,
        unitQuantity: string,
        image: string,
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
                    <View style={styles.bookmarkContainer}>

                        <FontAwesome name={'bookmark-o'} color={color.lightBlack} size={22} />
                    </View>
                </View>

                <View style={styles.middleContainer}>
                    <Image style={styles.image} source={post.image} />
                    <View style={styles.postContent}>

                        <Text onPress={() => { navigation.navigate('PostDetail', { data }); }} numberOfLines={2} style={styles.title}>{post.title}
                        </Text>
                        <Text numberOfLines={1} style={styles.content}>{post.content}
                        </Text>
                        <View style={styles.centerContainer}>


                            <Text numberOfLines={1} style={styles.postLocation}><FontAwesome name={'map-marker'} size={22} /> {post.location}
                            </Text>


                        </View>
                        <View style={styles.bottomContainer}>




                            <Text numberOfLines={1} style={styles.askedTimes}>{post.askedTimes} người đang hỏi
                            </Text>
                        </View>
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

        flexDirection: 'row',
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
    postContent: {
        flex: 1,
        paddingTop: 10,
        justifyContent: 'space-between',
    },
    postTime: {

    },
    askedTimes: {
        color: color.normalText,
    },
    image: {
        height: 100,
        width: 100,
        margin: 10,
    },
    centerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
    postLocation: {
        fontSize: 16,
        color: color.primaryColor
    },
    askedQuantity: {
        fontSize: 16,
        color: color.important
    }



});
export default PostItem;