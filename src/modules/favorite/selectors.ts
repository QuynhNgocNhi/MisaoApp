import { createSelector } from 'reselect';

const favoriteSelector = (state: any) => state.favorite;


export const dataFavoriteTruckSelector = createSelector(
  favoriteSelector,
  favoriteReducer => favoriteReducer.dataFavoriteTruck,
);

export const loadingGetDataFavoriteSelector = createSelector(
  favoriteSelector,
  favoriteReducer => favoriteReducer.loadingGetFavoriteTruck,
)

export const currentPageFavoriteSelector = createSelector(
  favoriteSelector,
  favoriteReducer => favoriteReducer.currentFavoritePage,
)

export const loadMoreFavoriteSelector = createSelector(
  favoriteSelector,
  favoriteReducer => favoriteReducer.loadMoreGetFavoriteTruck,
)