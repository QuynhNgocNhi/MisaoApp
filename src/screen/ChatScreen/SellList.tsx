import { useIsFocused } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { getCharRoomAPI } from '../../services';
import UserItem from './UserItem';
import color from '../../theme/color';
export const SellList = () => {
    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const isFoucsed = useIsFocused()
    const fetchChatRoom = async () => {
        setLoading(true)
        const response = await getCharRoomAPI(2)
        if (response.__typename !== 'ErrorResponse') {
            setData(response.data)
        }
        setLoading(false)
    }
    useEffect(() => {
        fetchChatRoom()
    }, [isFoucsed])
    const updateRoomChatList = async () => {
        const response = await getCharRoomAPI(2)
        if (response.__typename !== 'ErrorResponse') {
            setData(response.data)
        }
    }

    useEffect(() => {
        const reloadInterval = setInterval(() => {
            updateRoomChatList()
        }, 10000)
        return () => clearInterval(reloadInterval)
    }, [])

    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 100 }}>
                <ActivityIndicator animating />
            </View>
        )
    }
    console.log({ data });



    return (
        <FlatList
            style={{ backgroundColor: color.white, paddingTop: 10 }}
            data={data}
            keyExtractor={item => item.id}
            ListEmptyComponent={() => {
                return (
                    <View style={{ flex: 1, paddingTop: 100, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Không tìm thấy dữ liệu</Text>
                    </View>
                )
            }}
            renderItem={({ item, index }) => {
                return (
                    <View>
                        <UserItem chatRoom={item} />
                    </View>
                )
            }}
        />
    );
}
