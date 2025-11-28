import React from 'react';
import { useAppSelector } from '../../../hooks';
import { formatCurrency } from '../../../utils/formatters';
import './MetricsBar.modules.scss'

const MetricsBar: React.FC = () => {
  const offers = useAppSelector((s) => s.offers.data);
  const selected = useAppSelector((s) => s.offers.selected);
  const offer = offers.find((o) => o.id === selected[0]) ?? offers[0];

  if (!offer) return null;

  const clicks = offer.clicks ?? 0;
  const conversions = offer.conversions ?? 0;
  const spend = offer.spend ?? 0;

  const cpc = clicks > 0 ? spend / clicks : 0;
  const cpa = conversions > 0 ? spend / conversions : 0;

  const formatNumber = (v: number) =>
    v.toLocaleString('ru-RU', { maximumFractionDigits: 2 });

  const items = [
    { id: 'spend', label: 'Расход', value: formatCurrency(spend) },
    { id: 'clicks', label: 'Клики', value: formatNumber(clicks) },
    { id: 'cpc', label: 'CPC', value: clicks ? formatNumber(cpc) : '—' },
    { id: 'cpa', label: 'CPA', value: conversions ? formatNumber(cpa) : '—' },
  ];

  return (
    <section className="metrics-bar">
      <div className="metrics-bar__inner">
        {items.map((item) => (
          <div className="metrics-card" key={item.id}>
            <div className="metrics-card__label">{item.label}</div>
            <div className="metrics-card__value">{item.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MetricsBar;
