import { createSlice } from '@reduxjs/toolkit';

import { TicketsShownState } from '../types';

const initialState: TicketsShownState = 5;

const ticketsShown = createSlice({
  name: 'ticketsShown',
  initialState,
  selectors: {
    counter: (state) => state,
  },
  reducers: {
    incCounter: (state, action) => state + action.payload,
  },
});

export const { counter } = ticketsShown.selectors;
export const { incCounter } = ticketsShown.actions;

export default ticketsShown.reducer;
