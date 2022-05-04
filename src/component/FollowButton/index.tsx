import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import color, layout, style
import color from '../../theme/color';


export default function CustomSwitch({
    selectionMode,
    option1,
    option2,
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

                width: '100%',
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(1)}
                style={{
                    padding: 10,

                    width: '50%',
                    justifyContent: 'space-between',
                    backgroundColor: getSelectionMode == 1 ? color.background : 'transparent',
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: getSelectionMode == 1 ? color.primaryColor : 'transparent',
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        color: getSelectionMode == 1 ? color.primaryColor : color.normalText,
                        fontSize: 16,
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
                    padding: 10,

                    width: '50%',
                    justifyContent: 'space-between',
                    backgroundColor: getSelectionMode == 2 ? color.background : 'transparent',
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: getSelectionMode == 2 ? color.primaryColor : 'transparent',
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        color: getSelectionMode == 2 ? color.primaryText : color.normalText,
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'Roboto-Medium',
                    }}>
                    {option2}
                </Text>
            </TouchableOpacity>

        </View>
    );
}