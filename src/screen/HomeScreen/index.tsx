import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import ProductItem from '../../component/ProductItem';
import products from '../../data/product';
const HomeScreen = () => {
  return (
    <View style={styles.page}>
      {/* Render Product Component */}
      <View style={styles.root}>

      <Text style={styles.title}>Hello World!</Text>
      </View>
      <ProductItem item = {products[0]}/>
      <ProductItem item = {products[1]}/>
      <ProductItem item = {products[2]}/>
    </View>

  );
};
const styles = StyleSheet.create({
  page: {
    padding: 10,
    width: '100%',

  },
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    backgroundColor: '#fff',
    borderRadius: 5,

  },
  title: {
    color: '#000',
    fontSize: 22,
    backgroundColor: '#fff',
    fontWeight: 'bold',

  }
});

export default HomeScreen