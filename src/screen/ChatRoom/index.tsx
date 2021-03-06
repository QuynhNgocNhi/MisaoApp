import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    SafeAreaView,
    ActivityIndicator,
    Platform,
    Alert,
    TouchableOpacity
} from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { Header } from 'react-native-elements';
// import color, layout, style
import color from '../../theme/color';
import HeaderIconButton from '../../component/HeaderButton';
const BACK_ICON = Platform.OS === 'ios' ? 'ios-chevron-back-outline' : 'md-chevron-back';

import Message from "../../component/Message";
import MessageInput from "../../component/MessageInput";
import messages from '../../assets/data/Chat'
import { getMessageListAPI, sendMessageFileAPI, sendMessageTextAPI } from "../../services";
import { userSelector } from "../../modules/user/selectors";
import { useSelector } from "react-redux";
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from "react-native-fast-image";
type RouteParams = {
    id: any,
    chatRoom: any
}
export default function ChatRoomScreen() {
    const navigation = useNavigation<any>();
    const [messageList, setMessageList] = useState<any>([])
    const { params } = useRoute<RouteProp<Record<string, RouteParams>, string>>();
    const [message, setMessage] = useState<string>('')
    const [refresh, setRefresh] = useState<boolean>(false)
    const [tempImage, setTempImage] = useState<any>(null)
    const [isSending, setIsSending] = useState<boolean>(false)
    const userInfo = useSelector(userSelector)


    const fetchMessageList = async (lastId?: number) => {
        const response = await getMessageListAPI(params?.id, lastId)
        if (response.__typename !== 'ErrorResponse') {
            if (response.data) {
                setMessageList(response.data)

            }
        }
    }
    useEffect(() => {
        if (params?.id) {
            fetchMessageList()

        }
    }, [isSending])


    useEffect(() => {
        const reloadInterval = setInterval(() => {
            if (params?.id) {
                fetchMessageList()
            }
        }, 10000)
        return () => clearInterval(reloadInterval)
    }, [])
    const onPickImage = () => {
        ImagePicker.openPicker({
            mediaType: 'photo',
        }).then(image => {
            setTempImage(image.path)
        });

    }
    const onSendMessage = async () => {
        setIsSending(true)
        if (tempImage) {
            const response = await sendMessageFileAPI(params?.id, tempImage)
            if (response.__typename !== 'ErrorResponse') {
                setTempImage(null)

                setRefresh(!refresh)
            }
        } else if (message) {
            const response = await sendMessageTextAPI(params?.id, message)
            if (response.__typename !== 'ErrorResponse') {
                setMessage('')
                setRefresh(!refresh)
            }
        } else {
            Alert.alert("", "Vui l??ng nh???p n???i dung tin nh???n",
                [
                    { text: "OK", onPress: () => { } }
                ])
        }
        setIsSending(false)
    }


    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.headerContainer}>
                <Header

                    containerStyle={{ borderBottomWidth: 0, marginVertical: 10 }}
                    backgroundColor={color.white}
                    centerComponent={
                        <Text style={{ fontSize: 18, color: color.primaryText, fontWeight: '500', textTransform: 'uppercase', paddingTop: 5 }}>Tr?? chuy???n</Text>
                    }
                    leftComponent={
                        <HeaderIconButton
                            onPress={() => navigation.goBack()}
                            name={BACK_ICON}
                            color={color.lightBlack}
                            size={30}
                        />
                    }
                    rightComponent={
                        <View style={styles.row}>

                            <HeaderIconButton
                                onPress={() => navigation.goBack()}
                                name={'md-call-outline'}
                                size={27}
                                color={color.black}
                            />
                            <HeaderIconButton
                                onPress={() => navigation.goBack()}
                                name={'md-videocam-outline'}
                                size={30}
                                color={color.black}
                            />
                        </View>

                    }
                />
                <View style={{ justifyContent: 'space-between', backgroundColor: '#F4F4F4', height: 70, width: '100%', flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        {console.log(params)}
                        <FastImage
                            source={{ uri: params?.chatRoom?.buy_request_id ? params?.chatRoom?.buy_request?.images && params?.chatRoom?.buy_request?.images[0]?.url_full : (params?.chatRoom?.product?.images && params?.chatRoom?.product?.images[0]?.url_full) }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 4,
                                marginRight: 10

                            }}
                        />
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18, width: '65%' }} numberOfLines={1}>
                            {params?.chatRoom?.buy_request_id ? params?.chatRoom?.buy_request?.name : params?.chatRoom?.product?.name}
                        </Text>
                        {console.log(params.chatRoom)}
                        <TouchableOpacity style={{
                            height: 40,
                            paddingVertical: 0, paddingHorizontal: 10,
                            alignItems: 'center', justifyContent: 'center',
                            alignSelf: 'center',
                            backgroundColor: color.primaryColor, borderRadius: 4
                        }} onPress={() => {
                            if (params?.chatRoom?.buy_request_id) {
                                navigation.navigate('PostDetail', { data: { ...params.chatRoom.buy_request, postId: params.chatRoom.buy_request_id } });
                            } else {
                                navigation.navigate('ProductDetail', { data: { ...params.chatRoom.product, productId: params.chatRoom.product_id } });
                            }
                        }}>
                            <Text style={{ color: 'white', fontSize: 16, }}>Chi ti???t</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <FlatList
                data={messageList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Message
                        message={item}
                    />
                )}
                inverted
            />
            <MessageInput
                tempImage={tempImage}
                setTempImage={setTempImage}
                onPickImage={onPickImage}
                message={message}
                setMessage={setMessage}
                onSendMessage={onSendMessage}

            />
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: "white",
        flex: 1,
    },
    row: {

        flexDirection: "row",

    },
});
