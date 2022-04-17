import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import BuyList from './BuyList';
import SellList from './SellList';
import OtherList from './OtherList';
const ChatTypeScreen = ({ chatTypeId }) => (
    <View style={styles.container}>
        {chatTypeId === '1' ? (<SellList />) : (chatTypeId === '2' ? (<BuyList />) : (<OtherList />))}


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