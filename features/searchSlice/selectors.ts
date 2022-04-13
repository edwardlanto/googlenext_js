import { RootState } from "../../store/store";
import { createSelector } from '@reduxjs/toolkit';

export const selectSearch = (state: RootState) => state.search

export const searchItemsSelector = createSelector(
  selectSearch,
  state => state.items
);

export const searchQuerySelector = createSelector(
  selectSearch,
  state => state.query
);

export const searchInformationSelector = createSelector(
  selectSearch,
  state => state.searchInformation
);

export const searchErrorSelector = createSelector(
  selectSearch,
  state => state.error
);

export const pendingErrorSelector = createSelector(
  selectSearch,
  state => state.pending
);

