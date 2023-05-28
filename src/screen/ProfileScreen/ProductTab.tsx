import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ProductItem from '../../component/ProductItem';

const MyProductList = ({ products }: any) => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{
            justifyContent: 'flex-start'
          }}
          data={productList}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={{ width: '50%', alignSelf: 'center' }}>
              <ProductItem product={item} />
            </View>
          )}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: 120
                }}
              >
                <Text style={{ fontSize: 18 }}>
                  {' '}
                  Không tìm thấy sản phẩm liên quan để hiển thị.
                </Text>
              </View>
            );
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff'
  }
});

export default MyProductList;
