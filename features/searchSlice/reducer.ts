import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { getSearch, setQuery } from './actions';

interface ISearchInformation{
    "searchTime": number,
    "formattedSearchTime": number,
    "totalResults": Number,
    "formattedTotalResults": number
}

export type SearchState = {
    items: any[],
    query: any,
    pending: boolean;
    error: any,
    searchInformation: ISearchInformation | null
};

const initialState: SearchState = {
    items: [],
    query: "",
    pending: false,
    error: false,
    searchInformation: {
        searchTime: 0,
        formattedSearchTime: 0,
        totalResults: 0,
        formattedTotalResults: 0
    }
};

export const searchReducer = createReducer(initialState, builder => {
    builder
        .addCase(getSearch.pending, (state) => {
            state.pending = true;
        })
        .addCase(getSearch.fulfilled, (state, action) => {
            state.pending = false;
            state.items = action.payload.items;
            state.searchInformation = action.payload.searchInformation;
        })
        .addCase(getSearch.rejected, (state, { error })=> {
            state.pending = false;
            console.log(error);
            state.error = error.message
        })
        .addCase(setQuery, (state, action) => {
            state.query = action.payload;
        })
});

export default searchReducer;