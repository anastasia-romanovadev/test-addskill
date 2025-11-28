import React from 'react';
import type { Offer } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toggleSelect } from '../../../features/offerSlice';
import { Checkbox } from '../../UI/Checkbox';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import './OfferCard.modules.scss';

const OfferCard: React.FC<{ offer: Offer }> = ({ offer }) => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(s => s.offers.selected.includes(offer.id));

  return (
    <div className="offer-card">
      <Checkbox
        checked={selected}
        onChange={() => dispatch(toggleSelect(offer.id))}
      />
      <div className="offer-card__content">
        <div className="offer-card__title">{offer.name}</div>
        <div className="offer-card__meta">
          {formatDate(offer.launchDate)} • {offer.platforms.join(', ')}
        </div>
        <div className="offer-card__metrics">
          <span className="offer-card__metric">
            Баланс: {formatCurrency(offer.balance)}
          </span>
          <span className="offer-card__metric">
            Расход: {formatCurrency(offer.spend)}
          </span>
        </div>
      </div>
      <div className="offer-card__status">
        <div
          className={`
            offer-card__status-text 
            offer-card__status-text--${offer.status}
          `}
        >
          {offer.status === 'active' ? 'Активный' : 'Остановлен'}
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
