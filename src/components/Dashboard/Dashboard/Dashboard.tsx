import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchOffers } from '../../../features/offerSlice';
import OffersTable from '../OffersTable/OffersTable';
import OfferCard from '../OfferCard/OfferCard';
import FiltersBar from '../FiltersBar/FiltersBar';
import BalanceCard from '../BalanceCard/BalanceCard';
import AdPlatforms from '../AdPlatforms/AdPlatforms';
import MetricsBar from '../MetricsBar/MetricsBar';
import './Dashboard.modules.scss'

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, data } = useAppSelector((s) => s.offers);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  if (loading) return <div className="dashboard-status">Loading...</div>;
  if (error) return <div className="dashboard-status">Error: {error}</div>;

  return (
    <main className="dashboard">
      <h1 className="dashboard__title">Офферы</h1>

      <FiltersBar />
      <MetricsBar/>

      <div className="dashboard__table desktop-only">
        <OffersTable />
      </div>

      <div className="dashboard__cards mobile-only">
        {data.map((o) => (
          <OfferCard key={o.id} offer={o} />
        ))}
      </div>

      <div className="dashboard__bottom-grid">
        <BalanceCard />
        <AdPlatforms />
      </div>
    </main>
  );
};


export default Dashboard;
