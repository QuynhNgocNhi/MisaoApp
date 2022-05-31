//toDo: chỉnh lại post item nhìn chuyên nghiệp hơn

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Image, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeHeader from '../../component/AnimatedHeader';
import CategoryItem from '../../component/CategoryItem/PostCategoryItem';
import PostItem from '../../component/PostItem';
import post from '../../assets/data/post';

import color from '../../theme/color';
import CustomSwitch from '../../component/CustomSwitch';
import AppStatusBar from '../../component/AppStatusBar';
import { useNavigation } from '@react-navigation/native';

//set something when screen is focused(status bar), because it is not rerendered when screen is load
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { masterDataSelector } from '../../modules/search/selectors';
import CategoryList from '../../component/CategoryItem';

import { getPostListAPI } from '../../services';
import { tokenSelector } from '../../modules/auth/selectors';

const PostScreen = () => {
  const navigation = useNavigation<any>();

  const isFocused = useIsFocused();


  const [postList, setPostList] = useState<any>([])

  const categoriesList = useSelector(masterDataSelector)
  const [loading, setLoading] = useState<boolean>(false)
  const token = useSelector(tokenSelector)
  const fetchData = async () => {
    setLoading(true)
    const postResponse = await getPostListAPI()

    if (postResponse.__typename !== 'ErrorResponse') {

      setPostList(postResponse.data)
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


  /*  const [PostTab, setPostTab] = useState(1);
   const onSelectSwitch = value => {
     setPostTab(value);
   };
   const PostSortedById = [...postList].sort((a, b) => parseInt(b.id) - parseInt(a.id))
   const PostSortedById2 = [...postList].sort((a, b) => parseInt(a.id) - parseInt(b.id))
   const isFocused = useIsFocused(); */

  return (
    <SafeAreaProvider>

      <SafeAreaView style={styles.screenContainer}>
        {isFocused ? (<StatusBar backgroundColor={color.themeBackground} />) : null}



        <View style={styles.container}>
          <HomeHeader />

          <ScrollView
            nestedScrollEnabled={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >

            <View style={styles.middleContainer}>


              <View style={styles.centerContent}>


                <View style={styles.hotDealContentainer}>
                  <View style={styles.titleContainer}>
                    <Heading6 style={[styles.titleText, { color: color.primaryText }]}>
                      Danh mục
                    </Heading6>
                  </View>
                </View>

                <View style={styles.CategoryListContainer}>

                  <FlatList
                    horizontal
                    data={categoriesList}
                    showsHorizontalScrollIndicator={false}
                    alwaysBounceHorizontal={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <CategoryList category={item} tabId={2} />}
                  />
                </View>

              </View>
            </View>
            <View style={styles.bottomContainer}>

              <View style={styles.productListContainer}>
                <FlatList
                  contentContainerStyle={styles.ProductItemList}
                  data={postList}

                  renderItem={({ item }) => <PostItem post={item} />}
                />
                {/* <View style={styles.switchTabContainer}>
                  <CustomSwitch
                    selectionMode={1}
                    option1="Mới nhất"
                    option2="Gợi ý"

                    onSelectSwitch={onSelectSwitch}
                  />

                </View>
                {PostTab == 1 &&
                  (<FlatList
                    contentContainerStyle={styles.postListContainer}

                    data={PostSortedById}
                    renderItem={({ item }) => <PostItem post={item} />}
                  />)}
                {PostTab == 2 &&
                  (<FlatList
                    contentContainerStyle={styles.postListContainer}
                    data={PostSortedById2}

                    renderItem={({ item }) => <PostItem post={item} />}
                  />)} */}

                {/*                   <Heading6 style={[styles.titleText, { color: color.lightBlack }]}>Mới nhất </Heading6>*/}




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
    // backgroundColor: colors.themeBackground,
  },
  container: {
    flex: 1,

  },

  middleContainer: {


    padding: 10,
    backgroundColor: color.background,
  },
  topContent: {

    height: 160,

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
    flex: 1,
    width: '100%',
    backgroundColor: color.background

  },
  centerContent: {

    backgroundColor: color.white,
    width: '100%',

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

  postListContainer: {

  },
  productListContainer: {
    width: '100%',
    backgroundColor: color.background,

  },
  ProductItemList: {
    width: '100%',
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

export default PostScreen