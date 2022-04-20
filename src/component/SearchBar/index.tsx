import { Image, View, Text, TextInput, StyleSheet, LogBox } from 'react-native'
import React, { useEffect } from 'react';

// import color, layout, style
import color from '../../theme/color';

import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements'



const SearchBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.search} >
      {/*   <SearchBar navigation={navigation} /> */}
      <TextInput style={styles.searchBar}
        placeholder={'Tìm kiếm sản phẩm, tin mua,...'}

        onFocus={() => navigation.navigate('SearchModal')}>
      </TextInput>
      <View style={styles.searchIcon}>

        <Icon
          name='search'
          type='feather'
          color={color.borderColor}
          size={30}
        />
      </View>

    </View>

  )
}
const styles = StyleSheet.create({
  search: {
    width: '95%',
  },
  searchBar: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: color.borderColor,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: color.underBackground,
    fontSize: 18,
    paddingLeft: 60,
  },
  searchIcon: {
    position: 'absolute',
    top: 10,
    left: 20,

  }
});
export default SearchBar;