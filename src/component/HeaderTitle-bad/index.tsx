
// import dependencies
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Header } from 'react-native-elements';

import { Button } from 'react-native-elements';


import LinkButton from '../Button/LinkButton';
// import colors
import color from '../../theme/color';

import { useNavigation } from '@react-navigation/native';

type Props = {
    titleText: string,
    leftIconName: string,
    rightIconName: string,
    navigationNameOfRightIcon: string,

};

const styles = StyleSheet.create({

});

// TabBadgeIcon
const HeaderTitle = ({ titleText, leftIconName, rightIconName, navigationNameOfRightIcon }: props) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Header
                    containerStyle={{ borderBottomWidth: 0, marginVertical: 5 }}
                    backgroundColor={color.themeBackground}
                    centerComponent={
                        <Text style={{ fontSize: 22, color: color.lightBlack, fontWeight: '600', textTransform: 'uppercase' }}>{titleText}</Text>
                    }

                    rightContainerStyle={styles.rightContainer}
                    leftComponent={
                        <Button type="clear" onPress={() => { navigation.goBack(); }}
                            icon={<Icon
                                name={leftIconName}
                                size={22}
                                color={'#ffffff'} />} />

                    }
                    rightComponent={
                        <Button type="clear" onPress={() => { navigation.navigate({ navigationNameOfRightIcon }); }}
                            icon={<Icon
                                name={rightIconName}
                                size={22}
                                color={'#ffffff'} />} />

                    }


                />
            </View>
        </View>


    );
};

export default HeaderTitle;
