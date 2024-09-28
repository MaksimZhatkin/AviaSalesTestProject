import React from 'react';

import TicketsList from './modules/TicketsList/TicketsList';
import Sort from './modules/Sort/Sort';
import Aside from './modules/Filters/Filters';
import * as css from './App.module.css';

function App() {
  return (
    <>
      <header className={css.app_header}>
        <h1 className={css.app_title}>Поиск билетов АвиаСейлс</h1>
        <img width="82" height="82" src="img/Logo.svg" alt="Самолет на фоне земного шара" />
      </header>
      <Aside />
      <section className={css.app_content}>
        <Sort />
        <TicketsList />
      </section>
    </>
  );
}

export default App;
