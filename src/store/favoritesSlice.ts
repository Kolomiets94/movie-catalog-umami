import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const saved = JSON.parse(localStorage.getItem('movie-favorites') || '[]') as number[];

const slice = createSlice({
  name: 'favorites',
  initialState: saved,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const i = state.indexOf(action.payload);
      if (i >= 0) state.splice(i, 1);
      else state.push(action.payload);
      localStorage.setItem('movie-favorites', JSON.stringify(state));
    }
  }
});

export const { toggleFavorite } = slice.actions;
export default slice.reducer;
