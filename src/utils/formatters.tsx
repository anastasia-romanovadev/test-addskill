import { format } from 'date-fns';

export const formatCurrency = (cents: number, currency = 'USD') => {
  const amount = cents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (iso: string) => {
  try {
    return format(new Date(iso), 'dd.MM.yyyy');
  } catch {
    return iso;
  }
};

export const formatNumber = (n: number) =>
  new Intl.NumberFormat('ru-RU').format(n);
