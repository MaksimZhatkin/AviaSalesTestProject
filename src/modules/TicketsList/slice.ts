import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

import { Ticket, TicketId, TicketsState } from '../types';

import { createTicketId } from './helpers';

export const fetchSearchId = createAsyncThunk<string, void, { rejectValue: string }>(
  'tickets/fetchSearchId',
  async (_, { rejectWithValue }): Promise<any> => {
    const maxAttempts = 3;
    const attempt = 0;

    const fetchSearchIdHelper: any = async (_attempt: number) => {
      try {
        const response = await fetch('https://aviasales-test-api.kata.academy/search');

        if (!response.ok) {
          if (_attempt < maxAttempts) {
            await new Promise((resolve) => {
              setTimeout(resolve, 1000);
            });
            return fetchSearchIdHelper(_attempt + 1);
          }
          throw new Error('Something wrong!');
        }

        const searchId = await response.json();
        return searchId.searchId;
      } catch (error: any) {
        if (_attempt < maxAttempts) {
          await new Promise((resolve) => {
            setTimeout(resolve, 1000);
          });
          return fetchSearchIdHelper(_attempt + 1);
        }
        return rejectWithValue(error.message);
      }
    };
    return fetchSearchIdHelper(attempt);
  }
);

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async (searchId: string | null, { rejectWithValue, dispatch }): Promise<any> => {
    const maxAttempts = 3;
    const attempt = 0;

    const fetchTicketsHelper: any = async (_attempt: number) => {
      try {
        const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);

        if (!response.ok) {
          if (_attempt < maxAttempts) {
            await new Promise((resolve) => {
              setTimeout(resolve, 1000);
            });
            return fetchTicketsHelper(_attempt + 1);
          }
          throw new Error('Something went wrong with fetching tickets!');
        }

        const data = await response.json();

        // eslint-disable-next-line no-use-before-define
        dispatch(storeTickets(data.tickets));
        if (!data.stop) {
          return fetchTicketsHelper(0);
        }

        return data;
      } catch (error: any) {
        if (_attempt < maxAttempts) {
          await new Promise((resolve) => {
            setTimeout(resolve, 1000);
          });
          return fetchTicketsHelper(_attempt + 1);
        }
        return rejectWithValue(error.message);
      }
    };

    return fetchTicketsHelper(attempt);
  }
);

const filterTicketsSelector = createSelector(
  (state) => state.tickets.entities,
  (state) => state.tickets.ids,
  (_, filters) => filters,
  (entities: Record<TicketId, Ticket> | object, ids: TicketId[], filters) => {
    if (!entities) {
      throw new Error('tickets is null!');
    }

    return ids
      .map((id) => (entities as Record<TicketId, Ticket>)[id])
      .filter((ticket) => {
        const stops = ticket.segments[0].stops.length;
        if (filters.all.value) return true;
        if (stops === 0 && filters.noTransfers.value) return true;
        if (stops === 1 && filters.oneTransfer.value) return true;
        if (stops === 2 && filters.twoTransfers.value) return true;
        if (stops === 3 && filters.threeTransfers.value) return true;
        return false;
      });
  }
);

const sortFilteredTicketsSelector = createSelector(
  filterTicketsSelector,
  (_: TicketsState, __, sortValue) => sortValue,
  (filteredTickets, sortValue) => {
    return [...filteredTickets].sort((a: Ticket, b: Ticket) => {
      if (sortValue === 'cheapest') {
        return a.price - b.price;
      }
      if (sortValue === 'fastest') {
        return (
          a.segments.reduce((sum, segment) => sum + segment.duration, 0) -
          b.segments.reduce((sum, segment) => sum + segment.duration, 0)
        );
      }
      if (sortValue === 'optimal') {
        const aDuration = a.segments.reduce((sum, segment) => sum + segment.duration, 0);
        const bDuration = b.segments.reduce((sum, segment) => sum + segment.duration, 0);
        const aOptimal = a.price + aDuration;
        const bOptimal = b.price + bDuration;
        return aOptimal - bOptimal;
      }
      return -Infinity;
    });
  }
);

const initialState: TicketsState = {
  searchId: null,
  status: 'loading',
  ticketsData: { stop: false, tickets: [] },
  tickets: {
    entities: [],
    ids: [],
  },
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  selectors: {
    filterTickets: filterTicketsSelector,
    sortFilteredTickets: sortFilteredTicketsSelector,
  },
  reducers: {
    storeTickets(state, action) {
      const newTickets = action.payload;

      if (!state.ticketsData.tickets) {
        throw new Error('tickets is null!');
      }

      const newEntities = Object.fromEntries(newTickets.map((ticket: Ticket) => [createTicketId(ticket), ticket]));
      const newIds = newTickets.map((ticket: Ticket) => createTicketId(ticket));

      return {
        ...state,
        tickets: {
          ...state.tickets,
          entities: { ...state.tickets.entities, ...newEntities },
          ids: [...state.tickets.ids, ...newIds],
        },
      };
    },
  },
  extraReducers: (builder) => {
    // SearchId
    builder.addCase(fetchSearchId.pending, (state) => {
      return { ...state, status: 'loading' };
    });
    builder.addCase(fetchSearchId.fulfilled, (state, action) => {
      return { ...state, status: 'resolved', searchId: action.payload };
    });
    builder.addCase(fetchSearchId.rejected, (state) => {
      return { ...state, status: 'rejected', searchId: null };
    });

    // Tickets
    builder.addCase(fetchTickets.pending, (state) => {
      return { ...state, status: 'loading' };
    });

    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      return { ...state, status: 'resolved', ticketsData: { ...state.ticketsData, stop: action.payload.stop } };
    });

    builder.addCase(fetchTickets.rejected, (state) => {
      return { ...state, status: 'rejected' };
    });
  },
});

export const { storeTickets } = ticketsSlice.actions;
export const { sortFilteredTickets, filterTickets } = ticketsSlice.selectors;
export default ticketsSlice.reducer;
