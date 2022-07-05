import { MasterDataResponse } from './../../services/type';
import { put, call, takeEvery, select } from 'redux-saga/effects';
import { getMasterData, getMasterDataSucceeded, getMasterDataFailed } from './slice';
import { getMasterDataApi } from '../../services/api';

type PayloadTypes = {
  type: string,
  payload: {
    data: any;
    onError?: any;
    onSuccess?: any;
  }
}

function* getDataMasterSideEffect() {
  try {
    const response: MasterDataResponse = yield call(getMasterDataApi);
    yield put(getMasterDataSucceeded(response));
  } catch (error) {
    yield put(getMasterDataFailed(error));
  }
}

export default function* searchSaga() {
  yield takeEvery(getMasterData.type, getDataMasterSideEffect);

}
