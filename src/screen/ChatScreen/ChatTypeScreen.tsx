import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { BuyList } from './BuyList';


import OtherList from './OtherList';
import { SellList } from './SellList';
const ChatTypeScreen = ({ chatTypeId, data } : any) => (
    <View style={styles.container}>
        {chatTypeId === '1' ? (<SellList data={data}/>) : <BuyList data={data}/>}
    </View>
);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    }
})

export default ChatTypeScreen