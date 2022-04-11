import { Image, View, Text, ImagePropTypes, StyleSheet, FlatList} from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {  Heading6 } from '../../component/Text';


//10 latest product that have oldprice

//import image from '../../data/image'
interface ProductItemProps {
    item: {
        id: string,
        title: string,
        image: string,
        price: number,
        oldPrice: number
        //for optional props: oldPrice? 

    }
}

const HotDealItem = ({ item }: ProductItemProps) => {
    return (
        <View>
        <View style={styles.root}>
  
          <Image style={styles.image} source={item.image} />
          <View style={styles.bottomContainer}>
            <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
          
            
            <Text style={styles.price}>{item.price}$
              {item.oldPrice && (<Text style={styles.oldPrice}> ${item.oldPrice} </Text>)}
            </Text>
          </View>
        </View>
      </View>

    )
}
const styles = StyleSheet.create({

});
export default HotDealItem;