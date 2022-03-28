import {StyleSheet} from "react-native";
const styles = StyleSheet.create({
    page: {
      padding: 10,
      width: '100%',
  
    },
    root: {
      flexDirection: 'row',
  
      borderWidth: 1,
      borderColor: '#d1d1d1',
      backgroundColor: '#fff',
      borderRadius: 5,
  
    },
    image: {
      margin: 10,
      width: 150,
      height: 150,
      flex: 1,
    },
    rightContainer: {
      padding: 5,
      width: '100%',
      flex: 1.5,
    },
    ratingContainer: {
      margin: 5,
      flexDirection: 'row',
    },
    title: {
      margin: 5,
      color: '#000',
      fontSize: 22
    },
    price: {
      margin: 5,
      color: '#000',
      fontSize: 18,
      fontWeight: 'bold',
  
    },
    oldPrice: {
     
      color: '#000',
      fontSize: 12,
  textDecorationLine:'line-through',
    },
    text: {
      marginLeft: 10,
      color: '#000',
      
    },
  });
  export default styles;