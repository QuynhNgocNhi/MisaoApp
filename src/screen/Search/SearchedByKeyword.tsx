import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeHeader from '../../component/AnimatedHeader';
import ProductItem from '../../component/ProductItem';
//import data
import { Icon } from 'react-native-elements';
import product from '../../assets/data/product';

/* to ignore the warning message: 'VirtualizedLists should never be nested inside plain ScrollViews 
with the same orientation because it can break windowing and other functionality - use another 
VirtualizedList-backed container instead.' */
// import color, layout, style
import CustomSwitch from '../../component/CustomSwitch';
import PostItem from '../../component/PostItem';
import color from '../../theme/color';
//set something when screen is focused(status bar), because it is not rerendered when screen is load
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getPostListAPI, getProductListAPI } from '../../services';

const ProductSearchedByCategory = ({ route }) => {
  const { data } = route.params;
  console.log(data);
  const navigation = useNavigation();
  const ProductByCategoryId = [...product].filter(
    (p) => p.categoryId === data.categoryId
  );

  const isFocused = useIsFocused();
  const [productList, setProductList] = useState<any>([]);

  const [postList, setPostList] = useState<any>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [updating, setUpadting] = useState<boolean>(false);
  const [keyword, setKeyword] = useState(data.keyword);

  const onSearch = async () => {
    setUpadting(true);
    const response = await getProductListAPI({
      keyword
    });
    if (response.__typename !== 'ErrorResponse') {
      setProductList(response.data);
    }
    setUpadting(false);
  };

  useEffect(() => {
    setLoading(true);
    /* fetchProduct() */
    onSearch();
    setLoading(false);
  }, []);

  /* const fetchProduct = async () => {
        setLoading(true)
        const response = await getProductListAPI({
            category_id: data?.categoryId
        })
        if (response.__typename !== 'ErrorResponse') {
            setProductList(response.data)

        }
        setLoading(false)
    } */
  const fetchData = async () => {
    setLoading(true);
    const responses = await getPostListAPI({
      keyword
    });
    if (responses.__typename !== 'ErrorResponse') {
      setPostList(responses.data);
    }
    setLoading(false);
  };
  const [Tab, setTab] = useState(1);
  const onSelectSwitch = (value) => {
    setTab(value);
  };
  useEffect(() => {
    /* fetchProduct() */
    fetchData();
    onSelectSwitch(Tab);
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
        {isFocused ? (
          <StatusBar backgroundColor={color.themeBackground} />
        ) : null}

        <View style={styles.container}>
          <HomeHeader />

          <ScrollView nestedScrollEnabled={false}>
            <View style={styles.middleContainer}>
              <View style={styles.centerContent}>
                <View style={styles.searchContentainer}>
                  <View style={styles.titleContainer}>
                    <View style={styles.keywordContainer}>
                      <Text style={styles.keyword}>{data.keyword}</Text>
                      <Icon
                        onPress={() => navigation.goBack()}
                        name="cross"
                        type="entypo"
                        size={30}
                        color={color.normalText}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.productListContainer}>
                <View style={styles.switchTabContainer}>
                  <CustomSwitch
                    selectionMode={1}
                    option1="Sản phẩm"
                    option2="Tin mua"
                    onSelectSwitch={onSelectSwitch}
                  />
                </View>
                <View style={styles.productListContainer}>
                  {Tab == 1 && (
                    <FlatList
                      /*  ListEmptyComponent={() => {
                                                return (
                                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>Không tìm thấy sản phẩm liên quan để hiển thị.</Text>
                                                    </View>
                                                )
                                            }} */
                      data={productList}
                      numColumns={2}
                      renderItem={({ item }) => <ProductItem product={item} />}
                    />
                  )}
                  {Tab == 2 && (
                    <FlatList
                      ListEmptyComponent={() => {
                        return (
                          <View
                            style={{
                              flex: 1,
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Text style={{ fontSize: 18 }}>
                              {' '}
                              Không tìm thấy tin mua liên quan để hiển thị.
                            </Text>
                          </View>
                        );
                      }}
                      contentContainerStyle={styles.ProductItemList}
                      data={postList}
                      renderItem={({ item }) => <PostItem post={item} />}
                    />
                  )}
                </View>
              </View>
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
        backgroundColor: color.background
        // backgroundColor: colors.themeBackground,
    },
    container: {
        flex: 1,

    },

    middleContainer: {

        backgroundColor: color.background,
    },


    bottomContainer: {

        width: '100%',

    },
    centerContent: {

        backgroundColor: color.white,


    },

    titleContainer: {
        flexDirection: 'row',

        paddingTop: 10,
        paddingHorizontal: 16,

        backgroundColor: color.white,
    },




    postListContainer: {
    },
    productListContainer: {
        width: '100%',

        backgroundColor: color.background,

    },
    searchContentainer: {

    },
    keyword: {
        fontSize: 20,
        fontWeight: '500',
        color: color.primaryText,


    },
    keywordContainer: {

        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    switchTabContainer: {
        flexDirection: 'row',
        width: '85%',

        alignSelf: 'center',
        marginBottom: 30,
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: color.underBackground,
        borderRadius: 20


    },


});

export default ProductSearchedByCategory