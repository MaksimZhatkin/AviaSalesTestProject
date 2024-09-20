import React from 'react';

import Ticket from '../Ticket/Ticket';
import ShowMore from '../ShowMore/ShowMore';

import * as css from './Body.module.css';

export default function Body() {
  return (
    <>
      <ul className={css.ticket_list}>
        <li className={css.item}>
          <Ticket />
        </li>
        <li className={css.item}>
          <Ticket />
        </li>
        <li className={css.item}>
          <Ticket />
        </li>
      </ul>
      <ShowMore />
    </>
  );
}
