import React from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image, TextInput } from 'react-native';
import ProductItem from '../../component/ProductItem';

const MyProductList = ({ products }: any) => (
    <View style={styles.container}>
        <FlatList
            // contentContainerStyle={styles.ProductItemList}
            ListEmptyComponent={() => {
                return (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 120 }}>
                        <Text style={{ fontSize: 18 }}> Không tìm thấy sản phẩm liên quan để hiển thị.</Text>
                    </View>
                )
            }}
            data={products}
            numColumns={2}
            renderItem={({ item }) => <ProductItem product={item} />}
        />

    </View>
);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    }
})

export default MyProductList