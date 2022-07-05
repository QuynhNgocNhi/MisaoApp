import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProductItem from '../../component/ProductItem';
//import data
import products from '../../assets/data/product';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import color, layout, style
import color from '../../theme/color';
import { getListBuyRequestFavoriteAPI } from '../../services';
import PostItem from '../../component/PostItem';


const PostsSaved = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [productList, setProductList] = useState<any>([])
    const fetchData = async () => {
        setLoading(true)
        const response = await getListBuyRequestFavoriteAPI()
        if (response.__typename !== 'ErrorResponse') {
            setProductList(response.data)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])



    if (loading) {
        return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator animating />
        </View>)
    }
    return (
        <SafeAreaProvider style={styles.screenContainer}>
            <StatusBar translucent backgroundColor='transparent' />
            <FlatList
                data={productList}
                renderItem={({ item }) => <PostItem post={item} />}
            />
        </SafeAreaProvider>
    );
};
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,

        backgroundColor: color.background,
    },
    container: {
        flex: 1,
        width: '90%',
        paddingTop: 20
    },

    middleContainer: {


    },
    topContent: {

        height: 160,

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

export default PostsSaved