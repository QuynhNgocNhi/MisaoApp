import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "/services/type";


const initialState = {
    userInfo: {} as UserInfo | null,
    isLoading: false,
    errorMessage: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserInfo: state => {
            state.isLoading = true
        },
        getUserInfoSuccess: (state, action: any) => {
            state.userInfo = action.payload.data;
            state.isLoading = false;
        },
        getUserInfoFailed: (state, action: any) => {
            state.isLoading = false;
            state.errorMessage = action.error;
        },
        clearUserInfo: (state) => {
            state.userInfo = null
        }
    }
})

const { actions, reducer } = userSlice

export const { getUserInfo, getUserInfoSuccess, getUserInfoFailed, clearUserInfo } = actions



export default reducer