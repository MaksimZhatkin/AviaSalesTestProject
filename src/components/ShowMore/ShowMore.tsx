import React from 'react';

import * as css from './ShowMore.module.css';

export default function ShowMore() {
  return (
    <button className={css.showmore} type="button">
      Показать еще 5 билетов!
    </button>
  );
}
