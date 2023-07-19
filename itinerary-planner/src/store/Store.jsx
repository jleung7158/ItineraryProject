import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { api } from './api.js'
import tripSliceReducer from '../slices/tripSlice';
import tripFormSliceReducer from '../slices/tripFormSlice.js';

export const store = configureStore({
  reducer: {
    tripFilter: tripSliceReducer,
    tripFormToggler: tripFormSliceReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);