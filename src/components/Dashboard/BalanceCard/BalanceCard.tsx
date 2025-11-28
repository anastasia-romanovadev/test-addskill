import React from 'react';
import { useAppSelector } from '../../../hooks';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import './BalanceCard.modules.scss'


const BalanceCard: React.FC = () => {
  const offers = useAppSelector(s => s.offers.data);
  const selected = useAppSelector(s => s.offers.selected);
  const offer = offers.find(o => o.id === selected[0]) ?? offers[0];

  if (!offer) return <div className="balance-card">Нет данных</div>;

  return (
    <div className="balance-card">
      <div className="balance-title">Баланс</div>
      <div className="balance-value">{formatCurrency(offer.balance)}</div>

      <div className="balance-meta">
        <div><span className="label">Дата запуска:</span> {formatDate(offer.launchDate)}</div>
        <div><span className="label">Направление:</span> {offer.direction ?? '—'}</div>
        <div><span className="label">Объект:</span> {offer.object ?? '—'}</div>
        <div><span className="label">Цель:</span> {offer.goal ?? '—'}</div>
        <div><span className="label">Трекер:</span> {offer.tracker ?? '—'}</div>
        <div><span className="label">Гео:</span> {offer.geo ?? '—'}</div>
      </div>
    </div>
  );
};

export default BalanceCard;
