import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import { apiSlice } from '@/store/apiSlice';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(api.middleware)
            .concat(apiSlice.middleware),
});
