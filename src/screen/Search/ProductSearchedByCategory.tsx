import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Image, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeHeader from '../../component/AnimatedHeader';
import CategoryItem from '../../component/CategoryItem';
import ProductItem from '../../component/ProductItem';
//import data
import category from '../../assets/data/category';
import product from '../../assets/data/product';
import { Icon } from 'react-native-elements';
import Button from '../../component/Button';
import LinkButton from '../../component/Button/LinkButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

/* to ignore the warning message: 'VirtualizedLists should never be nested inside plain ScrollViews 
with the same orientation because it can break windowing and other functionality - use another 
VirtualizedList-backed container instead.' */
import LogBox from 'react-native';
// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';
import CustomSwitch from '../../component/CustomSwitch';
import { Compare } from '@material-ui/icons';
import AppStatusBar from '../../component/AppStatusBar';

//set something when screen is focused(status bar), because it is not rerendered when screen is load
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { getProductListAPI } from '../../services';


const PostSearchedByCategory = ({ categoryId, route }) => {
    const { data } = route.params;
    const navigation = useNavigation();
    const ProductByCategoryId = [...product].filter(p => p.categoryId === data.categoryId)

    const isFocused = useIsFocused();
    const [productList, setProductList] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [updating, setUpadting] = useState<boolean>(false)

    const fetchProduct = async () => {
        setLoading(true)
        const response = await getProductListAPI({
            category_id: data?.categoryId
        })
        if (response.__typename !== 'ErrorResponse') {
            setProductList(response.data)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator animating />
            </View>
        )
    }


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


                                <View style={styles.searchContentainer}>
                                    <View style={styles.titleContainer}>
                                        <Heading6 style={[styles.titleText, { color: color.primaryText }]}>Danh mục </Heading6>
                                        <View style={styles.categoryNameContainer}>

                                            <Text style={styles.categoryName}>
                                                {data.categoryName}
                                            </Text>
                                            <Icon
                                                onPress={() => navigation.goBack()}
                                                name='cross'
                                                type='entypo'
                                                size={35}
                                                color={color.normalText}
                                            />
                                        </View>
                                    </View>

                                </View>


                            </View>
                        </View>
                        <View style={styles.bottomContainer}>


                            <View style={styles.productListContainer}>
                                <FlatList
                                    ListEmptyComponent={() => {
                                        return (
                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text>Không có sản phẩm để hiện thị.</Text>
                                            </View>
                                        )
                                    }}
                                    data={productList}
                                    numColumns={2}
                                    renderItem={({ item }) => <ProductItem product={item} />}
                                />
                                {/*  <FlatList
                                    contentContainerStyle={styles.postListContainer}
                                    numColumns={2}
                                    data={product}

                                    renderItem={({ item, index }) => {
                                        return (
                                            <View style={{}}>
                                                {
                                                    item.categoryId === data.categoryId && (
                                                        <ProductItem product={item}
                                                            contentContainerStyle={styles.ProductItem}
                                                            scrollEnabled={false}
                                                        />
                                                    )
                                                }
                                            </View>
                                        )
                                    }}
                                /> */}


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
        padding: 10,
        backgroundColor: color.background,
    },


    bottomContainer: {

        width: '100%',

    },
    centerContent: {

        backgroundColor: color.white,


    },

    titleContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 10,
        paddingHorizontal: 16,
        paddingBottom: 12,
        backgroundColor: color.white,
    },
    titleText: {
        fontWeight: '600',
        color: '#FF0000',
        paddingLeft: 10

    },



    postListContainer: {
    },
    productListContainer: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: color.background,

    },
    searchContentainer: {

    },
    categoryName: {
        fontSize: 20,
        color: color.primaryText,


    },
    categoryNameContainer: {
        marginTop: 10,
        padding: 5,
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    }


});

export default PostSearchedByCategory