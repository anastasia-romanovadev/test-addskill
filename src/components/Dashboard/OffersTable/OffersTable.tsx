import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { Checkbox } from '../../UI/Checkbox';
import { selectAll, deselectAll, setSort, toggleSelect } from '../../../features/offerSlice';
import OfferRow from '../OfferRow/OfferRow';
import './OffersTable.modules.scss'

const head = [
  { key: 'name', label: 'Название оффера' },
  { key: 'platforms', label: 'Площадки' },
  { key: 'launchDate', label: 'Дата запуска' },
  { key: 'balance', label: 'Баланс' },
  { key: 'spend', label: 'Расход' },
  { key: 'status', label: 'Статус' },
];

const OffersTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, selected, sortBy } = useAppSelector((s) => s.offers);

  const allSelected = selected.length === data.length && data.length > 0;

  return (
    <table className="offers-table">
      <thead className="offers-table__head">
        <tr>
          <th className="offers-table__cell offers-table__cell--checkbox">
            <Checkbox
              checked={allSelected}
              onChange={(v) =>
                v ? dispatch(selectAll()) : dispatch(deselectAll())
              }
            />
          </th>
          {head.map((h) => (
            <th
              key={h.key}
              className="offers-table__cell offers-table__cell--head"
              onClick={() => dispatch(setSort({ key: h.key as any }))}
            >
              <span className="offers-table__head-label">{h.label}</span>
              {sortBy.key === (h.key as any) && (
                <span className="offers-table__sort-indicator offers-table__sort-indicator--active">
                  {sortBy.dir === 'asc' ? '▲' : '▼'}
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="offers-table__body">
        {data.map((o) => (
          <OfferRow
            key={o.id}
            offer={o}
            selected={selected.includes(o.id)}
            onToggle={() => dispatch(toggleSelect(o.id))}
          />
        ))}
      </tbody>
    </table>
  );
};


export default OffersTable;
