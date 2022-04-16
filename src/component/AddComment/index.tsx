import { Image, View, Text, TextInput, StyleSheet, LogBox } from 'react-native'
import React, { useEffect } from 'react';
import { Heading6 } from '../../component/Text';
// import color, layout, style
import color from '../../theme/color';

import { Avatar } from 'react-native-elements';


const AddComment = () => {
    const userAvatar = require('../../assets/avatar/4.png')
    useEffect(() => {

        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    }, [])
    return (
        <View style={styles.commentItem}>

            <View style={styles.addCommentContainer}>
                <Avatar
                    size="medium"
                    rounded
                    containerStyle={{
                        borderColor: 'grey',
                        borderStyle: 'solid',
                        borderWidth: 1,
                    }}
                    source={userAvatar}
                />
                <View style={{ alignItems: 'center', flexDirection: 'row', width: '100%' }}>

                    <TextInput style={styles.commentField}


                        maxFontSizeMultiplier={5}
                        placeholder="Viết bình luận... "
                        placeholderTextColor={color.normalText}

                        // Inherit any props passed to it; e.g., multiline, numberOfLines below


                        editable
                        maxLength={50}
                    />


                </View>

            </View>

        </View>

    )
}
const styles = StyleSheet.create({

    commentItem: {
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,

    },
    addCommentContainer: {
        width: '90%',
        flexDirection: 'row',


        alignItems: 'center',
    },
    commentField: {

        fontSize: 18,
        padding: 10,
        borderWidth: 1,
        width: '95%',
        paddingLeft: 15,
        marginLeft: 10,
        borderRadius: 40,
        borderColor: color.borderColor,
        color: color.normalText



    }

});
export default AddComment;