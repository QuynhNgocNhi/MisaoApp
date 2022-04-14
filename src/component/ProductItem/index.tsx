import { Image, View, Text, ImagePropTypes, StyleSheet, LogBox } from 'react-native'
import React, { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Heading6 } from '../../component/Text';
// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';
import NumberFormat from 'react-number-format';


//import image from '../../data/image'
interface ProductItemProps {
  item: {
    id: string,
    title: string,
    image: string,
    price: number,
    oldPrice?: number,
    discountPercentage?: number,
    unitPrice: string,
    askedTimes: number,
    //for optional props: oldPrice? 

  }
}


const ProductItem = ({ item }: ProductItemProps) => {
  useEffect(() => {

    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, [])
  return (
    <View style={styles.container}>

      <View style={styles.bottomContainer}>

        <Image style={styles.image} source={item.image} />
        <View style={styles.tittleContainer}>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        </View>


        <View style={styles.unitPriceRow}>

          <Text style={styles.price}>đ{item.price}
            {item.oldPrice && (<Text style={styles.oldPrice}> ${item.oldPrice}</Text>)}

          </Text>
          <Text style={styles.unitPrice}> {item.unitPrice} </Text>
        </View>
        <Text style={styles.askedTimes}> {item.askedTimes} người đang hỏi </Text>

        {item.discountPercentage && (<View style={styles.discountLabelContainer}>
          <Text style={styles.label}>{`- ${item.discountPercentage}%`}</Text>

        </View>)}
        <View style={styles.wishlistContainer}>
          <FontAwesome style={styles.wishlist} name={"heart-o"} color={'#FF0000'} size={24} />
        </View>
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
  price: {
    marginLeft: 10,

    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',

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