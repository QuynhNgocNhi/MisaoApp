import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    SafeAreaView,
    ActivityIndicator,
    Platform
} from "react-native";
import { useNavigation } from '@react-navigation/native';

import { Header } from 'react-native-elements';
// import color, layout, style
import color from '../../theme/color';
import HeaderIconButton from '../../component/HeaderButton';
const BACK_ICON = Platform.OS === 'ios' ? 'ios-chevron-back-outline' : 'md-chevron-back';

import Message from "../../component/Message";
import MessageInput from "../../component/MessageInput";
import messages from '../../assets/data/Chat'
export default function ChatRoomScreen() {
    const navigation = useNavigation<any>();


    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.headerContainer}>
                <Header

                    containerStyle={{ borderBottomWidth: 0, marginVertical: 10 }}
                    backgroundColor={color.white}
                    centerComponent={
                        <Text style={{ fontSize: 18, color: color.primaryText, fontWeight: '500', textTransform: 'uppercase', paddingTop: 5 }}>Trò chuyện</Text>
                    }
                    leftComponent={
                        <HeaderIconButton
                            onPress={() => navigation.goBack()}
                            name={BACK_ICON}
                            color={color.lightBlack}
                            size={30}
                        />
                    }
                    rightComponent={
                        <View style={styles.row}>

                            <HeaderIconButton
                                onPress={() => navigation.goBack()}
                                name={'md-call-outline'}
                                size={27}
                                color={color.black}
                            />
                            <HeaderIconButton
                                onPress={() => navigation.goBack()}
                                name={'md-videocam-outline'}
                                size={30}
                                color={color.black}
                            />
                        </View>

                    }



                />
            </View>
            <FlatList
                data={messages.messages}
                renderItem={({ item }) => (
                    <Message
                        message={item}

                    />
                )}
                inverted
            />
            <MessageInput

            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: "white",
        flex: 1,
    },
    row: {

        flexDirection: "row",

    },
});
