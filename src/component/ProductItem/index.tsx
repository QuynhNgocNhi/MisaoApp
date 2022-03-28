import { Image, View, Text, ImagePropTypes } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import styles from './style'



//import image from '../../data/image'
interface ProductItemProps {
  item: {
    id: string,
    title: string,
    image: string,
    averageRating: number,
    rating: number,
    price: number,
    oldPrice?: number
    //for optional props: oldPrice? 

  }
}

const ProductItem = ({ item }: ProductItemProps) => {
  return (
    <View>
      <View style={styles.root}>

        <Image style={styles.image} source={item.image} />
        <View style={styles.rightContainer}>
          <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
          {/* Rating Product */}
          <View style={styles.ratingContainer}>


            {[0, 0, 0, 0, 0].map((element, index) => {
              // index is the number of the current star 
              const isFullStar = ((index < Math.floor(item.averageRating)))
              const isHalfStar = ((index == Math.floor(item.averageRating)) && (item.averageRating > Math.floor(item.averageRating)))
              const isNoStar = !isFullStar && !isHalfStar
              
              let starName = ""
               
              // Full star:
              if (isFullStar) 
              starName= 'star'
              
              //half star
              else if (isHalfStar)
              starName= 'star-half-o'
              
              //0 star
              else if (isNoStar)
              starName = "star-o"
              
              return <FontAwesome name={starName}
              size={18} 
              color={'#F6C707'} />

            })}



            <Text style={styles.text}>{item.rating}</Text>

          </View>

          <Text style={styles.price}>{item.price}$
            {item.oldPrice && (<Text style={styles.oldPrice}> ${item.oldPrice} </Text>)}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default ProductItem;