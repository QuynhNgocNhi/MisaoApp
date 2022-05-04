import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Pressable,
    Alert,
} from "react-native";
import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";
import { userSelector } from "../../modules/user/selectors";
// import color, layout, style
import color from '../../theme/color';
const myID = 'u1';

const blue = "#3777f0";
const grey = "lightgrey";

const Message = ({ message }: any) => {
    const user = useSelector(userSelector)
    const isMe = message?.buyer_id === user?.id;
    return (
        <View style={[styles.container, isMe ? styles.rightContainer : styles.leftContainer]}>
            {message?.type === 1 ? (
                <FastImage
                    source={{ uri: message?.content }}
                    style={{ width: 120, height: 120 }}
                />
            ) : (
                <Text style={{ fontSize: 20, color: isMe ? color.black : color.white }}>
                    {message.content}
                </Text>
            )}
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: "75%",
    },
    row: {
        flexDirection: "row",
        alignItems: "flex-end",
    },
    messageReply: {
        backgroundColor: "gray",
        padding: 5,
        borderRadius: 5,
    },
    leftContainer: {
        backgroundColor: blue,
        marginLeft: 10,
        marginRight: "auto",
    },
    rightContainer: {
        backgroundColor: grey,
        marginLeft: "auto",
        marginRight: 10,
        alignItems: "flex-end",
    },
});

export default Message;
