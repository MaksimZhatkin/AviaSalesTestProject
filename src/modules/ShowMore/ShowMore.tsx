import React from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../store/store';

import * as css from './styles.module.css';
import { incCounter } from './slice';

export default function ShowMore() {
  const dispatch: AppDispatch = useDispatch();

  const handleShowMore = () => {
    dispatch(incCounter(5));
  };

  return (
    <button className={css.showmore} type="button" onClick={handleShowMore}>
      Показать еще 5 билетов!
    </button>
  );
}
