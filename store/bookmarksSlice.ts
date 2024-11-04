import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookmarksState {
    bookmarks: number[];
}

const initialState: BookmarksState = {
    bookmarks: [],
};

const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        toggleBookmark: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            if (state.bookmarks.includes(id)) {
                state.bookmarks = state.bookmarks.filter((bookmarkId) => bookmarkId !== id);
            } else {
                state.bookmarks.push(id);
            }
        },
        setBookmarks: (state, action: PayloadAction<number[]>) => {
            state.bookmarks = action.payload;
        },
    },
});

export const { toggleBookmark, setBookmarks } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
