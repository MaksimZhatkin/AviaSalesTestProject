/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Filter {
  value: boolean;
  title: string;
}

interface FiltersState {
  filters: {
    all: Filter;
    noTransfers: Filter;
    oneTransfer: Filter;
    twoTransfers: Filter;
    threeTransfers: Filter;
  };
}

const initialState: FiltersState = {
  filters: {
    all: { value: false, title: 'Все' },
    noTransfers: { value: false, title: 'Без пересадок' },
    oneTransfer: { value: false, title: '1 Пересадка' },
    twoTransfers: { value: false, title: '2 Пересадки' },
    threeTransfers: { value: false, title: '3 Пересадки' },
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleAll(state) {
      const newValue = !state.filters.all.value;
      state.filters.all.value = newValue;
      state.filters.noTransfers.value = newValue;
      state.filters.oneTransfer.value = newValue;
      state.filters.twoTransfers.value = newValue;
      state.filters.threeTransfers.value = newValue;
    },
    toggleFilter(state, action: PayloadAction<'noTransfers' | 'oneTransfer' | 'twoTransfers' | 'threeTransfers'>) {
      const filterName = action.payload;
      const newFilterValue = !state.filters[filterName].value;
      state.filters[filterName].value = newFilterValue;

      const allSelected = Object.entries(state.filters).every(([key, filter]) => {
        if (key === 'all') return true;
        return filter.value;
      });

      state.filters.all.value = allSelected;
    },
  },
});

export const { toggleAll, toggleFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
