import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';

const AppStatusBar = ({ backgroundColor, ...props }) => {
    return (
        <View style={[styles.statusBar, backgroundColor, { position: 'absolute' }]}>
            <StatusBar backgroundColor={backgroundColor} {...props} />
        </View>
    );
};

const BAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({

});

export default AppStatusBar;