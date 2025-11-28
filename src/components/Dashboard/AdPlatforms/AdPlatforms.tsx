import React from 'react';
import { useAppSelector } from '../../../hooks';
import { formatCurrency} from '../../../utils/formatters';
import './AdPlatforms.modules.scss'


const AdPlatforms: React.FC = () => {
  const offers = useAppSelector(s => s.offers.data);
  const selected = useAppSelector(s => s.offers.selected);
  const offer = offers.find(o => o.id === selected[0]) ?? offers[0];

  const rows = offer?.adPlatforms ?? [];

  return (
    <div className="ad-platforms-card">
      <div className="ap-title">Рекламные площадки</div>

      {rows.length === 0 ? (
        <div className="ap-empty">Нет данных по площадкам</div>
      ) : (
        <table className="ap-table">
          <thead>
            <tr>
              <th>Площадка</th>
              <th>Баланс</th>
              <th>Аккаунтов</th>
              <th>AVG CPC</th>
              <th>AVG CPA</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{r.balance ? formatCurrency(r.balance) : '—'}</td>
                <td>{r.accounts ?? 0}</td>
                <td>{r.avgCpc ? formatCurrency(r.avgCpc) : '—'}</td>
                <td>{r.avgCpa ? formatCurrency(r.avgCpa) : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdPlatforms;
