import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';

export const getSearch = createAsyncThunk('search/getSearch', async (action: any) => {
  const response = await  axios(`https://www.googleapis.com/customsearch/v1?key=${process.env.REACT_APP_API_KEY}&cx=${process.env.REACT_APP_CONTEXT_KEY}&q=${action}`)

  return response.data;
});

export const setQuery = createAction<string>('search/query')