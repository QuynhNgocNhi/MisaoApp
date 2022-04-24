//toDo: chỉnh lại post item nhìn chuyên nghiệp hơn

import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeHeader from '../../component/AnimatedHeader';
import CategoryItem from '../../component/CategoryItem/PostCategoryItem';
import PostItem from '../../component/PostItem';
//import data
import category from '../../assets/data/category';
import post from '../../assets/data/post';

import Button from '../../component/Button';
import LinkButton from '../../component/Button/LinkButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import color from '../../theme/color';
import layout from '../../theme/layout';
import CustomSwitch from '../../component/CustomSwitch';
import { Compare } from '@material-ui/icons';
import AppStatusBar from '../../component/AppStatusBar';

//set something when screen is focused(status bar), because it is not rerendered when screen is load
import { useIsFocused } from '@react-navigation/native';


const HomeScreen = () => {
  const [PostTab, setPostTab] = useState(1);
  const onSelectSwitch = value => {
    setPostTab(value);
  };
  const PostSortedById = [...post].sort((a, b) => parseInt(b.id) - parseInt(a.id))
  const PostSortedById2 = [...post].sort((a, b) => parseInt(a.id) - parseInt(b.id))
  const isFocused = useIsFocused();

  return (
    <SafeAreaProvider>

      <SafeAreaView style={styles.screenContainer}>
        {isFocused ? (<StatusBar backgroundColor={color.themeBackground} />) : null}



        <View style={styles.container}>
          <HomeHeader />

          <ScrollView
            nestedScrollEnabled={false}
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
                    data={category}
                    showsHorizontalScrollIndicator={false}
                    alwaysBounceHorizontal={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <CategoryItem category={item} />}
                  />
                </View>

              </View>
            </View>
            <View style={styles.bottomContainer}>


              <View style={styles.productListContainer}>
                <View style={styles.switchTabContainer}>
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
                  />)}

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

    width: '100%',

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

export default HomeScreen