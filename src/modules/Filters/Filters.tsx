import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '../../store/store'; // Import types from the store

import { toggleAll, toggleFilter } from './slice';
import * as css from './styles.module.css';

export default function filters() {
  const dispatch = useDispatch<AppDispatch>();
  const filtersData = useSelector((state: RootState) => state.filters) ?? {};

  const handleToggleAll = () => {
    dispatch(toggleAll());
  };

  const handleToggleFilter = (name: 'noTransfers' | 'oneTransfer' | 'twoTransfers' | 'threeTransfers') => {
    dispatch(toggleFilter(name));
  };

  return (
    <aside className={css.filters}>
      <h3 className={css.filters_title}>Количество пересадок</h3>
      <ul className={css.filters_list}>
        <li>
          <label className={css.filters_item}>
            <input
              className={css.filters_checkbox}
              type="checkbox"
              checked={filtersData.all?.value ?? false}
              onChange={handleToggleAll}
            />
            <span className={css.filters_custom_chbox} />
            {filtersData.all?.title ?? ''}
          </label>
        </li>
        {Object.entries(filtersData).map(
          ([filterName, { value, title }]) =>
            filterName !== 'all' && (
              <li key={filterName}>
                <label className={css.filters_item}>
                  <input
                    className={css.filters_checkbox}
                    type="checkbox"
                    checked={value ?? false}
                    onChange={() =>
                      handleToggleFilter(
                        filterName as 'noTransfers' | 'oneTransfer' | 'twoTransfers' | 'threeTransfers'
                      )
                    }
                  />
                  <span className={css.filters_custom_chbox} />
                  {title ?? ''}
                </label>
              </li>
            )
        )}
      </ul>
    </aside>
  );
}
