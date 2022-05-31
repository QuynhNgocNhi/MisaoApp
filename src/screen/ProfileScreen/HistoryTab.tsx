import React from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image, TextInput } from 'react-native';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProductItem from '../../component/ProductItem';
import products from '../../assets/data/product';
import HistoryTimeStampItem from './HistoryTimeStampItem';
import { G } from 'react-native-svg';
import moment from 'moment';
const MyProductList = ({ orders }: any) => {
    console.log({ orders });
    const groupBy = (_k: any, a: any) => a.reduce((r: any, { [_k]: k, ...p }) => ({
        ...r, ...{
            [k]: (
                r[k] ? [...r[k], { ...p }] : [{ ...p }]
            )
        }
    }), {});

    let grouped = groupBy('updated_at', orders);
    let keys = Object.keys(grouped);
    return (
        <ScrollView style={styles.container}>
            {keys.map((key, index) => (
                <HistoryTimeStampItem data={grouped[key]} key={index} date={moment(key).format('DD-MM-YYYY')} />
            ))}
        </ScrollView>


    );
}



const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#ffffff',

    }
})

export default MyProductList