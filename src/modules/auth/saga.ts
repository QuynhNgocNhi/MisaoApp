import { login } from '../auth/slice';
import { Auth } from './../../services/type';
import { put, call, takeEvery, select } from 'redux-saga/effects';
import { loginSucceeded, loginFailed } from './slice';
import { loginAppAPI } from '../../services';

type PayloadTypes = {
  type: string,
  payload: {
    data: {
      phone: string,
      password: string,
    };
    onError?: any;
    onSuccess?: any;
  }
}
function* loginSideEffect({ payload }: PayloadTypes) {
  try {
    const response: Auth = yield call(loginAppAPI, payload.data);
    yield put(loginSucceeded(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(loginFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}


export default function* authSaga() {
  yield takeEvery(login.type, loginSideEffect);
}
