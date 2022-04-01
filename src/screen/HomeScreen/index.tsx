import React from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import ProductItem from '../../component/ProductItem';
import products from '../../assets/product';
// import colors, layout
import colors from '../../theme/color';

const HomeScreen = () => {
  return (
    <View style={styles.page}>
      {/* Render Product Component */}
      <View style={styles.root}>

      <Text style={styles.title}>Misao</Text>
      </View>
      {/* <ProductItem item = {products[0]}/> */}
      
      <FlatList 
      data = {products}
      renderItem = {({item})=><ProductItem item={item}/>}
      />
    </View>

  );
};
const styles = StyleSheet.create({
  page: {
    padding: 10,
    width: '100%',
    backgroundColor: colors.themeBackground,
  },
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.background,
    borderRadius: 5,

  },
  title: {
    color: colors.primaryColor,
    fontSize: 28,
    fontWeight: 'bold',


  }
});

export default HomeScreen