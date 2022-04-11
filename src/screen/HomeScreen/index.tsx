import React, { useRef } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Logo, Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeHeader from '../../component/AnimatedHeader';
import ProductItem from '../../component/ProductItem';
import products from '../../assets/product';
import HotDealItem from '../../component/HotDeal';

// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';


const HomeScreen = () => {


  return (
    <SafeAreaProvider>

      <SafeAreaView style={styles.screenContainer}>
        <StatusBar translucent backgroundColor='transparent' />

        <View style={styles.container}>
          <HomeHeader />

          {/* Add the following AnimatedHeader */}
          <ScrollView
            nestedScrollEnabled={true}
          >


            {/* Render Product Component */}
            {/* <ProductItem item = {products[0]}/> */}
            <View style={styles.top}>
              <View style={styles.bottomContainer}>
                <View style={styles.banner}>
                  <Image style={styles.image} source={require('../../image/HappyFarmerGirl.jpg')} />
                </View>

              </View>
            </View>
            <View style={styles.centerContent}>
              <View style={styles.hotDeal}>
                <View style={styles.container}>
                  <View style={styles.titleContainer}>
                    <Heading6 style={styles.titleText}>Special Offers</Heading6>
                  </View>
                  <FlatList
                    data={products}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    alwaysBounceHorizontal={false}
                    /* keyExtractor={this.keyExtractor} */
                    renderItem={({ item }) => <HotDealItem item={item} />}
                    contentContainerStyle={styles.hotDealProductsList}
                  />
                </View>
              </View>
              <View style={styles.bottom}>

                <FlatList
                  data={products}
                  renderItem={({ item }) => <ProductItem item={item} />}
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
    // backgroundColor: colors.themeBackground,
  },
  container: {
    flex: 1,
  },

  top: {

  },
  bottomContainer: {
    height: 200,
    backgroundColor: color.white,


  },
  banner: {

    backgroundColor: color.themeBackground,
    height: '50%',
    alignItems: 'center',

  },
  image: {

    width: '90%',
    height: 150,
    borderRadius: 20

  },
  bottom: {
    flex: 3,
    width: '100%',
    backgroundColor: color.black,
  },
});

export default HomeScreen