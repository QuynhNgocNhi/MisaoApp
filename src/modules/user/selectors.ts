import { createSelector } from 'reselect';


const selector = (state: any) => state.user

export const userSelector = createSelector(
    selector,
    userReducer => userReducer.userInfo
)