import React from 'react';

import Body from './components/Body/Body';
import Sort from './components/Sort/Sort';
import Aside from './components/Aside/Aside';
import * as css from './App.module.css';

function App() {
  return (
    <>
      <header className={css.app_header}>
        <h1 className={css.app_title}>Поиск билетов АвиаСейлс</h1>
        <img src="img/Logo.svg" alt="Самолет на фоне земного шара" />
      </header>
      <Aside />
      <section className={css.app_content}>
        <Sort />
        <Body />
      </section>
    </>
  );
}

export default App;
