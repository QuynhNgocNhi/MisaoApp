import React from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image, TextInput } from 'react-native';
import { Heading6 } from '../../component/Text';
import ProductItem from '../../component/ProductItem';

import { Icon } from 'react-native-elements';
// import color, layout, style
import color from '../../theme/color';

import MyPostItem from '../../component/MyPostItem';
//import data
import category from '../../assets/data/category';
import post from '../../assets/data/post';
import product from '../../assets/data/product';
import ProductHistoryItem from './ProductHistoryItem';
import PostHistoryItem from './PostHistoryItem';


const MyProductList = ({ date, data }: any) => {
    /*  const PostSortedByDate = [...post].filter */
    console.log({ data });

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

                    scrollEnabled={true}

                    data={data}
                    renderItem={({ item, index }) => {
                        return (data.limited_date ? (<View>
                            <PostHistoryItem post={item}
                                contentContainerStyle={styles.myPostItem}
                                scrollEnabled={false}
                            />
                        </View>) : (

                            <View>
                                <ProductHistoryItem product={item}
                                    contentContainerStyle={styles.myPostItem}
                                    scrollEnabled={false}
                                />
                            </View>
                        ))
                    }}
                />
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