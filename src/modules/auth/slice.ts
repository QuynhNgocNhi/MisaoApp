import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  loginLoading: false,
  loginError: '',
  isRemmemberLogin: false,
  loadingRefreshToken: false,
  oldAccountLogin: {
    email: '',
    password: ''
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: state => {
      state.loginLoading = true;
    },
    loginSucceeded: (state, action: any) => {
      state.loginLoading = false;
      state.token = action.payload.data.access_token;
    },
    loginFailed: (state, action: any) => {
      state.loginLoading = false;
      state.loginError = action.loginError;
    },
    logout: state => {
      state.token = ''
    },
    setRemmemberLogin: (state, action: any) => {
      state.isRemmemberLogin = action.payload.isRemmemberLogin
      state.oldAccountLogin = action.payload.oldAccountLogin
    },
    setTokenSlice: (state, action: any) => {
      state.token = action.payload
    },
    refreshToken: state => {
      state.loadingRefreshToken = true
    },
    refreshTokenSuccess: (state, action: any) => {
      state.loadingRefreshToken = false;
      state.token = action.payload.data
    },
    refreshTokenFailed: state => {
      state.loadingRefreshToken = false;
      state.token = ''
    }
  },
});

const { actions, reducer } = authSlice;

export const { login, loginSucceeded, loginFailed, logout, refreshToken, refreshTokenSuccess, refreshTokenFailed,
  setTokenSlice, setRemmemberLogin } = actions;

export const onlogin = (data: any) => {
  return { type: login.type, payload: data };
};


export const onRefreshToken = () => {
  return { type: refreshToken.type, payload: {} }
}

export default reducer;
