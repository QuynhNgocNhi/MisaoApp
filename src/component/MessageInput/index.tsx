import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    Image,
    Alert,
} from "react-native";

import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { Button } from 'react-native-elements';
// import color, layout, style
import color from '../../theme/color';

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const navigation = useNavigation();

    return (

        <View style={[styles.root, styles.row]}>
            <View style={styles.inputContainer}>
                <Icon
                    name='emotsmile'
                    type='simple-line-icon'
                    color={color.normalText}
                    size={25}
                    style={styles.icon}

                />
                <TextInput
                    placeholder="Nhập tin nhắn..."

                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}>
                </TextInput>


                <Button
                    type='clear'
                    title='Gửi'
                    titleStyle={{ fontSize: 20, color: color.primaryColor }}
                />
                <Icon
                    name='image'
                    type='feather'
                    color={color.normalText}
                    size={25}
                    style={styles.icon}
                />
            </View>



        </View >


    );
};

const styles = StyleSheet.create({
    root: {
        padding: 10,
    },
    row: {
        flexDirection: "row",
    },
    inputContainer: {
        backgroundColor: "#f2f2f2",
        flex: 1,

        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#dedede",
        alignItems: "center",
        flexDirection: "row",
        padding: 5,

    },
    input: {
        flex: 1,
        marginHorizontal: 5,
        fontSize: 18,
    },
    icon: {
        marginHorizontal: 5,
        marginRight: 10
    },
    buttonContainer: {
        width: 40,
        height: 40,
        backgroundColor: "#3777f0",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 35,
    },

    sendImageContainer: {
        flexDirection: "row",
        marginVertical: 10,
        alignSelf: "stretch",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "lightgray",
        borderRadius: 10,
    },
});

export default MessageInput;
