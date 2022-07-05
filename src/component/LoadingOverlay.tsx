import React from 'react';
import { Modal, View, ActivityIndicator } from 'react-native';

type PropsType = {
    title?: string;
    loading: boolean;
};

const LoadingOverlay = ({ loading, ...rest }: PropsType) => (
    <Modal animationType='fade' transparent visible={loading} {...rest}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <ActivityIndicator size={'large'} color={'#ff1744'} />
        </View>
    </Modal>
);

export default LoadingOverlay;
