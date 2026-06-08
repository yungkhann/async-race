import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GARAGE_PAGE_LIMIT, RANDOM_CARS_COUNT } from '../constants';
import type { Car } from '../types';
import { createCar, deleteCar, getCars, updateCar } from '../api/apiGarage';
import { deleteWinner } from '../api/apiWinners';
import { createRandomCar } from '../utils/randomCar';
import { setGaragePage } from './uiSlice';
import type { RootState } from './index';

interface GarageState {
  cars: Car[];
  total: number;
  loading: boolean;
}

const initialState: GarageState = {
  cars: [],
  total: 0,
  loading: false,
};

const loadCars = async (page: number) => getCars(page, GARAGE_PAGE_LIMIT);

const safeDeleteWinner = async (id: number) => {
  try {
    await deleteWinner(id);
  } catch {
    // The server returns 404 when the deleted car has never won a race.
  }
};

export const fetchCars = createAsyncThunk('garage/fetchCars', async (page: number) =>
  loadCars(page),
);

export const addCar = createAsyncThunk('garage/addCar', async (data: Omit<Car, 'id'>) => {
  await createCar(data);
});

export const editCar = createAsyncThunk(
  'garage/editCar',
  async (payload: { id: number; data: Omit<Car, 'id'> }) => {
    await updateCar(payload.id, payload.data);
  },
);

export const removeCar = createAsyncThunk(
  'garage/removeCar',
  async (id: number, { dispatch, getState }) => {
    await deleteCar(id);
    await safeDeleteWinner(id);
    const state = getState() as RootState;
    const nextPage =
      state.garage.cars.length <= 1 && state.ui.garagePage > 1
        ? state.ui.garagePage - 1
        : state.ui.garagePage;
    dispatch(setGaragePage(nextPage));
    await dispatch(fetchCars(nextPage));
  },
);

export const generateRandomCars = createAsyncThunk(
  'garage/generateRandomCars',
  async (_, { dispatch, getState }) => {
    const tasks = Array.from({ length: RANDOM_CARS_COUNT }, () => createCar(createRandomCar()));
    await Promise.all(tasks);
    const state = getState() as RootState;
    await dispatch(fetchCars(state.ui.garagePage));
  },
);

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchCars.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addCar.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editCar.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export default garageSlice.reducer;
