import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import { apiSlice } from '@/store/apiSlice';
import bookmarksReducer from './bookmarksSlice';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        bookmarks: bookmarksReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(api.middleware)
            .concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;