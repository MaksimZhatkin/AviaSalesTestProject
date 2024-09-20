/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import * as css from './Ticket.module.css';

export default function Ticket() {
  return (
    <a href="#" className={css.ticket}>
      <div className={css.ticket_header}>
        <div className={css.ticket_price}>
          <span id="ticket-title" className={css.sr_only}>
            Ticket Price
          </span>
          13 400<span aria-hidden="true"> ₽</span>
        </div>
        <img className={css.airline_logo} src="./img/S7.png" alt="S7 Airlines" />
      </div>

      <ul className={css.flight_info}>
        <li className={css.flight_route}>
          <div className={css.flight_col}>
            <span className={css.flight_title}>MOW – NKT</span>
            <time dateTime="10:45">10:45</time> –<time dateTime="08:00"> 08:00</time>
          </div>
          <div className={css.flight_col} aria-label="Time in transit">
            <span className={css.flight_title}>В ПУТИ:</span>
            <time dateTime="PT21H15M">21ч 15м</time>
          </div>
          <div className={css.flight_col}>
            <span className={css.flight_title} aria-label="Two transfers">
              2 ПЕРЕСАДКИ:
            </span>
            <abbr title="Hong Kong International Airport">HKG</abbr>,<abbr title="Johannesburg"> JNB</abbr>
          </div>
        </li>

        <li className={css.flight_route}>
          <div className={css.flight_col}>
            <span className={css.flight_title}>MOW – NKT</span>
            <time dateTime="10:45">10:45</time> –<time dateTime="08:00"> 08:00</time>
          </div>
          <div className={css.flight_col} aria-label="Time in transit">
            <span className={css.flight_title}>В ПУТИ:</span>
            <time dateTime="PT21H15M">21ч 15м</time>
          </div>
          <div className={css.flight_col}>
            <span className={css.flight_title} aria-label="Two transfers">
              2 ПЕРЕСАДКИ:
            </span>
            <abbr title="Hong Kong International Airport">HKG</abbr>,<abbr title="Johannesburg"> JNB</abbr>
          </div>
        </li>
      </ul>
    </a>
  );
}
