import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

// import color, layout, style
import { useNavigation } from '@react-navigation/native';
import color from '../../theme/color';

interface productProps {
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    oldPrice?: number;
    discountPercentage?: number;
    unitPrice: string;
    askedTimes: number;
    userId: string;
    userName: string;
    userAvatar: string;
    time: number;
    timeUnit: string;
    dateCreated: string;
    availability: number;
  };
}
const ProductHistoryItem = ({ product }: productProps) => {
  const navigation = useNavigation();
  const data = {
    productId: product.id,
    productName: product.name,
    productDescription: product.description,
    productPrice: product.price,
    oldPrice: product.oldPrice,
    productImage: product.image,
    productDiscount: product.discountPercentage,
    productUnitPrice: product.unitPrice,
    productAskTime: product.askedTimes,
    userId: product.userId,
    userName: product.userName,
    userAvatar: product.userAvatar,
    time: product.time,
    timeUnit: product.timeUnit
  };
  return (
    <View>
      <View style={styles.root}>
        <View style={styles.topContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.productImage}
              source={{ uri: product.images && product.images[0]?.url_full }}
            />
          </View>
          <View style={styles.middleContainer}>
            <Text
              onPress={() => {
                navigation.navigate('ProductDetail', { data });
              }}
              numberOfLines={1}
              style={styles.title}
            >
              {product.name}
            </Text>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text
                numberOfLines={1}
                style={[styles.content, { color: color.important }]}
              >
                {new Intl.NumberFormat().format(
                  product?.price - product?.price * (product?.discount / 100)
                )}{' '}
                đ/{product.unitPrice}
              </Text>
              <Text numberOfLines={1} style={styles.content}>
                {product.askedTimes} {product.unitPrice}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    width: '95%',
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#d1d1d1',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginTop: 10
  },

  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userContainer: {
    flexDirection: 'row'
  },
  bookmarkContainer: {
    position: 'absolute',
    top: 10,
    right: 0
  },

  userName: {
    margin: 5,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: '#000',
    fontSize: 20
  },
  middleContainer: {
    width: '80%',
    marginLeft: 10
  },
  title: {
    marginBottom: 0,
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold'
  },
  content: {
    marginTop: 0,
    color: '#000',
    fontSize: 18
  },
  bottomContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 5
  },
  productTime: {},
  imageContainer: {},
  productImage: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: color.borderColor
  }
});
export default ProductHistoryItem;
