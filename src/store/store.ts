import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './filtersSlice';
import sortReducer from './sortSlice';

const store = configureStore({
  reducer: {
    filters: filterReducer,
    sort: sortReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
