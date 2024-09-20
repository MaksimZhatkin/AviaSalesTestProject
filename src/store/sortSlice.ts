/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SortState {
  sort: 'cheapest' | 'fastest' | 'optimal';
}

const initialState: SortState = {
  sort: 'cheapest',
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<'cheapest' | 'fastest' | 'optimal'>) {
      state.sort = action.payload;
    },
  },
});

export const { setSort } = sortSlice.actions;
export default sortSlice.reducer;
