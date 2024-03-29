import { useNavigation } from '@react-navigation/native';
import 'intl';
import 'intl/locale-data/jsonp/en';
import React from 'react';
import { LogBox, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import color from '../../theme/color';
import layout from '../../theme/layout';
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

//10 latest product that have oldprice

//import image from '../../data/image'

const HotDealItem = ({ product }: any) => {
  const navigation = useNavigation<any>();
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
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProductDetail', { data });
      }}
      style={styles.container}
    >
      <View style={styles.bottomContainer}>
        {product.images &&
        product.images?.length > 0 &&
        product.images[0].url &&
        product.images[0].url_full ? (
          <FastImage
            style={styles.image}
            source={{
              uri:
                product.images &&
                product.images?.length > 0 &&
                product.images[0].url &&
                product.images[0].url_full
            }}
          />
        ) : (
          <></>
        )}
        <View style={styles.tittleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {product.name}
          </Text>
        </View>

        <Text style={styles.price}>
          đ
          {new Intl.NumberFormat().format(
            product?.price - product?.price * (product?.discount / 100)
          )}
        </Text>

        <View style={styles.discountLabelContainer}>
          <Text style={styles.label}>{`-${product.discount}%`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 4,
    width: (layout.SCREEN_WIDTH - 5 * 8) / 5
  },
  borderContainer: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: color.surface,
    overflow: 'hidden'
  },
  titleContainer: {
    paddingTop: 12,
    paddingHorizontal: 12,
    height: 52
  },
  /*  root: {
         flexDirection: 'column',
         width: '25%',
         borderWidth: 1,
         borderColor: '#d1d1d1',
         backgroundColor: '#fff',
         borderRadius: 5,
 
     }, */
  image: {
    width: '100%',
    height: 70,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#FF0000'
  },
  /* bottomContainer: {
        padding: 5,
        width: '25%',
        flex: 1.5,
    }, */

  title: {
    fontSize: 13,
    flex: 1,
    marginTop: 5,
    color: '#000'
  },
  price: {
    // marginBottom: 5,
    color: '#FF0000',
    fontSize: 15,
    fontWeight: 'bold'
  },

  text: {
    color: '#000'
  },
  discountLabelContainer: {
    position: 'absolute',
    top: 2,
    right: 2,
    borderRadius: 6,
    paddingVertical: 1,
    paddingHorizontal: 2,
    backgroundColor: '#FF9A9A',
    borderWidth: 1,
    borderColor: '#FF0000'
  },
  label: {
    fontSize: 11,
    color: color.onPrimaryColor
  },
  tittleContainer: {}
});
export default HotDealItem;
