import React, { useEffect } from 'react';

import TicketItem from '../TicketItem/TicketItem';
import Loader from '../Loader/Loader';
import ShowMore from '../ShowMore/ShowMore';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Ticket } from '../types';

import { fetchSearchId, fetchTickets, sortFilteredTickets } from './slice';
import * as css from './styles.module.css';
import { createTicketId } from './helpers';
export default function TicketsList() {
  const dispatch = useAppDispatch();

  const shownTicketsCounter = useAppSelector((state) => state.ticketsShown);
  const { status, searchId } = useAppSelector((state) => state.tickets);
  const filters = useAppSelector((state) => state.filters);
  const sortValue = useAppSelector((state) => state.sort.sortValue);
  const sortedTickets = useAppSelector((state) => sortFilteredTickets(state, filters, sortValue));

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchSearchId());
    };

    if (!searchId) {
      fetchData();
    }
  }, [dispatch, searchId]);

  useEffect(() => {
    const fetchTicketsData = async () => {
      if (searchId) {
        await dispatch(fetchTickets(searchId));
      }
    };

    fetchTicketsData();
  }, [dispatch, searchId]);

  useEffect(() => {}, [dispatch, filters]);

  if (status === 'rejected') {
    return <p className={css.tickets_message}>Что-то пошло не так. Пожалуйста, перезагрузите страницу!</p>;
  }
  if (sortedTickets.length === 0 && status !== 'loading') {
    return <p className={css.tickets_message}>Рейсов, подходящих под заданные фильтры, не найдено!</p>;
  }

  return (
    <>
      {status === 'loading' ? <Loader /> : null}
      <ul className={css.tickets_list}>
        {sortedTickets.slice(0, shownTicketsCounter).map((ticket: Ticket) => (
          <li key={createTicketId(ticket)} className={css.tickets_list_item}>
            <TicketItem ticket={ticket} />
          </li>
        ))}
      </ul>
      <ShowMore />
    </>
  );
}
