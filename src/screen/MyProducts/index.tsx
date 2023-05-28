import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MyProductItem from '../../component/MyProductItem';
//import data

// import color, layout, style
import { getListMyProductAPI } from '../../services';
import color from '../../theme/color';

const MyProducts = () => {
  console.log('haha');

  const [loading, setLoading] = useState<boolean>(false);
  const [productList, setProductList] = useState<any>([]);
  const fetchData = async () => {
    setLoading(true);
    const response = await getListMyProductAPI();
    if (response.__typename !== 'ErrorResponse') {
      setProductList(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator animating />
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar translucent backgroundColor="transparent" />
        <View>
          <ScrollView nestedScrollEnabled={false}>
            <FlatList
              contentContainerStyle={styles.ProductItemList}
              data={productList}
              numColumns={2}
              renderItem={({ item }) => <MyProductItem product={item} />}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: color.background
  },
  container: {
    flex: 1,
    width: '90%',
    paddingTop: 20
  },

  middleContainer: {},
  topContent: {
    height: 160
  },
  banner: {
    backgroundColor: color.themeBackground,
    height: '50%',
    alignItems: 'center'
  },
  imageContainer: {
    width: '90%',
    height: 150,
    borderRadius: 20,
    //set box shadow fo image
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 16
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5
  },
  image: {
    flex: 1,
    width: '100%',
    borderRadius: 20
  },
  bottomContainer: {
    width: '100%'
  },
  centerContent: {
    backgroundColor: color.white
  },
  hotDealContentainer: {},
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: color.white
  },
  titleText: {
    fontWeight: '600',
    color: '#FF0000'
  },
  viewAllText: {
    color: color.primaryColor
  },
  hotDeal: {
    width: '80%',
    alignSelf: 'center'
  },
  CategoryListContainer: {
    padding: 10
  },
  ProductItemList: {
    // justifyContent: 'flex-start'
  }
});

export default MyProducts;
