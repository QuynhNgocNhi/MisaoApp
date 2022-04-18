import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import color, layout, style
import color from '../../theme/color';


export default function CustomSwitch({
    selectionMode,
    option1,
    option2,
    option3,
    onSelectSwitch,
}) {
    const [getSelectionMode, setSelectionMode] = useState(selectionMode);

    const updateSwitchData = value => {
        setSelectionMode(value);
        onSelectSwitch(value);
    };

    return (
        <View
            style={{
                height: 35,
                width: '100%',
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'flex-start',
            }}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(1)}
                style={{


                    width: '30%',
                    borderBottomWidth: getSelectionMode == 1 ? 2 : 0,
                    borderColor: getSelectionMode == 1 ? color.linkButton : color.black,
                    alignItems: 'center',

                }}>
                <Text
                    style={{
                        color: getSelectionMode == 1 ? color.linkButton : color.normalText,
                        fontSize: 18,
                        fontWeight: 'bold',
                        fontFamily: 'Roboto-Medium',
                    }}>
                    {option1}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(2)}
                style={{



                    width: '30%',
                    borderBottomWidth: getSelectionMode == 2 ? 2 : 0, borderColor: getSelectionMode == 2 ? color.linkButton : color.black,
                    alignItems: 'center',

                }}>
                <Text
                    style={{
                        color: getSelectionMode == 2 ? color.linkButton : color.normalText,
                        fontSize: 18,
                        fontWeight: 'bold',
                        fontFamily: 'Roboto-Medium',
                    }}>
                    {option2}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(3)}
                style={{



                    width: '30%',
                    borderBottomWidth: getSelectionMode == 3 ? 2 : 0,
                    borderColor: getSelectionMode == 3 ? color.linkButton : color.black,
                    alignItems: 'center',

                }}>
                <Text
                    style={{
                        color: getSelectionMode == 3 ? color.linkButton : color.normalText,
                        fontSize: 18,
                        fontWeight: 'bold',
                        fontFamily: 'Roboto-Medium',
                    }}>
                    {option3}
                </Text>
            </TouchableOpacity>
        </View>
    );
}