import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import color, layout, style
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import color from '../../theme/color';
import layout from '../../theme/layout';

//10 latest product that have oldprice

interface categoryItemProps {
  category: {
    value: number;
    label: string;
    image: string;
  };
  tabId: number;
}

const CategoryItem = ({ category, tabId }: categoryItemProps) => {
  const navigation = useNavigation();
  const data = {
    categoryId: category.value,
    categoryName: category.label,
    tabId: tabId
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('SearchedByCategory', { data });
      }}
      style={styles.container}
    >
      <View style={styles.bottomContainer}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={styles.image}
          source={{
            uri: category.image
          }}
        />
        <View style={styles.tittleContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {category.label}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 5,
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

  image: {
    height: 70,
    width: 70,
    resizeMode: 'contain',
    backgroundColor: color.white
  },

  title: {
    flex: 1,
    marginTop: 5,
    color: '#000',
    fontSize: 16,
    textAlign: 'center'
  },

  text: {
    color: '#000'
  }
});
export default CategoryItem;
