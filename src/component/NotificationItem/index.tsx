import { Image, View, Text, ImagePropTypes, StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Avatar } from 'react-native-elements';

// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { userSelector } from '../../modules/user/selectors';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import 'moment/locale/vi'  // without this line it didn't work
moment.locale('vi')

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
        updated_at: string

    }
}

const PostItem = ({ post }: PostsProps) => {
    const navigation = useNavigation();
    const data = { postId: post.id, title: post.title, content: post.content, userId: post.userId, userName: post.name }
    const userInfo = useSelector(userSelector)
    return (
        <View>
            <View style={styles.root}>
                <View style={styles.topContainer}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <FastImage
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 40
                            }}
                            resizeMode={'cover'}
                            source={userInfo?.profile_image ? { uri: userInfo?.profile_image_url } : require('../../image/symbol.png')}
                        />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.content}>
                                {post.title}

                            </Text><Text>{post.content}</Text>
                        </View>

                    </View>



                    <View style={styles.bottomContainer}>


                        <Text numberOfLines={1} style={styles.postTime}><FontAwesome name={'clock-o'} size={22} />{moment(post.updated_at).fromNow()}
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
        width: '100%',
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