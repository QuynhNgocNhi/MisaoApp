import React, { useRef } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Image } from 'react-native';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeHeader from '../../component/AnimatedHeader';
import CategoryList from '../../component/CategoryList';
import PostItem from '../../component/PostItem';
//import data
import category from '../../assets/data/category';
import post from '../../assets/data/post';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';


const HomeScreen = () => {


    return (
        <SafeAreaProvider>

            <SafeAreaView style={styles.screenContainer}>
                <StatusBar translucent backgroundColor='transparent' />

                <View style={styles.container}>


                    {/* Add the following AnimatedHeader */}
                    <ScrollView
                        nestedScrollEnabled={false}
                    >


                        {/* Render Product Component */}
                        {/* <ProductItem item = {products[0]}/> */}
                        <View style={styles.middleContainer}>


                            <View style={styles.centerContent}>


                                <View style={styles.hotDealContentainer}>
                                    <View style={styles.titleContainer}>
                                        <Heading6 style={[styles.titleText, { color: color.lightBlack }]}>Danh mục </Heading6>



                                    </View>
                                </View>
                                <View style={styles.CategoryListContainer}>

                                    <FlatList
                                        horizontal
                                        data={category}
                                        showsHorizontalScrollIndicator={false}
                                        alwaysBounceHorizontal={false}
                                        keyExtractor={item => item.id}
                                        renderItem={({ item }) => <CategoryList item={item} />}
                                    />
                                </View>

                            </View>
                        </View>
                        <View style={styles.bottomContainer}>
                            <View style={styles.productListContentainer}>
                                <View style={styles.titleContainer}>
                                    <Heading6 style={[styles.titleText, { color: color.lightBlack }]}>Mới nhất </Heading6>


                                    <FontAwesome name={'filter'} color={color.lightBlack} size={18} />

                                </View>
                            </View>
                            <FlatList
                                contentContainerStyle={styles.ProductItemList}
                                data={post}

                                renderItem={({ item }) => <PostItem post={item} />}
                            />
                        </View>
                    </ScrollView>

                </View>

            </SafeAreaView>
        </SafeAreaProvider>
    );
};
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        // backgroundColor: colors.themeBackground,
    },
    container: {
        flex: 1,
    },

    middleContainer: {


    },
    topContent: {

        height: 160,
        backgroundColor: color.white,
    },
    banner: {

        backgroundColor: color.themeBackground,
        height: '50%',
        alignItems: 'center',




    },
    imageContainer: {
        width: '90%',
        height: 150,
        borderRadius: 20,
        //set box shadow fo image
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 16,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        flex: 1,
        width: '100%',
        borderRadius: 20,

    },
    bottomContainer: {

        width: '100%',

    },
    centerContent: {

        backgroundColor: color.white,


    },
    hotDealContentainer: {
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 16,
        paddingBottom: 12,
        backgroundColor: color.white,
    },
    titleText: {
        fontWeight: '600',
        color: '#FF0000',

    },
    viewAllText: {
        color: color.primaryColor,
    },
    hotDeal: {
        width: '80%',
        alignSelf: 'center',

    },
    CategoryListContainer: {
        padding: 10,
    },
    ProductItemList: {

    }
});

export default HomeScreen