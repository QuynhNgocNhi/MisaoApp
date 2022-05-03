import {createSelector} from 'reselect';

const authSelector = (state: any) => state.auth;

export const tokenSelector = createSelector(
  authSelector,
  authReducer => authReducer.token,
);

export const loadingLoginSelector = createSelector(
  authSelector,
  authReducer => authReducer.loginLoading,
);

export const remmemberLoginSelector = createSelector(
  authSelector,
  authReducer => authReducer.isRemmemberLogin,
);
export const loadingRefreshTokenSelector = createSelector(
  authSelector,
  authReducer => authReducer.loadingRefreshToken,
);

export const oldLoginAccountSelector = createSelector(
  authSelector,
  authReducer => authReducer.oldAccountLogin,
);
