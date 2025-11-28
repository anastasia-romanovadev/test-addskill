import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Offer } from '../types';
import { mockOffers } from '../mocks/offers';

export type OfferSortKey = 'name' | 'platforms' | 'launchDate' | 'balance' | 'spend' | 'status';
export type SortDirection = 'asc' | 'desc' | null;

export interface OffersState {
  original: Offer[]; 
  data: Offer[];   
  loading: boolean;
  error: string | null;
  selected: string[];
  sortBy: { key: OfferSortKey | null; dir: SortDirection };
}

const initialState: OffersState = {
  original: [],
  data: [],
  loading: false,
  error: null,
  selected: [],
  sortBy: { key: null, dir: null },
};

export const fetchOffers = createAsyncThunk<Offer[]>(
  'offers/fetch',
  async () => {
    await new Promise((r) => setTimeout(r, 500));
    return mockOffers;
  }
);

const compareValues = (a: Offer, b: Offer, key: OfferSortKey): number => {
  switch (key) {
    case 'launchDate': {
      const av = new Date(a.launchDate).getTime();
      const bv = new Date(b.launchDate).getTime();
      return av - bv;
    }
    case 'balance':
      return a.balance - b.balance;
    case 'spend':
      return a.spend - b.spend;
    case 'name':
      return a.name.localeCompare(b.name);
    case 'status':
      return a.status.localeCompare(b.status);
    case 'platforms': {
      const av = a.platforms.join(', ');
      const bv = b.platforms.join(', ');
      return av.localeCompare(bv);
    }
    default:
      return 0;
  }
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    toggleSelect(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.selected = state.selected.includes(id)
        ? state.selected.filter((s) => s !== id)
        : [...state.selected, id];
    },
    selectAll(state) {
      state.selected = state.data.map((d) => d.id);
    },
    deselectAll(state) {
      state.selected = [];
    },
    setSort(state, action: PayloadAction<{ key: OfferSortKey }>) {
      const key = action.payload.key;

      if (state.sortBy.key === key && state.sortBy.dir === 'desc') {
        state.sortBy = { key: null, dir: null };
        state.data = state.original.slice();
        return;
      }

      if (state.sortBy.key === key) {
        state.sortBy.dir = state.sortBy.dir === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortBy.key = key;
        state.sortBy.dir = 'asc';
      }

      const dir = state.sortBy.dir === 'asc' ? 1 : -1;

      state.data = state.original
        .slice()
        .sort((a, b) => compareValues(a, b, key) * dir);
    },
  },
  extraReducers: (b) =>
    b
      .addCase(fetchOffers.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchOffers.fulfilled, (s, a) => {
        s.loading = false;
        s.original = a.payload;
        s.data = a.payload;
      })
      .addCase(fetchOffers.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message ?? 'Unknown';
      }),
});

export const { toggleSelect, selectAll, deselectAll, setSort } = offersSlice.actions;
export default offersSlice.reducer;
