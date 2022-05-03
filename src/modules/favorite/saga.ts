import { MasterDataResponse } from './../../services/type';
import { put, call, takeEvery, select } from 'redux-saga/effects';
import { getDataFavoriteTruck, getDataFavoriteTruckSucceeded, getDataFavoriteTruckFailed, loadMoreDataFavoriteTruck, loadMoreDataFavoriteTruckSucceeded, loadMoreDataFavoriteTruckFailed, addFavorite, addFavoriteSucceeded, addFavoriteFailed } from './slice';
import { getFavoriteTruckListAPI, addFavoriteTruckAPI } from '../../services/api';
import { currentPageFavoriteSelector } from './selectors';

type PayloadTypes = {
  type: string,
  payload: {
    data: any;
    onError?: any;
    onSuccess?: any;
  }
}

function* getDataFavoriteTruckSideEffect() {
  try {
    const response: MasterDataResponse = yield call(getFavoriteTruckListAPI);
    yield put(getDataFavoriteTruckSucceeded(response));
  } catch (error) {
    yield put(getDataFavoriteTruckFailed(error));
  }
}

function* loadMoreDataFavoriteTruckSideEffect() {
  try {
    const currentPage: number = yield select(currentPageFavoriteSelector);
    const data = {
      page: currentPage + 1
    }
    const response: MasterDataResponse = yield call(getFavoriteTruckListAPI, data);
    yield put(loadMoreDataFavoriteTruckSucceeded(response));
  } catch (error) {
    yield put(loadMoreDataFavoriteTruckFailed(error));
  }
}

function* addFavoriteTruckSideEffect({ payload }: PayloadTypes) {
  try {
    yield call(addFavoriteTruckAPI, payload.data);
    yield put(addFavoriteSucceeded(payload.data));
    if (payload.onSuccess) yield call(payload.onSuccess);
  } catch (error) {
    yield put(addFavoriteFailed(error));
  }
}

export default function* favoriteSaga() {
  yield takeEvery(getDataFavoriteTruck.type, getDataFavoriteTruckSideEffect);
  yield takeEvery(loadMoreDataFavoriteTruck.type, loadMoreDataFavoriteTruckSideEffect);
  yield takeEvery(addFavorite.type, addFavoriteTruckSideEffect);
}
