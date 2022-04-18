import React from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image, TextInput } from 'react-native';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProductItem from '../../component/ProductItem';
import products from '../../assets/data/product';
import HistoryTimeStampItem from './HistoryTimeStampItem';
const MyProductList = () => (


    <ScrollView style={styles.container}>
        <HistoryTimeStampItem date={'01-07-2021'} />
        <HistoryTimeStampItem date={'01-06-2021'} />
        <HistoryTimeStampItem date={'21-05-2021'} />
    </ScrollView>


);



const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#ffffff',

    }
})

export default MyProductList