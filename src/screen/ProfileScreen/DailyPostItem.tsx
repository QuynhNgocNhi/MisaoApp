import React from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image, TextInput } from 'react-native';
import { Heading6 } from '../../component/Text';
import ProductItem from '../../component/ProductItem';
import products from '../../assets/data/product';
import { Icon } from 'react-native-elements';
// import color, layout, style
import color from '../../theme/color';

import MyPostItem from '../../component/MyPostItem';
//import data
import category from '../../assets/data/category';
import post from '../../assets/data/post';


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
        dateCreated: string,

    }
}

const MyProductList = ({ date }) => {
    /*  const PostSortedByDate = [...post].filter */

    return (



        <View style={styles.container}>
            <View style={styles.leftComponent}>


                <Icon

                    name='dot-fill'
                    type='octicon'
                    color={color.primaryColor}
                    size={45}

                />


                <View style={styles.verticleLine}></View>
            </View>
            <View style={styles.centerComponent}>

                <Text style={styles.titleText}>{date}</Text>

                <FlatList
                    contentContainerStyle={{ minHeight: `100%` }}
                    scrollEnabled={true}

                    data={post}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ flex: 1 }}>
                                {
                                    item.dateCreated == date && (
                                        <MyPostItem post={item}
                                            contentContainerStyle={styles.myPostItem}
                                            scrollEnabled={false}
                                        />
                                    )
                                }
                            </View>
                        )
                    }}
/*                     renderItem={({ item }) => <PostItem post={item} />}
 */                />
            </View>



        </View>);
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    leftComponent: {
        padding: 10,


    },
    centerComponent: {
        paddingTop: 18,
        flex: 1,

    },
    verticleLine: {

        height: '100%',
        alignSelf: 'center',
        width: 2,
        backgroundColor: '#909090',
    },
    timeLineComponent: {
        flexDirection: 'row',
    },
    titleText: {
        fontSize: 20,
        color: color.primaryText,
        fontWeight: '600',
        alignSelf: 'flex-start',
        paddingLeft: 10,
    },
    postListContainer: {
        marginTop: 10,

    }
})

export default MyProductList