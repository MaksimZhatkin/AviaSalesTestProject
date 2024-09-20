import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleAll, toggleFilter } from '../../store/filtersSlice';
import { RootState, AppDispatch } from '../../store/store'; // Import types from the store

import * as css from './Aside.module.css';

export default function Aside() {
  const dispatch: AppDispatch = useDispatch();

  const filters = useSelector((state: RootState) => state.filters.filters);

  const handleToggleAll = () => {
    dispatch(toggleAll());
  };

  const handleToggleFilter = (name: 'noTransfers' | 'oneTransfer' | 'twoTransfers' | 'threeTransfers') => {
    dispatch(toggleFilter(name));
  };

  return (
    <aside className={css.aside}>
      <h3 className={css.aside_title}>Количество пересадок</h3>
      <ul className={css.aside_list}>
        <li>
          <label className={css.aside_item}>
            <input
              className={css.aside_checkbox}
              type="checkbox"
              checked={filters.all.value}
              onChange={handleToggleAll}
            />
            <span className={css.aside_custom_chbox} />
            {filters.all.title}
          </label>
        </li>
        {Object.entries(filters).map(
          ([filterName, { value, title }]: any) =>
            filterName !== 'all' && (
              <li key={filterName}>
                <label className={css.aside_item}>
                  <input
                    className={css.aside_checkbox}
                    type="checkbox"
                    checked={value}
                    onChange={() =>
                      handleToggleFilter(
                        filterName as 'noTransfers' | 'oneTransfer' | 'twoTransfers' | 'threeTransfers'
                      )
                    }
                  />
                  <span className={css.aside_custom_chbox} />
                  {title}
                </label>
              </li>
            )
        )}
      </ul>
    </aside>
  );
}
