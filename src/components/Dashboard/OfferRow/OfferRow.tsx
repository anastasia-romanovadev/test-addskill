import React from 'react';
import type { Offer } from '../../../types';
import { Checkbox } from '../../UI/Checkbox';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import './OfferRow.modules.scss'

const platformIcons = (p: string) => {
  // заглушка — в проде вернуть svg по ключу
  return <span className="offer-row__platform-icon">{p[0].toUpperCase()}</span>;
};

const OfferRow: React.FC<{
  offer: Offer;
  selected: boolean;
  onToggle: () => void;
}> = ({ offer, selected, onToggle }) => {
  const isActive = offer.status === 'active';

  return (
    <tr className="offer-row">
      <td className="offer-row__cell offer-row__cell--checkbox">
        <Checkbox checked={selected} onChange={onToggle} />
      </td>
      <td className="offer-row__cell offer-row__cell--name">{offer.name}</td>
      <td className="offer-row__cell offer-row__cell--platforms">
        {offer.platforms.map((p) => (
          <span key={p} className="offer-row__platform">
            {platformIcons(p)}
          </span>
        ))}
      </td>
      <td className="offer-row__cell offer-row__cell--date">
        {formatDate(offer.launchDate)}
      </td>
      <td className="offer-row__cell offer-row__cell--balance">
        {formatCurrency(offer.balance)}
      </td>
      <td className="offer-row__cell offer-row__cell--spend">
        {formatCurrency(offer.spend)}
      </td>
      <td className="offer-row__cell offer-row__cell--status">
        <span
          className={`offer-row__status-badge ${
            isActive
              ? 'offer-row__status-badge--active'
              : 'offer-row__status-badge--stopped'
          }`}
        >
          {isActive ? 'Активный' : 'Остановлен'}
        </span>
      </td>
    </tr>
  );
};


export default OfferRow;
