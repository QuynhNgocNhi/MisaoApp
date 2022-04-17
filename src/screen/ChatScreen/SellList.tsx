import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import UserItem from './UserItem';

import ChatUser from '../../assets/data/ChatUser';
export default class ActiveList extends Component {
    render() {
        return (
            <FlatList
                /* onEndReached={true} */
                data={ChatUser}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => {
                    return (
                        <View>
                            {
                                item.chatTypeId == '1' && (
                                    <UserItem User={item}
                                    />
                                )
                            }
                        </View>
                    )
                }}
            /* renderItem={({ item }) =><UserItem  User={item} />} */
            />
        );
    }
}
