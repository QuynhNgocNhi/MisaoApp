import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// import components
import Button from '../../component/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Header } from 'react-native-elements';
import HeaderIconButton from '../../component/HeaderButton';
import ButtonNormal from '../../component/Button';
const BACK_ICON = Platform.OS === 'ios' ? 'ios-chevron-back-outline' : 'md-chevron-back';
import RecentSearchItem from './RecentSearchItem';
import PeopleAlsoSearched from './PeopleAlsoSearched';
import recentSearch from '../../assets/data/searchHistory';
import category from '../../assets/data/category';
import product from '../../assets/data/product';
import CategoryList from '../../component/CategoryItem';

// import color, layout, style
import color from '../../theme/color';
//set something when screen is focused(status bar), because it is not rerendered when screen is load
import { useIsFocused } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';


import CustomSwitch from '../../component/CustomSwitch/CustomThreeSwitch';
import { useSelector } from 'react-redux';
import { masterDataSelector } from '../../modules/search/selectors';
import { getHistorySearchAPI, getProductListAPI } from '../../services';
import LoadingOverlay from '../../component/LoadingOverlay';
import { SearchBarItem } from '../../component/SearchBar/SearchBarItem';

const SearchScreen = () => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const categories = useSelector(masterDataSelector)

    const [productList, setProductList] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [updating, setUpadting] = useState<boolean>(false)
    const [keyword, setKeyword] = useState(null)
    const [historyList, setHistoryList] = useState<any>([])

    const data = { keyword: keyword }

    const fetchProduct = async () => {
        const response = await getProductListAPI({
            keyword
        })
        if (response.__typename !== 'ErrorResponse') {
            setProductList(response.data)
        }
    }

    const fetchSearchHistory = async () => {
        const response = await getHistorySearchAPI()
        if (response.__typename !== 'ErrorResponse') {
            setHistoryList(response.data)
        }

    }

    const onSearch = async () => {
        navigation.navigate('SearchedByKeyword', { data });
    }

    const onSearchWithKeyword = async (keyword: string) => {

        navigation.navigate('SearchedByKeyword', { data: { keyword: keyword } });
    }
    useEffect(() => {
        setLoading(true)
        fetchProduct()
        fetchSearchHistory()
        setLoading(false)

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
                {isFocused ? (<StatusBar backgroundColor={color.background} barStyle={'dark-content'} />) : null}

                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Header
                            containerStyle={{ borderBottomWidth: 0, }}
                            backgroundColor={color.white}
                            centerComponent={
                                <Text style={{ fontSize: 18, color: color.primaryText, fontWeight: '500', textTransform: 'uppercase', paddingTop: 5 }}>Tìm kiếm</Text>
                            }
                            leftComponent={
                                <HeaderIconButton
                                    onPress={() => navigation.goBack()}
                                    name={BACK_ICON}
                                    color={color.lightBlack}
                                />
                            }
                        />
                    </View>

                    <View style={styles.middleContainer} >

                        <View style={styles.search} >
                            <SearchBarItem keyword={keyword} setKeyword={setKeyword} onSearch={onSearch} />
                        </View>

                    </View>
                    <ScrollView>
                        {historyList?.length > 0 && (
                            <View style={styles.topContainer} >
                                <Heading6 style={styles.headingText}>
                                    Tìm kiếm gần đây
                                </Heading6>
                                <View style={styles.recentSearchItemStyle} >

                                    <FlatList
                                        scrollEnabled={false}
                                        data={historyList}
                                        showsHorizontalScrollIndicator={false}
                                        alwaysBounceHorizontal={false}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => <RecentSearchItem item={item} onSearchWithKeyword={onSearchWithKeyword} />}
                                    />

                                </View>
                            </View>
                        )}


                        <View style={[styles.box, styles.middleContainer]} >
                            <Heading6 style={styles.headingText}>
                                Nhiều người cũng tìm kiếm
                            </Heading6>
                            <View style={styles.peopleAlsoSearched} >

                                <FlatList
                                    data={productList}
                                    numColumns={2}
                                    showsHorizontalScrollIndicator={false}
                                    alwaysBounceHorizontal={false}
                                    keyExtractor={product => product.id}
                                    renderItem={({ item }) => <PeopleAlsoSearched product={item} />}
                                />

                            </View>


                        </View>
                        <View style={[styles.box, styles.topContainer]} >
                            <Heading6 style={styles.headingText}>
                                Tìm theo danh mục
                            </Heading6>
                            <View style={styles.CategoryListContainer} >

                                <FlatList
                                    horizontal
                                    data={categories}
                                    showsHorizontalScrollIndicator={false}
                                    alwaysBounceHorizontal={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => <CategoryList category={item} tabId={1} />}
                                />

                            </View>


                        </View>


                    </ScrollView>
                </View>
            </SafeAreaView>
            <LoadingOverlay loading={updating} />
        </SafeAreaProvider >
    );
};
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: color.underBackground,
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,


    },
    box: {
        backgroundColor: color.background,
        marginTop: 10,
    },

    headingText: {
        fontSize: 20,

        padding: 20,
        textAlign: 'left',

    },
    center: {
        alignItems: 'center',

    },
    middleContainer: {

        backgroundColor: color.background



    },
    search: {
        width: '95%',
        alignSelf: 'center',

    },
    topContainer: {
        backgroundColor: color.background
    },
    recentSearchItemStyle: {
        width: '80%',
        alignSelf: 'center',
        paddingBottom: 20,
        maxHeight: 230,



    },
    CategoryListContainer: {
        padding: 10,
        paddingBottom: 30,

    },
    peopleAlsoSearched: {
        width: '100%',

        paddingBottom: 20,
    }


});

export default SearchScreen