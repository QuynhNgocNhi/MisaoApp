import React, { useRef } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-elements';

import CategoryItem from '../../component/CategoryItem';
//import data
import category from '../../assets/data/category';

// import components
import ButtonNormal from '../../component/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Header } from 'react-native-elements';
import HeaderIconButton from '../../component/HeaderButton'

import LinkButton from '../../component/Button/LinkButton';
const BACK_ICON = Platform.OS === 'ios' ? 'ios-chevron-back-outline' : 'md-chevron-back';

// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';

import { useNavigation } from '@react-navigation/native';




const AddProductScreen = () => {
    const navigation = useNavigation();


    return (
        <SafeAreaProvider>

            <SafeAreaView style={styles.screenContainer}>
                <StatusBar translucent backgroundColor='transparent' />

                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Header
                            containerStyle={{ borderBottomWidth: 0, marginVertical: 10 }}
                            backgroundColor={color.white}
                            centerComponent={
                                <Text style={
                                    { fontSize: 18, color: color.primaryText, fontWeight: '500', textTransform: 'uppercase', paddingTop: 5 }
                                }>Đăng tin mua
                                </Text>
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
                    <ScrollView>



                        <View style={[styles.box, styles.productNameAddContainer, { marginTop: 10 }]}>
                            <View style={styles.tittleContainer}>

                                <Icon name='format-text' size={28} color='#5C8700' />
                                <Heading6 style={[styles.headingText, { paddingLeft: 10 }]}>Tên tin mua</Heading6>
                            </View>
                            <View style={styles.productNameAddBox}>
                                <TextInput
                                    style={{ fontSize: 20, padding: 10 }}

                                    maxFontSizeMultiplier={5}
                                    placeholder="Cần mua 50kg sầu riêng Ri6... "
                                    placeholderTextColor={'#424242'}

                                    // Inherit any props passed to it; e.g., multiline, numberOfLines below
                                    multiline={true}
                                    numberOfLines={2}
                                    editable
                                    maxLength={50}
                                />
                            </View>

                        </View>
                        <View style={[styles.box, styles.productDescriptionAddContainer, { marginTop: 10 }]}>
                            <View style={styles.tittleContainer}>

                                <FontAwesome name='paint-brush' size={24} color='#5C8700' />
                                <Heading6 style={[styles.headingText, { paddingLeft: 10 }]}>Miêu tả tin mua</Heading6>
                            </View>
                            <View style={styles.productDescriptionAddBox}>
                                <TextInput
                                    style={{ fontSize: 20, padding: 10 }}

                                    maxFontSizeMultiplier={5}
                                    placeholder="Một đoạn văn miêu tả đầy đủ sẽ giúp người bán dễ liên lạc với bạn hơn. "
                                    placeholderTextColor={'#424242'}

                                    // Inherit any props passed to it; e.g., multiline, numberOfLines below
                                    multiline={true}
                                    numberOfLines={5}
                                    editable
                                    maxLength={1000}
                                />
                            </View>

                        </View>
                        <View style={[styles.box, styles.productCategoryAddContainer, { marginTop: 10 }]}>
                            <View style={styles.tittleContainer}>

                                <Icon name='tag' size={24} color='#5C8700' />
                                <Heading6 style={[styles.headingText, { paddingLeft: 10 }]}>Phân loại tin mua</Heading6>
                            </View>
                            <View style={styles.productCategoryAddBox}>
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
                        <View style={styles.contentContainer}>

                            <View style={styles.buttonsGroup}>
                                <View style={styles.bottomContainer}>
                                    <Text style={styles.tipsText}>Lưu ý: Địa chỉ của bạn sẽ xuất hiện trong bài đăng.</Text>
                                </View>
                                <ButtonNormal
                                    outlined
                                    buttonStyle={styles.customButton}
                                    onPress={() => { navigation.navigate('AddPostLastStep'); }}
                                    title={'Tiếp tục'.toUpperCase()}
                                />

                            </View>
                        </View>
                    </ScrollView>


                </View>

            </SafeAreaView>
        </SafeAreaProvider >
    );
};
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: color.underBackground,
    },
    container: {
        flex: 1,
    },
    box: {
        padding: 20,
        backgroundColor: color.background,
    },
    imageAddContainer: {
        flexDirection: 'column',
    },
    tittleContainer: {
        flexDirection: 'row',
        paddingBottom: 20
    },
    imageAddBox: {
        alignItems: 'center',
        height: 100,
        borderStyle: 'dotted',
        width: '90%',
        alignSelf: 'center',
        borderWidth: 1.5,
        borderColor: color.black,
    },
    productNameAddBox: {
        alignItems: 'center',


        width: '90%',
        alignSelf: 'center',
        borderWidth: 1.5,
        borderColor: color.borderColor,
    },
    productDescriptionAddBox: {
        alignItems: 'center',


        width: '90%',
        alignSelf: 'center',
        borderWidth: 1.5,
        borderColor: color.borderColor,
    },

    bottomContainer: {

        width: '80%',
        backgroundColor: '#E0FFD8',
        borderWidth: 1.5,
        borderColor: color.lightBlack,
        borderRadius: 9,
        alignSelf: 'center',
        marginBottom: 30

    },
    tipsText: {
        padding: 10,
        fontSize: 18,
        color: color.primaryText
    },

    headingText: {
        fontSize: 20,
        textAlign: 'left',

    },
    center: {
        alignItems: 'center',

    },
    imageContainer: {

        alignItems: 'center',

    },
    image: {
        height: 150,
        width: 150,


    },

    buttonsGroup: {
        flexGrow: 1,
        backgroundColor: color.background,
        alignItems: 'center',

        paddingBottom: 20,





    },
    customButton: {
        width: '60%',
        borderRadius: 100,




    },

});

export default AddProductScreen