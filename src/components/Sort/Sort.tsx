import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSort } from '../../store/sortSlice'; // Import the action
import { RootState, AppDispatch } from '../../store/store'; // Import types from the store

import * as css from './Sort.module.css';

export default function Sort() {
  const dispatch: AppDispatch = useDispatch();
  const sort = useSelector((state: RootState) => state.sort.sort);

  const handleActiveTab = (value: 'cheapest' | 'fastest' | 'optimal') => {
    dispatch(setSort(value));
  };

  return (
    <fieldset className={css.fieldset}>
      <legend className={css.legend}>Выберите подходящую сортировку билетов</legend>

      <div className={css.radiogroup} role="radiogroup" aria-labelledby="sort-options">
        {[
          { id: 'choice1', value: 'cheapest', label: 'Самый дешевый' },
          { id: 'choice2', value: 'fastest', label: 'Самый быстрый' },
          { id: 'choice3', value: 'optimal', label: 'Оптимальный' },
        ].map(({ id, value, label }: any) => (
          <React.Fragment key={id}>
            <input
              className={css.radio}
              id={id}
              type="radio"
              name="sort"
              value={value}
              checked={sort === value} // Ensure correct state is checked
              onChange={() => handleActiveTab(value)} // Trigger action dispatch
            />
            <label className={css.choice} htmlFor={id}>
              {label}
            </label>
          </React.Fragment>
        ))}
      </div>
    </fieldset>
  );
}
