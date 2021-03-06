import searchReducer from '../modules/search/slice';
import authReducer from '../modules/auth/slice';
import { combineReducers } from '@reduxjs/toolkit';
import userInfoReducer from '../modules/user/slice'
import favoriteReducer from '../modules/favorite/slice'
const rootReducer = combineReducers({
    auth: authReducer,
    user: userInfoReducer,
    favorite: favoriteReducer,
    search: searchReducer
});

export default rootReducer;
