import { configureStore } from '@reduxjs/toolkit';
import { api } from './api'; // Import your primary API slice
import { apiSlice } from '@/store/apiSlice'; // Import your additional API slice

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
