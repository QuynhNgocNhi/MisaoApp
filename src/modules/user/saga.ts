import { ObjectResponse, UserInfo } from './../../services/type';
import { put, call, takeEvery } from 'redux-saga/effects';
import { getUserInfo, getUserInfoFailed, getUserInfoSuccess } from './slice';
import { getMe } from '../../services';
import { logout } from '../auth/slice';


function* getUserInfoSideEffect() {
    try {
        const response: ObjectResponse<UserInfo> = yield call(getMe);
        if (response?.status === 401) {
            yield put(logout())
        } else {
            yield put(getUserInfoSuccess(response))
        }
    } catch (error) {
        yield put(getUserInfoFailed(error))
    }
}

export default function* userInfoSaga() {
    yield takeEvery(getUserInfo.type, getUserInfoSideEffect)
}