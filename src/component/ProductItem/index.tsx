import { Image, View, Text, ImagePropTypes, StyleSheet, LogBox, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Heading6 } from '../../component/Text';
// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';
import NumberFormat from 'react-number-format';
import { useNavigation } from '@react-navigation/native';
import 'intl';
import 'intl/locale-data/jsonp/en';
import FastImage from 'react-native-fast-image';
import { likeProductAPI } from '../../services';
LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
//import image from '../../data/image'
interface ProductItemProps {
  product: {
    id: string,
    name: string,
    description: string,
    image: string,
    price: number,
    oldPrice?: number,
    discountPercentage?: number,
    unitPrice: string,
    askedTimes: number,
    userId: string,
    userName: string,
    userAvatar: string,
    time: number,
    timeUnit: string,
    dateCreated: string,
    availability: number,
    discount: number,
    images: any

    //for optional props: oldPrice? 

  }
}


const ProductItem = ({ product }: any) => {
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
    timeUnit: product.timeUnit,
  }
  const [tempHasFavorite, setTempHasFavorite] = useState(product?.has_favorite)
  const onLikeProduct = async () => {
    const response = await likeProductAPI(product?.id)
    setTempHasFavorite(tempHasFavorite === 0 ? 1 : 0)
  }

  return (
    <View style={styles.container} >
      <View style={styles.bottomContainer}>
        {product.images && product.images?.length > 0 && product.images[0].url && product.images[0].url_full ? (
          <FastImage style={styles.image}
            source={{ uri: product.images && product.images?.length > 0 && product.images[0].url && product.images[0].url_full }} />
        ) : (
          <></>
        )}
        <View style={styles.tittleContainer}>
          <Text onPress={() => { navigation.navigate('ProductDetail', { data }); }}
            style={styles.title} numberOfLines={2}>{product?.name}</Text>
        </View>


        <View style={styles.unitPriceRow}>

          <Text style={styles.price}>đ{new Intl.NumberFormat().format(product?.price)}
            {/* {product.oldPrice && (<Text style={styles.oldPrice}> ${product.oldPrice}</Text>)} */}

          </Text>
          <Text style={styles.unitPrice}> {product?.unit} </Text>
        </View>
        <Text style={styles.askedTimes}> {product?.order?.length ? (product?.order?.length) : '0'} người đang hỏi</Text>

        {product.discount && (<View style={styles.discountLabelContainer}>
          <Text style={styles.label}>{`- ${product?.discount}%`}</Text>

        </View>)}
        <TouchableOpacity
          onPress={onLikeProduct}
          style={styles.wishlistContainer}>
          <FontAwesome style={styles.wishlist} name={tempHasFavorite === 0 ? "heart-o" : 'heart'} color={'#FF0000'} size={24} />
        </TouchableOpacity>
      </View>
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    width: (layout.SCREEN_WIDTH) / 2,
    borderWidth: 0.5,
    borderColor: color.borderColor,
  },
  borderContainer: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: color.surface,
    overflow: 'hidden',
  },
  titleContainer: {
    paddingTop: 12,
    paddingHorizontal: 12,
    height: 52,
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
    alignSelf: 'center',

    width: '80%',
    marginTop: 15,
    height: 150,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: color.borderColor,
  },
  /* bottomContainer: {
      padding: 5,
      width: '25%',
      flex: 1.5,
  }, */

  title: {
    flex: 1,
    margin: 10,
    color: '#000',
    fontSize: 16
  },
  price: {
    marginBottom: 5,
    marginLeft: 5,
    color: '#FF0000',
    fontSize: 16,
    fontWeight: 'bold',

  },

  discountLabelContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
    borderRadius: 2,
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: '#FF9A9A',
    borderWidth: 1,
    borderColor: '#FF0000',
  },
  label: {
    fontSize: 12,
    color: color.onPrimaryColor,
  },
  wishlistContainer: {
    position: 'absolute',
    top: 0,
    right: 0,

  },
  wishlist: {
    opacity: 0.5,
  },
  oldPrice: {

    color: '#000',
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  text: {
    marginLeft: 10,
    color: '#000',

  },
  unitPriceRow: {

    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  unitPrice: {
    marginRight: 10,

    fontSize: 16,

  },
  askedTimes: {
    marginRight: 10,
    alignSelf: 'flex-end',
    paddingBottom: 5,
  },

});
export default ProductItem;