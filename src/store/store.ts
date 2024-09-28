import { configureStore, createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';

import ticketsReducer from '../modules/TicketsList/slice';
import sortReducer from '../modules/Sort/slice';
import filterReducer from '../modules/Filters/slice';
import ticketsShownReducer from '../modules/ShowMore/slice';

const store = configureStore({
  reducer: {
    filters: filterReducer,
    sort: sortReducer,
    tickets: ticketsReducer,
    ticketsShown: ticketsShownReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const createAppSelector = createSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<typeof store>();
