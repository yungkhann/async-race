import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { SortField, SortOrder, Winner, WinnerWithCar } from '../types';
import { getCar } from '../api/apiGarage';
import { createWinner, getWinner, getWinners, updateWinner } from '../api/apiWinners';
import { WINNERS_PAGE_LIMIT } from '../constants';

interface WinnersState {
  winners: WinnerWithCar[];
  total: number;
  loading: boolean;
}

const initialState: WinnersState = {
  winners: [],
  total: 0,
  loading: false,
};

const enrichWinners = async (items: Winner[]) => {
  const cars = await Promise.all(items.map((winner) => getCar(winner.id)));
  return items.map((winner, index) => ({ ...winner, car: cars[index] }));
};

export const fetchWinners = createAsyncThunk(
  'winners/fetchWinners',
  async (payload: { page: number; sort: SortField; order: SortOrder }) => {
    const data = await getWinners(payload.page, WINNERS_PAGE_LIMIT, payload.sort, payload.order);
    const winners = await enrichWinners(data.items);
    return { winners, total: data.total };
  },
);

export const saveRaceResult = createAsyncThunk(
  'winners/saveRaceResult',
  async (payload: { id: number; time: number }) => {
    try {
      const existing = await getWinner(payload.id);
      const bestTime = Math.min(existing.time, payload.time);
      await updateWinner(payload.id, { wins: existing.wins + 1, time: bestTime });
    } catch {
      await createWinner({ id: payload.id, wins: 1, time: payload.time });
    }
  },
);

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWinners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWinners.fulfilled, (state, action) => {
        state.loading = false;
        state.winners = action.payload.winners;
        state.total = action.payload.total;
      })
      .addCase(fetchWinners.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default winnersSlice.reducer;
