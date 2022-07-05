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
                height: 44,
                width: '100%',
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(1)}
                style={{
                    padding: 10,
                    marginRight:10,
                    height: 40,
                    width: '30%',
                    justifyContent: 'space-between',
                    backgroundColor: getSelectionMode == 1 ? color.themeBackground : color.white,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: getSelectionMode == 1 ? color.primaryColor : color.black,
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        color: getSelectionMode == 1 ? color.primaryText : color.normalText,
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
                    height: 40,
                    width: '30%',
                    justifyContent: 'space-between',
                    backgroundColor: getSelectionMode == 2 ? color.themeBackground : color.white,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: getSelectionMode == 2 ? color.primaryColor : color.black,
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
            {/* <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(3)}
                style={{

                    padding: 10,
                    height: 40,
                    width: '30%',
                    backgroundColor: getSelectionMode == 3 ? color.themeBackground : color.white,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: getSelectionMode == 3 ? color.primaryColor : color.black,
                    alignItems: 'center',

                }}>
                <Text
                    style={{
                        color: getSelectionMode == 3 ? color.primaryText : color.normalText,
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'Roboto-Medium',
                    }}>
                    {option3}
                </Text>
            </TouchableOpacity> */}
        </View>
    );
}