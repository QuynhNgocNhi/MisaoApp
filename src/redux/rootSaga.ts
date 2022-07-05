import searchSaga from '../modules/search/saga';
import { all } from 'redux-saga/effects';
import authSaga from '../modules/auth/saga';
import favoriteSaga from '../modules/favorite/saga';
import userSaga from '..//modules/user/saga';
function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    favoriteSaga(),
    searchSaga()
  ]);
}
export default rootSaga;
