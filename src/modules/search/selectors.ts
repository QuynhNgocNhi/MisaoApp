import { createSelector } from 'reselect';

const searchSelector = (state: any) => state.search;

export const masterDataSelector = createSelector(
  searchSelector,
  searchReducer => searchReducer.masterData,
);

export const dataTruckSelector = createSelector(
  searchSelector,
  searchReducer => searchReducer.dataTruck,
);

export const valueSearchSelector = createSelector(
  searchSelector,
  searchReducer => searchReducer.valueSearch,
)

export const loadingSearchSelector = createSelector(
  searchSelector,
  searchReducer => searchReducer.loadingGetTruck,
)

export const currentPageSelector = createSelector(
  searchSelector,
  searchReducer => searchReducer.currentPage,
)

export const loadMoreSelector = createSelector(
  searchSelector,
  searchReducer => searchReducer.isLoadMoreGetTruck,
)