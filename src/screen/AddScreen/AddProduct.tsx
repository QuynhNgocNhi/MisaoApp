import React, { useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Text, StatusBar, SafeAreaView, ScrollView, Platform, Image, TextInput, TouchableOpacity, Touchable, Alert } from 'react-native';
import { Heading6 } from '../../component/Text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
//import data

// import components
import ButtonNormal from '../../component/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Header } from 'react-native-elements';
import HeaderIconButton from '../../component/HeaderButton'

const BACK_ICON = Platform.OS === 'ios' ? 'ios-chevron-back-outline' : 'md-chevron-back';

// import color, layout, style
import color from '../../theme/color';

import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { masterDataSelector } from '../../modules/search/selectors';
import FastImage from 'react-native-fast-image';




const AddProductScreen = () => {
    const navigation = useNavigation<any>();
    const categoriesList = useSelector(masterDataSelector)
    const [deleteItem, setDeleteItem] = useState<boolean>(false)
    const [data, setData] = useState<any>()
    const [imageList, setImageList] = useState<any>([])
    const onPickImage = () => {
        ImagePicker.openPicker({
            mediaType: 'photo',
        }).then(image => {
            setImageList([...imageList, {
                id: -1,
                url_full: image.path,
            }])

        });
    }
    const onRemoveImage = (item: any) => {
        let list = imageList
        list.splice(list.indexOf(item), 1);
        setImageList(list)
        setDeleteItem(!deleteItem);
    }

    const onGoToStep2 = () => {
        if (imageList?.length > 0 && data.name && data.description && data.category_id) {
            let productInfo = {
                ...data,
                image_list: imageList
            }
            navigation.navigate('AddProductLastStep', { data: productInfo });
        } else {
            Alert.alert("", "Vui lòng nhập đầy đủ thông tin cho sản phẩm.")
        }
    }
    return (
        <SafeAreaProvider>  

            <SafeAreaView style={styles.screenContainer}>
                <StatusBar translucent backgroundColor='transparent' barStyle={'dark-content'} />

                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Header
                            containerStyle={{ borderBottomWidth: 0, marginVertical: 10 }}
                            backgroundColor={color.white}
                            centerComponent={
                                <Text style={
                                    { fontSize: 18, color: color.primaryText, fontWeight: '500', textTransform: 'uppercase', paddingTop: 5 }
                                }>Đăng sản phẩm
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


                        <View style={[styles.box, styles.imageAddContainer]}>
                            <View style={styles.tittleContainer}>

                                <Icon name='image-multiple-outline' size={28} color='#5C8700' />
                                <Heading6 style={[styles.headingText, { paddingLeft: 10 }]}>Ảnh sản phẩm thực tế</Heading6>
                            </View>
                            <TouchableOpacity onPress={onPickImage} style={styles.imageAddBox}>
                                <Button type="clear" onPress={onPickImage} icon={<Icon name={'image-plus'} size={62} color={color.borderColor} />} />
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {imageList?.map((image: any, index: number) => (
                                    <View key={index} style={{
                                        borderWidth: 1,
                                        borderColor: '#A0BCC2',
                                        marginTop: 10, marginLeft: 20
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => onRemoveImage(image)}
                                            style={{ position: 'absolute', zIndex: 9999, right: 5, top: 5 }}>
                                            <FontAwesome name='close' size={15} color='red' />
                                        </TouchableOpacity>
                                        <FastImage

                                            source={{ uri: image.url_full }}
                                            style={{
                                                width: 100,
                                                height: 100,
                                                marginRight: 5
                                            }}
                                            resizeMode='contain'
                                        />
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={[styles.box, styles.productNameAddContainer, { marginTop: 10 }]}>
                            <View style={styles.tittleContainer}>

                                <Icon name='format-text' size={28} color='#5C8700' />
                                <Heading6 style={[styles.headingText, { paddingLeft: 10 }]}>Tên sản phẩm</Heading6>
                            </View>
                            <View style={styles.productNameAddBox}>
                                <TextInput
                                    style={{ fontSize: 20, padding: 10 }}
                                    value={data?.name}
                                    onChangeText={(value: any) => setData({ ...data, name: value })}
                                    maxFontSizeMultiplier={5}
                                    placeholder="Cái tên nói lên tất cả sẽ giúp ích rất nhiều đấy"
                                    placeholderTextColor={'#424242'}

                                    // Inherit any props passed to it; e.g., multiline, numberOfLines below
                                    multiline={true}
                                    numberOfLines={3}
                                    editable
                                    maxLength={50}
                                />
                            </View>

                        </View>
                        <View style={[styles.box, styles.productDescriptionAddContainer, { marginTop: 10 }]}>
                            <View style={styles.tittleContainer}>

                                <FontAwesome name='paint-brush' size={24} color='#5C8700' />
                                <Heading6 style={[styles.headingText, { paddingLeft: 10 }]}>Miêu tả sản phẩm</Heading6>
                            </View>
                            <View style={styles.productDescriptionAddBox}>
                                <TextInput
                                    style={{ fontSize: 20, padding: 10 }}
                                    value={data?.description}
                                    onChangeText={(value: any) => setData({ ...data, description: value })}
                                    maxFontSizeMultiplier={5}
                                    placeholder="Một đoạn văn miêu tả đầy đủ sẽ giúp sản phẩm của bạ bán dễ hơn. "
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
                                <Heading6 style={[styles.headingText, { paddingLeft: 10 }]}>Phân loại sản phẩm</Heading6>
                            </View>
                            <View style={{}}>
                                <FlatList
                                    horizontal
                                    data={categoriesList}
                                    showsHorizontalScrollIndicator={false}
                                    alwaysBounceHorizontal={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => setData({ ...data, category_id: item.value })}
                                            style={{
                                                margin: 5,
                                                width: 120,
                                            }}>

                                            <View style={{
                                                width: 120,
                                                alignItems: 'center'
                                            }}>
                                                <FastImage resizeMode={FastImage.resizeMode.cover}
                                                    style={{
                                                        height: 70,
                                                        width: 120,
                                                        borderRadius: 5
                                                    }}
                                                    source={{ uri: item.image }} />
                                                <View style={{
                                                    paddingTop: 12,
                                                }}>
                                                    <Text style={{
                                                        color: '#000',
                                                        fontSize: 16,
                                                        fontWeight: data?.category_id === item.value ? 'bold' : 'normal',
                                                        textAlign: 'center'
                                                    }}

                                                        numberOfLines={3}>{item.label}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>

                        </View>
                        <View style={styles.contentContainer}>

                            <View style={styles.buttonsGroup}>
                                <ButtonNormal
                                    outlined
                                    buttonStyle={styles.customButton}
                                    onPress={onGoToStep2}
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