import React, { useRef } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Image } from 'react-native';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeHeader from '../../component/AnimatedHeader';
import CategoryList from '../../component/CategoryList';
import PostItem from '../../component/PostItem';
//import data
import category from '../../assets/data/category';
import post from '../../assets/data/post';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';


const HomeScreen = () => {


    return (
        <SafeAreaProvider>

            <SafeAreaView style={styles.screenContainer}>
                <StatusBar translucent backgroundColor='transparent' />

                <View style={styles.container}>

                    <ScrollView
                        nestedScrollEnabled={false}
                    >

                        <View style={styles.contentContainer}>

                            <FlatList
                                contentContainerStyle={styles.ProductItemList}
                                data={post}

                                renderItem={({ item }) => <PostItem post={item} />}
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
        backgroundColor: color.white,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },

    contentContainer: {
        marginVertical: 20,
        width: '93%',

    },


});

export default HomeScreen