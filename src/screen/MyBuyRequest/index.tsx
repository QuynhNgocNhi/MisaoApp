import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MyPostItem from '../../component/MyPostItem';
//import data
import products from '../../assets/data/product';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';
import { getListMyBuyRequestAPI } from '../../services';


const MyBuyRequest = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [postList, setPostList] = useState<any>([])
    const fetchData = async () => {
        setLoading(true)
        const response = await getListMyBuyRequestAPI()
        if (response.__typename !== 'ErrorResponse') {
            setPostList(response.data)
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
        <SafeAreaProvider>

            <SafeAreaView style={styles.screenContainer}>
                <StatusBar translucent backgroundColor='transparent' />
                <View style={styles.container}>

                    <FlatList
                        contentContainerStyle={styles.PostItemList}
                        data={postList}

                        renderItem={({ item }) => <MyPostItem post={item} />}
                    />

                </View>

            </SafeAreaView>
        </SafeAreaProvider>
    );
};
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: color.background,
    },
    container: {
        flex: 1,
        width: '100%',

    },
    PostItemList: {
        flex: 1,
        width: '100%',
    }


});

export default MyBuyRequest