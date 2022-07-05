import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
  masterData: null,
  loadingGetMasterData: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    getMasterData: state => {
      state.loadingGetMasterData = true;
    },
    getMasterDataSucceeded: (state, action: any) => {
      state.loadingGetMasterData = false;
      state.masterData = action.payload.data
    },
    getMasterDataFailed: (state, action: any) => {
      state.loadingGetMasterData = false;
    },
  },
});

const { actions, reducer } = searchSlice;

export const {
  getMasterData,
  getMasterDataSucceeded,
  getMasterDataFailed,


} = actions;





export default reducer;
