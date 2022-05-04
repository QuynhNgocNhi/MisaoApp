import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { getCharRoomAPI } from '../../services';
import UserItem from './UserItem';
export const SellList = () => {
    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(false)
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
    }, [])
    const updateRoomChatList = async () => {
        const response = await getCharRoomAPI(1)
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


    return (
        <FlatList
            /* onEndReached={true} */
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
                        <UserItem chatRoom={item}/>
                    </View>
                )
            }}
        />
    );
}
