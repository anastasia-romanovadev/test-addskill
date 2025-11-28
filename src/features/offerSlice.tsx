import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Offer } from '../types';
import { mockOffers } from '../mocks/offers';

export type SortDirection = 'asc' | 'desc' | null;

export interface OffersState {
  data: Offer[];
  loading: boolean;
  error: string | null;
  selected: string[]; 
  sortBy: { key: keyof Offer | null; dir: SortDirection };
}

const initialState: OffersState = {
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
    setSort(state, action: PayloadAction<{ key: keyof Offer }>) {
      const key = action.payload.key;
      if (state.sortBy.key === key) {
        state.sortBy.dir = state.sortBy.dir === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortBy.key = key;
        state.sortBy.dir = 'asc';
      }

      const dir = state.sortBy.dir === 'asc' ? 1 : -1;
      state.data = [...state.data].sort((a, b) => {
        const av = (a as any)[key];
        const bv = (b as any)[key];

        if (key === 'launchDate') {
          return (new Date(av).getTime() - new Date(bv).getTime()) * dir;
        }

        if (typeof av === 'number' && typeof bv === 'number') {
          return (av - bv) * dir;
        }
        return String(av).localeCompare(String(bv)) * dir;
      });
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
        s.data = a.payload;
      })
      .addCase(fetchOffers.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message ?? 'Unknown';
      }),
});

export const { toggleSelect, selectAll, deselectAll, setSort } =
  offersSlice.actions;

export default offersSlice.reducer;
