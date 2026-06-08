import { configureStore } from '@reduxjs/toolkit';
import garageReducer from './garageSlice';
import raceReducer from './raceSlice';
import uiReducer from './uiSlice';
import winnersReducer from './winnersSlice';

export const store = configureStore({
  reducer: {
    garage: garageReducer,
    race: raceReducer,
    ui: uiReducer,
    winners: winnersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
