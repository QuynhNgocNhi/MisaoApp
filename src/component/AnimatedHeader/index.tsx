import React from 'react';
import { Animated, View, StyleSheet, Image } from 'react-native';
import { Logo, Heading6 } from '../../component/Text';
// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import SearchBar from '../SearchBar';
import SearchBox from '../SearchBox';
import { Button } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParameterList } from '../../MainNavigator';


const HEADER_HEIGHT = 145;
const HomeHeader = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.root}>
            <View style={styles.topContainer}>
                <Header
                    containerStyle={{ borderBottomWidth: 0, marginVertical: 5 }}
                    backgroundColor={color.themeBackground}
                    centerComponent={
                        <Logo style={styles.Logo}>Misao</Logo>
                    }
                    rightContainerStyle={styles.rightContainer}
                    rightComponent={

                        <View style={styles.iconListContainer}>
                            <View style={styles.bookmark}>

                                <Button type="clear" onPress={() => { navigation.navigate('PostsSaved'); }}
                                    icon={<FontAwesome
                                        name={'bookmark-o'}
                                        size={22}
                                        color={'#ffffff'} />} />




                            </View>
                            <View style={styles.heart}>
                                <Button type="clear" onPress={() => { navigation.navigate('ProductsSaved'); }}
                                    icon={<FontAwesome
                                        name={'heart-o'}
                                        size={22}
                                        color={'#ffffff'} />} />

                            </View>
                            <View style={styles.notification}>
                                <Button type="clear" onPress={() => { navigation.navigate('Notification'); }}
                                    icon={<FontAwesome
                                        name={'bell-o'}
                                        size={22}
                                        color={'#ffffff'} />} />



                            </View>
                        </View>

                    }


                />

            </View>
            <View style={styles.middleContainer} >

                <View style={styles.search} >
                    <SearchBar />
                </View>

            </View>






        </View>



    );
};
const styles = StyleSheet.create({

    root: {
        backgroundColor: color.themeBackground,
        height: HEADER_HEIGHT,
        flexDirection: 'column',
    },
    topContainer: {


    },
    LogoContainer: {


    },
    Logo: {
        marginVertical: 5,
        color: color.white,
        fontSize: 24,


    },
    rightContainer: {
        flexGrow: 1,

    },
    iconListContainer: {
        flexDirection: "row",
    },

    middleContainer: {
        alignItems: 'center',

        bottom: 20,


    },
    search: {
        width: '95%',

    },


});


export default HomeHeader;