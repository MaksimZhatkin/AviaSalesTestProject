/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FiltersState } from '../types';

const initialState: FiltersState = {
  all: { value: true, title: 'Все' },
  noTransfers: { value: true, title: 'Без пересадок' },
  oneTransfer: { value: true, title: '1 Пересадка' },
  twoTransfers: { value: true, title: '2 Пересадки' },
  threeTransfers: { value: true, title: '3 Пересадки' },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleAll(state) {
      const newValue = !state.all.value;
      state.all.value = newValue;
      state.noTransfers.value = newValue;
      state.oneTransfer.value = newValue;
      state.twoTransfers.value = newValue;
      state.threeTransfers.value = newValue;
    },
    toggleFilter(state, action: PayloadAction<'noTransfers' | 'oneTransfer' | 'twoTransfers' | 'threeTransfers'>) {
      const filterName = action.payload;
      const newFilterValue = !state[filterName].value;
      state[filterName].value = newFilterValue;

      const allSelected = Object.entries(state).every(([key, filter]) => {
        if (key === 'all') return true;
        return filter.value;
      });

      state.all.value = allSelected;
    },
  },
});

export const { toggleAll, toggleFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
