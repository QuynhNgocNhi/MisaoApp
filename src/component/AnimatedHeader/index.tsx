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

import FontAwesome from 'react-native-vector-icons/FontAwesome'


const HEADER_HEIGHT = 150;
const HomeHeader = () => {

    return (
        <View style={styles.root}>
            <View style={styles.topContainer}>
                <Header
                    containerStyle={{ borderBottomWidth: 0, }}
                    backgroundColor={color.themeBackground}
                    centerComponent={
                        <Logo style={styles.Logo}>Misao</Logo>
                    }
                    rightContainerStyle={styles.rightContainer}
                    rightComponent={

                        <View style={styles.iconListContainer}>
                            <View style={styles.bookmark}>

                                <FontAwesome
                                    name={'bookmark-o'}
                                    size={22}
                                    color={'#ffffff'} />


                            </View>
                            <View style={styles.heart}>

                                <FontAwesome
                                    name={'heart-o'}
                                    size={22}
                                    color={'#ffffff'} />
                            </View>
                            <View style={styles.notification}>

                                <FontAwesome
                                    name={'bell-o'}
                                    size={22}
                                    color={'#ffffff'} />


                            </View>
                        </View>

                    }


                />

            </View>
            <View style={styles.middleContainer} >
                <View style={styles.search}>
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

        backgroundColor: color.black
    },
    LogoContainer: {


    },
    Logo: {
        color: color.white,
        fontSize: 24,


    },
    rightContainer: {
        flexGrow: 1,

    },
    iconListContainer: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: "row",

    },
    middleContainer: {
        alignItems: 'center',
        backgroundColor: color.Black,

    },
    search: {
        width: '95%',
    },


});
export default HomeHeader;