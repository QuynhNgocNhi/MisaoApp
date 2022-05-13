import { Image, View, Text, ImagePropTypes, StyleSheet, LogBox, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Avatar } from 'react-native-elements';

// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';
import { useNavigation } from '@react-navigation/native';
import 'intl';
import 'intl/locale-data/jsonp/en';
import FastImage from 'react-native-fast-image';
import { likePostAPI, likeProductAPI } from '../../services';
LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
//import image from '../../data/image'
interface PostsProps {

    post: {
        id: string,
        name: string,
        categoryId: string,
        location: string,
        askedQuantity: number,
        unitQuantity: string,
        images: any,
        description: string,
        userId: string,
        userName: string,

        time: number,
        timeUnit: string,
        askedTimes: number,

    }
}

const PostItem = ({ post }: any) => {
    const navigation = useNavigation();
    const data = { postId: post.id, title: post.name, content: post.description, userId: post.userId, userName: post.userName }

    const [tempHasFavorite, setTempHasFavorite] = useState(post?.has_favorite)
    const onLikePost = async () => {
        const response = await likePostAPI(post?.id)
        setTempHasFavorite(tempHasFavorite === 0 ? 1 : 0)
    }
    console.log({ post });

    return (
        <View>
            <View style={styles.root}>
                <View style={styles.topContainer}>
                    <TouchableOpacity
                        onPress={onLikePost}
                        style={styles.bookmarkContainer}>

                        <FontAwesome name={tempHasFavorite === 0 ? "bookmark-o" : 'bookmark'} color={color.lightBlack} size={22} />
                    </TouchableOpacity>
                </View>

                <View style={styles.middleContainer}>
                    {post.images && post.images?.length > 0 && post.images[0].url && post.images[0].url_full ? (
                        <FastImage style={styles.image}
                            source={{ uri: post.images && post.images?.length > 0 && post.images[0].url && post.images[0].url_full }} />
                    ) : (
                        <Image style={styles.image} source={require('../../assets/postImage/default_image.png')} />
                    )}
                    <View style={styles.postContent}>

                        <Text onPress={() => { navigation.navigate('PostDetail', { data }); }}
                            numberOfLines={1} style={styles.title}>{post.name}
                        </Text>
                        <Text numberOfLines={1} style={styles.content}>{post.description}
                        </Text>
                        <View style={styles.centerContainer}>


                            <Text numberOfLines={1} style={styles.postLocation}>
                                <FontAwesome name={'map-marker'} size={22} /> {post.seller_address}
                            </Text>


                        </View>
                        <View style={styles.bottomContainer}>
                            <Text numberOfLines={1} style={styles.askedTimes}>{post?.order?.length ? post?.order?.length + 'người quan tâm' : ''}
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
        width: '100%',

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
        top: 0,
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