import React from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image, TextInput } from 'react-native';
import { Heading6 } from '../../component/Text';
import ProductItem from '../../component/ProductItem';
import products from '../../assets/data/product';

const MyProductList = () => (
    <View style={styles.container}>
        <FlatList
            contentContainerStyle={styles.ProductItemList}
            data={products}
            numColumns={2}
            renderItem={({ item }) => <ProductItem item={item} />}
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