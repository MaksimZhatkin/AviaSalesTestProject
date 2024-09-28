import React from 'react';
import { addMinutes, format } from 'date-fns';

import { Ticket } from '../types';

import * as css from './styles.module.css';
import { getStopsTitle } from './helpers';

export default function TicketItem({ ticket }: { ticket: Ticket }) {
  return (
    <a href="https://www.dafk.net/what/" className={css.ticket}>
      <div className={css.ticket_header}>
        <div className={css.ticket_price}>
          <span id="ticket-title" className={css.sr_only}>
            Ticket Price
          </span>
          {ticket.price}
          <span aria-hidden="true"> ₽</span>
        </div>
        <img
          width="110"
          height="55"
          className={css.airline_logo}
          src={`https://images.daisycon.io/airline/?width=300&height=150&color=ffffff&iata=${ticket.carrier}`}
          alt="Carrier's logo"
        />
      </div>

      <ul className={css.flight_info}>
        {ticket.segments.map((segment) => {
          return (
            <li key={segment.date + segment.duration + segment.destination} className={css.flight_route}>
              <div className={css.flight_col}>
                <span className={css.flight_title}>
                  {segment.origin} – {segment.destination}
                </span>
                <time dateTime={format(segment.date, 'hh:mm')}>{format(segment.date, 'hh:mm')}</time> –
                <time dateTime={format(addMinutes(segment.date, segment.duration), 'hh:mm')}>
                  {' '}
                  {format(addMinutes(segment.date, segment.duration), 'hh:mm')}
                </time>
              </div>
              <div className={css.flight_col} aria-label="Time in transit">
                <span className={css.flight_title}>В ПУТИ:</span>
                <time dateTime={`PT${Math.floor(segment.duration / 60)}H${segment.duration % 60}M`}>
                  {Math.floor(segment.duration / 60)}ч {segment.duration % 60}м
                </time>
              </div>
              <div className={css.flight_col}>
                <span className={css.flight_title} aria-label={getStopsTitle(segment.stops.length)}>
                  {getStopsTitle(segment.stops.length)}
                </span>
                {segment.stops.map((stop, stopId) => (
                  <abbr key={`${stop + stopId}`} title={stop}>
                    {stop}
                    {stopId !== segment.stops.length - 1 ? ', ' : ' '}
                  </abbr>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </a>
  );
}
