import { Truck } from './../../services/type';
import { createSlice } from '@reduxjs/toolkit';

interface Props {
  dataFavoriteTruck: Truck | any,
  loadingGetFavoriteTruck: boolean,
  currentFavoritePage: number,
  loadMoreGetFavoriteTruck: boolean
}

const initialState: Props = {
  dataFavoriteTruck: null,
  loadingGetFavoriteTruck: false,
  loadMoreGetFavoriteTruck: false,
  currentFavoritePage: 0
};

const favoriteSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    getDataFavoriteTruck: (state) => {
      state.loadingGetFavoriteTruck = true
    },
    getDataFavoriteTruckSucceeded: (state, action: any) => {
      state.loadingGetFavoriteTruck = false;
      state.dataFavoriteTruck = action.payload;
      state.currentFavoritePage = 1
    },
    getDataFavoriteTruckFailed: (state, action: any) => {
      state.loadingGetFavoriteTruck = false
    },
    loadMoreDataFavoriteTruck: (state) => {
      state.loadMoreGetFavoriteTruck = true
    },
    loadMoreDataFavoriteTruckSucceeded: (state, action: any) => {
      state.loadMoreGetFavoriteTruck = false;
      state.dataFavoriteTruck.data = [...state.dataFavoriteTruck.data, ...action.payload.data];
      state.currentFavoritePage = action.payload.current_page
    },
    loadMoreDataFavoriteTruckFailed: (state, action: any) => {
      state.loadMoreGetFavoriteTruck = false
    },
    addFavorite: () => { },
    addFavoriteSucceeded: (state, action: any) => {
      state.dataFavoriteTruck.data = state.dataFavoriteTruck.data.filter((item: any) => item.id !== action.payload);
      state.dataFavoriteTruck.total = state.dataFavoriteTruck.total - 1
    },
    addFavoriteFailed: (state, action: any) => {
    }
  },
});

const { actions, reducer } = favoriteSlice;

export const {
  getDataFavoriteTruck,
  getDataFavoriteTruckSucceeded,
  getDataFavoriteTruckFailed,
  loadMoreDataFavoriteTruck,
  loadMoreDataFavoriteTruckSucceeded,
  loadMoreDataFavoriteTruckFailed,
  addFavorite,
  addFavoriteSucceeded,
  addFavoriteFailed
} = actions;

export const onaddFavorite = (data: any) => {
  return { type: addFavorite.type, payload: data };
};



export default reducer;
