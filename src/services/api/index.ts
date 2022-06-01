import {
    Auth, BaseResponse, ErrorResponse, UserInfo, ObjectResponse,
    MasterDataResponse, ParamsLogin, ListResponse,
} from './../type';
import { Alert } from 'react-native';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';
import "react-native-get-random-values";

const BASE_URL = 'http://103.110.86.45/api'
const TIMEOUT = 10000;
const DEBUG = true;

const baseAPI = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
});

let headers: any = {
    "Content-Type": "application/json"
}

let muti_headers: any = {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json',
}

export const _setToken = (token: string) => {
    if (token) {
        headers.authorization = `Bearer ${token}`;
        muti_headers.authorization = `Bearer ${token}`;
    } else {
        headers = {
            "Content-Type": "application/json"
        }
        muti_headers = {
            'Content-Type': 'multipart/form-data'
        }
    }
}


const postFile = async <T>(path: string, data: any): Promise<AxiosResponse<T>> => {
    console.log({ path, method: 'POST', params: data });
    const response = await baseAPI.post<T>(path, data, {
        method: 'POST',
        headers: muti_headers
    });
    return response;
};

const patchFile = async <T>(path: string, data: any): Promise<AxiosResponse<T>> => {
    console.log({ path, method: 'PATCH', params: data });
    const response = await baseAPI.patch<T>(path, data, {
        method: 'PATCH',
        headers: muti_headers
    });
    return response;
};

const post = async <T>(path: string, data: any): Promise<AxiosResponse<T>> => {
    console.log({ path, method: 'POST', params: data });
    const response = await baseAPI.post<T>(path, data, {
        headers: headers
    });
    return response;
};

const patch = async <T>(path: string, data: any): Promise<AxiosResponse> => {
    console.log({ path, method: 'PATCH', params: data });
    const response = await baseAPI.patch<T>(path, data, {
        headers: headers
    });
    return response;
};

const get = async <T>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    const response = await baseAPI.get<T>(path, {
        headers: headers,
        params: config?.params
    });
    console.log({ path, method: 'GET', params: config ? config.params : undefined });
    return response;
};

const del = async <T>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    console.log({ path, method: 'DELETE', params: config ? config.params : undefined });
    const response = await baseAPI.delete<T>(path, {
        headers: headers,
        params: config?.params
    });
    return response;
};

const handleServerError = (error: AxiosError): ErrorResponse => {
    console.log({ error });
    const { response }: any = error;

    if (response && response.status >= 400) {

        if (response.status >= 500) {
            Alert.alert(
                "",
                "Hệ thống đang lỗi, vui lòng thử lại sau!",
                [
                    {
                        text: "OK",
                        style: "cancel"
                    }
                ]
            );
            return {
                message: error?.response?.data?.message,
                errors: error?.response?.data?.message || {},
                status: response.status,
                __typename: 'ErrorResponse'
            };;
        }


        if (response.data && response.status !== 401 && response.status !== 413 && response.status !== 403 && response.status < 500) {
            let messages = [];
            if (response.data.errors) {
                for (const [key, value] of Object.entries(response.data.errors)) {
                    messages.push(value);
                }
            }
            if (messages.length === 0) {
                messages.push(error.message);
            }
            Alert.alert(
                "",
                messages.join('\n'),
                [
                    {
                        text: "OK",
                        style: "cancel"
                    }
                ]
            );
            return {
                message: response.data.message,
                errors: response.data.errors || {},
                __typename: 'ErrorResponse'
            };
        }
        else {
            return {
                message: error?.response?.data?.message,
                errors: {} as any,
                __typename: 'ErrorResponse'
            };
        }
    } else {
        Alert.alert(
            "",
            "Hệ thống đang lỗi, vui lòng thử lại sau!",
            [
                {
                    text: "OK",
                    style: "cancel",
                    onPress: () => { }
                }
            ]
        );
        return {
            message: 'Unhandled ERROR API',
            errors: {} as any,
            __typename: 'ErrorResponse'
        };
    }
}



export const loginAppAPI = async ({ phone, password }: ParamsLogin): Promise<Auth | ErrorResponse> => {
    try {
        const response = await post<Auth>('/auth/login', { phone, password, confirm: true });
        return response.data;
    } catch (error: any) {
        return handleServerError(error);
    }
}

export const register = async (userInfo: UserInfo): Promise<BaseResponse | ErrorResponse> => {
    try {
        const response = await post<BaseResponse>('/auth/register', { ...userInfo, confirm: true });
        return response.data;
    } catch (error: any) {
        return handleServerError(error);

    }
}

export const getMasterDataApi = async (): Promise<ObjectResponse<MasterDataResponse> | ErrorResponse> => {
    try {
        const response = await get<ObjectResponse<MasterDataResponse>>('/master-data/categories');
        return response.data
    } catch (error: any) {
        return handleServerError(error);
    }
}

export const forgetPasswordAPI = async (email: string): Promise<BaseResponse | ErrorResponse> => {
    try {
        const response = await post<BaseResponse>('/auth/forget-password', { email });
        return response.data;
    } catch (error: any) {
        return handleServerError(error);

    }
}

export const getMe = async (): Promise<ObjectResponse<UserInfo> | ErrorResponse> => {
    try {
        const response = await get<ObjectResponse<UserInfo>>(`/me`);
        return response.data
    } catch (error: any) {
        return handleServerError(error);
    }
}


export const checkPhoneExistsAPI = async (phone: string): Promise<BaseResponse | ErrorResponse> => {
    try {
        const response = await post<BaseResponse>('/auth/prepare-login', { phone });
        return response.data;
    } catch (error: any) {
        return handleServerError(error);

    }
}

export const sendOtpRegisterAPI = async (phone: string): Promise<BaseResponse | ErrorResponse> => {
    try {
        const response = await post<BaseResponse>('/auth/register/otp', { phone });
        return response.data;
    } catch (error: any) {
        return handleServerError(error);

    }
}

export const resetPasswordAPI = async (phone: string, password: string, otp: string): Promise<BaseResponse | ErrorResponse> => {
    try {
        const response = await post<BaseResponse>('/auth/reset-password', { phone, password, otp });
        return response.data;
    } catch (error: any) {
        return handleServerError(error);

    }
}

export const sendOtpResetPasswordAPI = async (phone: string): Promise<BaseResponse | ErrorResponse> => {
    try {
        const response = await post<BaseResponse>('/auth/reset-password/otp', { phone });
        return response.data;
    } catch (error: any) {
        return handleServerError(error);

    }
}

export const registerAPI = async (data: any): Promise<BaseResponse | ErrorResponse> => {
    try {
        const response = await post<BaseResponse>('/auth/register', { ...data });
        return response.data;
    } catch (error: any) {
        return handleServerError(error);

    }
}


export const getHotProductListAPI = async (): Promise<ListResponse<any> | ErrorResponse> => {
    try {
        const response = await get<ListResponse<any>>(`/product/hot`);
        return response.data.data
    } catch (error: any) {
        return handleServerError(error);
    }
}

export const getProductListAPI = async (data?: any): Promise<ListResponse<any> | ErrorResponse> => {

    try {
        const response = await get<ListResponse<any>>(`/product`, { params: { ...data } });
        return response.data.data
    } catch (error: any) {
        return handleServerError(error);
    }
}
export const getPostListAPI = async (data?: any): Promise<ListResponse<any> | ErrorResponse> => {
    try {
        const response = await get<ListResponse<any>>(`/buy-request`, { params: { ...data } });
        return response.data.data
    } catch (error: any) {
        return handleServerError(error);
    }
}


export const getProductDetailAPI = async (id?: any): Promise<ObjectResponse<any> | ErrorResponse> => {
    try {
        const response = await get<ObjectResponse<any>>(`/product/${id}`);
        return response.data
    } catch (error: any) {
        return handleServerError(error);
    }
}
export const getPostDetailAPI = async (id?: any): Promise<ObjectResponse<any> | ErrorResponse> => {
    try {
        const response = await get<ObjectResponse<any>>(`/buy-request/${id}`);
        return response.data
    } catch (error: any) {
        return handleServerError(error);
    }
}

export const followUserAPI = async (id: string): Promise<BaseResponse | ErrorResponse> => {
    try {
        const response = await post<BaseResponse>(`/user/${id}/follow`, {});
        return response.data;
    } catch (error: any) {
        return handleServerError(error);

    }
}

export const orderProductAPI = async (data: any): Promise<any | ErrorResponse> => {
    try {
        const response = await post<any>(`/order`, { ...data });
        return response.data;
    } catch (error: any) {
        return handleServerError(error);

    }
}

export const deleteProductAPI = async (id: any): Promise<any | ErrorResponse> => {
    try {
        const response = await post<any>(`/product/${id}/delete`, {});
        return response.data;
    } catch (error: any) {
        return handleServerError(error);

    }
}

export const addProductAPI = async (data: any): Promise<BaseResponse | ErrorResponse> => {
    try {
        const formData = new FormData();
        formData.append('category_id', data?.category_id)
        formData.append('price', data?.price)
        formData.append('name', data?.name)
        formData.append('unit', data?.unit)
        formData.append('is_availabel', data?.is_availabel)
        formData.append('discount', data?.discount)
        formData.append('inventory_number', data?.inventory_number)
        formData.append('seller_address', data?.seller_address)
        formData.append('seller_phone', data?.seller_phone)
        formData.append('seller_name', data?.seller_name)
        formData.append('description', data?.description)
        formData.append('confirm', true)
        let out_of_stock_date = `${data.out_of_stock_date?.getDate()}-${data.out_of_stock_date?.getMonth()}-${data.out_of_stock_date?.getFullYear()}`
        formData.append('out_of_stock_date', out_of_stock_date)
        if (data?.image_list) {
            data?.image_list.forEach((file: any) => {
                formData.append('files[]', {
                    uri: file.url_full,
                    type: 'image/jpeg',
                    name: `${uuidv4()}.jpg`,
                })
            });
        }
        const response = await postFile<any>(`/product-manager`, formData);

        return response.data;
    } catch (error: any) {
        return handleServerError(error);

    }
}
export const editProductAPI = async (data: any): Promise<BaseResponse | ErrorResponse> => {
    try {
        const formData = new FormData();

        formData.append('category_id', data?.category_id)
        formData.append('price', data?.price)
        formData.append('name', data?.name)
        formData.append('unit', data?.unit)
        formData.append('is_availabel', data?.is_availabel)
        formData.append('discount', data?.discount)
        formData.append('inventory_number', data?.inventory_number)
        formData.append('seller_address', data?.seller_address)
        formData.append('seller_phone', data?.seller_phone)
        formData.append('seller_name', data?.seller_name)
        formData.append('description', data?.description)
        formData.append('confirm', true)
        let out_of_stock_date = `${data.out_of_stock_date?.getDate()}-${data.out_of_stock_date?.getMonth()}-${data.out_of_stock_date?.getFullYear()}`
        formData.append('out_of_stock_date', out_of_stock_date)
        if (data?.image_list) {
            data?.image_list.forEach((file: any) => {
                formData.append('files[]', {
                    uri: file.url_full,
                    type: 'image/jpeg',
                    name: `${uuidv4()}.jpg`,
                })
            });
        }
        const response = await postFile<any>(`/product-manager/${data.id}`, formData);

        return response.data;
    } catch (error: any) {
        return handleServerError(error);

    }
}

export const getCharRoomAPI = async (type: any): Promise<ListResponse<any> | ErrorResponse> => {
    try {
        const response = await get<ListResponse<any>>(`/chat`, { params: { type } });
        return response.data.data
    } catch (error: any) {
        return handleServerError(error);
    }
}
export const addPostAPI = async (data: any): Promise<BaseResponse | ErrorResponse> => {
    try {
        const formData = new FormData();
        formData.append('category_id', data?.category_id)
        formData.append('name', data?.name)
        formData.append('is_availabel', data?.is_availabel)
        formData.append('inventory_number', data?.inventory_number)
        formData.append('seller_address', data?.seller_address)
        formData.append('seller_phone', data?.seller_phone)
        formData.append('seller_name', data?.seller_name)
        formData.append('description', data?.description)
        formData.append('confirm', true)
        let limited_date = `${data.limited_date?.getDate()}-${data.limited_date?.getMonth()}-${data.limited_date?.getFullYear()}`
        formData.append('limited_date', limited_date)
        if (data?.image_list) {
            data?.image_list.forEach((file: any) => {
                formData.append('files[]', {
                    uri: file.url_full,
                    type: 'image/jpeg',
                    name: `${uuidv4()}.jpg`,
                })
            });
        }
        const response = await postFile<any>(`/buy-request-manager`, formData);

        return response.data;
    } catch (error: any) {
        return handleServerError(error);

    }
}
export const getMessageListAPI = async (roomID: number, last_id?: number): Promise<ListResponse<any> | ErrorResponse> => {
    try {
        const response = await get<ListResponse<any>>(`/chat/${roomID}/message`, {
            params: {
                last_id
            }
        });
        return response.data.data;
    } catch (error: any) {
        return handleServerError(error);
    }
}

export const sendMessageTextAPI = async (chatRoomID: number, content: string): Promise<BaseResponse | ErrorResponse> => {
    try {
        const response = await post<BaseResponse>(`/chat/${chatRoomID}/message`, { content });
        return response.data;
    } catch (error: any) {
        return handleServerError(error);
    }
}

export const sendMessageFileAPI = async (chatRoomID: number, file: string): Promise<BaseResponse | ErrorResponse> => {
    try {
        const formData = new FormData();
        if (file) {
            formData.append('file', {
                uri: file,
                type: 'image/jpeg',
                name: `${uuidv4()}.jpg`,
            });
        }
        const response = await postFile<BaseResponse>(`/chat/${chatRoomID}/message`, formData);
        return response.data;
    } catch (error: any) {
        return handleServerError(error);
    }
}

export const likeProductAPI = async (product_id: number): Promise<BaseResponse | ErrorResponse> => {
    try {
        const response = await post<BaseResponse>(`/product/${product_id}/favorite`, {});
        return response.data;
    } catch (error: any) {
        return handleServerError(error);
    }
}

export const likePostAPI = async (id: number): Promise<BaseResponse | ErrorResponse> => {
    try {
        const response = await post<BaseResponse>(`/buy-request/${id}/favorite`, {});
        return response.data;
    } catch (error: any) {
        return handleServerError(error);
    }
}


export const likeBuyRequestAPI = async (id: number): Promise<BaseResponse | ErrorResponse> => {
    try {
        const response = await post<BaseResponse>(`/buy-request/${id}/favorite`, {});
        return response.data;
    } catch (error: any) {
        return handleServerError(error);
    }
}

export const getHistorySearchAPI = async (): Promise<ListResponse<any> | ErrorResponse> => {
    try {
        const response = await get<ListResponse<any>>(`/search-recent`);
        return response.data.data;
    } catch (error: any) {
        return handleServerError(error);
    }
}

export const getListProductFavoriteAPI = async (): Promise<ListResponse<any> | ErrorResponse> => {
    try {
        const response = await get<ListResponse<any>>(`/product/favorite`);
        return response.data.data
    } catch (error: any) {
        return handleServerError(error);
    }
}

export const getListMyProductAPI = async (): Promise<ListResponse<any> | ErrorResponse> => {
    try {
        const response = await get<ListResponse<any>>(`/product-manager`);
        return response.data.data
    } catch (error: any) {
        return handleServerError(error);
    }
}

export const getListMyBuyRequestAPI = async (): Promise<ListResponse<any> | ErrorResponse> => {
    try {
        const response = await get<ListResponse<any>>(`/buy-request-manager`);
        return response.data.data
    } catch (error: any) {
        return handleServerError(error);
    }
}

export const getListBuyRequestFavoriteAPI = async (): Promise<ListResponse<any> | ErrorResponse> => {
    try {
        const response = await get<ListResponse<any>>(`/buy-request/favorite`);
        return response.data.data
    } catch (error: any) {
        return handleServerError(error);
    }
}

export const changePasswordAPI = async (data: any): Promise<any | ErrorResponse> => {
    try {
        const response = await post<any>(`/me/change-password`, { ...data });
        return response.data;
    } catch (error: any) {
        return handleServerError(error);

    }
}


export const updateProfileAPI = async (data: any, image: any): Promise<BaseResponse | ErrorResponse> => {
    try {
        const formData = new FormData();
        formData.append('identity_card_number', data?.identity_card_number)
        formData.append('gender', data?.gender)
        formData.append('birthday', data?.birthday)
        formData.append('address', data?.address)
        formData.append('name', data?.name)
        formData.append('confirm', true)
        if (image && image?.id === -1) {
            formData.append('files[]', {
                uri: image.url_full,
                type: 'image/jpeg',
                name: `${uuidv4()}.jpg`,
            })
        }
        const response = await postFile<any>(`/me/update`, formData);
        return response.data;
    } catch (error: any) {
        return handleServerError(error);

    }
}

export const getListMyNotificationAPI = async (): Promise<ListResponse<any> | ErrorResponse> => {
    try {
        const response = await get<ListResponse<any>>(`/notification`);
        return response.data.data
    } catch (error: any) {
        return handleServerError(error);
    }
}

export const getListOrderAPI = async (): Promise<ListResponse<any> | ErrorResponse> => {
    try {
        const response = await get<ListResponse<any>>(`/order`);
        return response.data.data
    } catch (error: any) {
        return handleServerError(error);
    }
}

export const getOtherUserProfile = async (id: any): Promise<UserInfo | ErrorResponse> => {
    try {
        const response = await get<UserInfo>(`/user/${id}`);
        return response.data.data
    } catch (error: any) {
        return handleServerError(error);
    }
}