import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeHeader from '../../component/AnimatedHeader';
import product from '../../assets/data/product';
import HotDealItem from '../../component/HotDeal';
import CategoryList from '../../component/CategoryItem';
import ProductItem from '../../component/ProductItem';


import Button from '../../component/Button';
import LinkButton from '../../component/Button/LinkButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParameterList } from '../../MainNavigator';
//set something when screen is focused(status bar), because it is not rerendered when screen is load
import { useIsFocused } from '@react-navigation/native';

type HomeProps = NativeStackScreenProps<RootStackParameterList, "Home">

/* to ignore the warning message: 'VirtualizedLists should never be nested inside plain ScrollViews 
with the same orientation because it can break windowing and other functionality - use another 
VirtualizedList-backed container instead.' */
import LogBox from 'react-native';
// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';
import { useSelector } from 'react-redux';
import { masterDataSelector } from '../../modules/search/selectors';
import { getHotProductListAPI, getProductListAPI } from '../../services';
import { tokenSelector } from '../../modules/auth/selectors';



const HomeScreen = () => {
  const tabId = useState(2);
  console.log(tabId);
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const statusbar = () => { return <StatusBar /> }

  const categoriesList = useSelector(masterDataSelector)
  const [hotProductList, setHotProductList] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [productList, setProductList] = useState<any>([])
  const token = useSelector(tokenSelector)
  const fetchData = async () => {
    setLoading(true)
    const productResponse = await getProductListAPI()
    const response = await getHotProductListAPI()
    if (response.__typename !== 'ErrorResponse' && productResponse.__typename !== 'ErrorResponse') {
      setHotProductList(response.data)
      setProductList(response.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator animating />
    </View>)
  }
  return (
    <SafeAreaProvider>

      <SafeAreaView style={styles.screenContainer}>
        {isFocused ? (<StatusBar backgroundColor={color.themeBackground} />) : null}

        <View style={styles.container}>
          <HomeHeader />

          {/* Add the following AnimatedHeader */}
          <ScrollView
            nestedScrollEnabled={false}
          >


            {/* Render Product Component */}
            {/* <ProductItem item = {products[0]}/> */}
            <View style={styles.middleContainer}>
              <View style={styles.topContent}>
                <View style={styles.banner}>
                  <View style={styles.imageContainer}>

                    <Image style={styles.image} source={require('../../image/Banner.png')} />
                  </View>
                </View>

              </View>

              <View style={styles.centerContent}>
                <View style={styles.hotDealContentainer}>
                  <View style={styles.titleContainer}>
                    <Heading6 style={[styles.titleText]}>Giá sốc hôm nay <FontAwesome name={'bolt'} color={'#FF0000'} size={22} /></Heading6>

                    <LinkButton
                      title="Xem thêm"
                      titleStyle={styles.viewAllText}

                    />

                  </View>
                </View>
                <View style={styles.hotDeal}>

                  <FlatList
                    horizontal
                    data={hotProductList}
                    showsHorizontalScrollIndicator={false}
                    alwaysBounceHorizontal={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                      return (
                        <View>
                          {/* {
                            item.discountPercentage && ( */}
                          <HotDealItem product={item}
                            contentContainerStyle={styles.hotDealList}
                            scrollEnabled={false}
                          />
                          {/* )
                          } */}
                        </View>
                      )
                    }}
                  />
                </View>
                <View style={styles.hotDealContentainer}>
                  <View style={styles.titleContainer}>
                    <Heading6 style={[styles.titleText, { color: color.lightBlack }]}>Tìm theo danh mục </Heading6>


                    <FontAwesome name={'arrow-right'} color={color.backgroundColor} size={18} />

                  </View>
                </View>
                <View style={styles.CategoryListContainer}>

                  <FlatList
                    horizontal
                    data={categoriesList}
                    showsHorizontalScrollIndicator={false}
                    alwaysBounceHorizontal={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <CategoryList category={item} tabId={1} />}
                  />
                </View>

              </View>
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.productListContentainer}>
                <View style={styles.titleContainer}>
                  <Heading6 style={[styles.titleText, { color: color.lightBlack }]}>Mới nhất </Heading6>


                  <FontAwesome name={'filter'} color={color.lightBlack} size={16} />

                </View>
              </View>

              <FlatList
                contentContainerStyle={styles.ProductItemList}
                data={productList}
                numColumns={2}
                renderItem={({ item }) => <ProductItem product={item} />}
              />
            </View>
          </ScrollView>

        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,


  },
  container: {
    flex: 1,

  },

  middleContainer: {


  },
  topContent: {

    height: 160,
    backgroundColor: color.white,
  },
  banner: {

    backgroundColor: color.themeBackground,
    height: '50%',
    alignItems: 'center',




  },
  imageContainer: {
    width: '90%',
    height: 150,
    borderRadius: 20,
    //set box shadow fo image
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 16,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    flex: 1,
    width: '100%',
    borderRadius: 20,

  },
  bottomContainer: {

    width: '100%',

  },
  centerContent: {

    backgroundColor: color.white,


  },
  hotDealContentainer: {
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: color.white,
  },
  titleText: {
    fontWeight: '600',
    color: '#FF0000',

  },
  viewAllText: {
    color: color.primaryColor,
  },
  hotDeal: {
    width: '80%',
    alignSelf: 'center',

  },
  CategoryListContainer: {
    padding: 10,
  },
  ProductItemList: {

  }
});

export default HomeScreen