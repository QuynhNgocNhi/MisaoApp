import React from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image, TextInput } from 'react-native';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProductItem from '../../component/ProductItem';
import products from '../../assets/data/product';
import DailyPostItem from './DailyPostItem';
import PostItem from '../../component/PostItem';
const MyProductList = ({ buyRequest }: any) => (
    <View style={styles.container}>
        <FlatList
            ListEmptyComponent={() => {
                return (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 120 }}>
                        <Text style={{ fontSize: 18 }}> Không tìm thấy tin mua liên quan để hiển thị.</Text>
                    </View>
                )
            }}
            contentContainerStyle={styles.PostItemList}

            data={buyRequest}
            renderItem={({ item }) => <PostItem post={item} />}
        />

    </View>

    // <ScrollView style={styles.container}>
    //     <DailyPostItem date={'01-07-2021'} />
    //     <DailyPostItem date={'01-06-2021'} />
    //     <DailyPostItem date={'21-05-2021'} />
    // </ScrollView>


);



const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#ffffff',

    },
    PostItemList: {
        width: '100%',

    },
})

export default MyProductList