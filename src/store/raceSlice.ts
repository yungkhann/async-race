import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  DEFAULT_POSITION,
  STATUS_BROKEN,
  STATUS_DRIVING,
  STATUS_STARTING,
  STATUS_STOPPED,
} from '../constants/index';
import type { Car, EngineResponse, EngineStatus } from '../types';
import { driveEngine, startEngine, stopEngine } from '../api/apiEngine';
import type { RootState } from './index';

interface RaceState {
  statuses: Record<number, EngineStatus>;
  positions: Record<number, number>;
  engineData: Record<number, EngineResponse | undefined>;
  raceCarIds: number[];
  raceRunId: number;
  winnerId: number | null;
  winnerName: string;
  raceActive: boolean;
}

const initialState: RaceState = {
  statuses: {},
  positions: {},
  engineData: {},
  raceCarIds: [],
  raceRunId: 0,
  winnerId: null,
  winnerName: '',
  raceActive: false,
};

const selectWinner = (results: Array<{ car: Car; data: EngineResponse }>) => {
  return results.reduce((best, current) => {
    const bestTime = best.data.distance / best.data.velocity;
    const currentTime = current.data.distance / current.data.velocity;
    return currentTime < bestTime ? current : best;
  });
};

const startCar = async (car: Car, dispatch: (action: unknown) => void) => {
  dispatch(setStatus({ id: car.id, status: STATUS_STARTING }));
  const data = await startEngine(car.id);
  dispatch(setEngineData({ id: car.id, data }));
  dispatch(setStatus({ id: car.id, status: STATUS_DRIVING }));
  return { car, data };
};

const driveCar = async (car: Car) => {
  const ok = await driveEngine(car.id);
  return { car, ok };
};

export const startSingleCar = createAsyncThunk(
  'race/startSingleCar',
  async (car: Car, { dispatch }) => {
    dispatch(setPosition({ id: car.id, position: DEFAULT_POSITION }));
    dispatch(setStatus({ id: car.id, status: STATUS_STARTING }));
    const data = await startEngine(car.id);
    dispatch(setEngineData({ id: car.id, data }));
    dispatch(setStatus({ id: car.id, status: STATUS_DRIVING }));
    driveEngine(car.id).then((ok) => {
      if (!ok) {
        dispatch(setStatus({ id: car.id, status: STATUS_BROKEN }));
      }
    });
    return { id: car.id, data };
  },
);

export const stopSingleCar = createAsyncThunk('race/stopSingleCar', async (id: number) => {
  await stopEngine(id);
  return id;
});

export const startRace = createAsyncThunk(
  'race/startRace',
  async (_unused, { dispatch, getState }) => {
    dispatch(nextRaceRun());
    dispatch(setRaceActive(true));
    dispatch(clearWinner());
    dispatch(resetPositions());

    const stateBeforeRace = getState() as RootState;
    const runId = stateBeforeRace.race.raceRunId;
    const { cars } = stateBeforeRace.garage;

    if ((getState() as RootState).race.raceRunId !== runId) {
      return;
    }

    dispatch(setRaceCarIds(cars.map((car) => car.id)));

    if (!cars.length) {
      dispatch(setRaceActive(false));
      return;
    }

    const started = await Promise.all(cars.map((car) => startCar(car, dispatch)));

    if ((getState() as RootState).race.raceRunId !== runId) {
      return;
    }

    const driveResults = await Promise.all(started.map((item) => driveCar(item.car)));

    if ((getState() as RootState).race.raceRunId !== runId) {
      return;
    }

    const winners = started.filter((_, index) => driveResults[index].ok);

    if (winners.length) {
      const winner = selectWinner(winners);
      dispatch(setWinner({ id: winner.car.id, name: winner.car.name }));
    }

    driveResults.forEach((result) => {
      if (!result.ok) {
        dispatch(setStatus({ id: result.car.id, status: STATUS_BROKEN }));
      }
    });

    if ((getState() as RootState).race.raceRunId === runId) {
      dispatch(setRaceActive(false));
    }
  },
);

export const resetRace = createAsyncThunk('race/resetRace', async (_, { dispatch, getState }) => {
  const state = getState() as RootState;
  const ids = state.race.raceCarIds;

  dispatch(nextRaceRun());

  await Promise.allSettled(ids.map((id) => stopEngine(id)));
  ids.forEach((id) => dispatch(setStatus({ id, status: STATUS_STOPPED })));
  dispatch(clearWinner());
  dispatch(resetPositions());
  dispatch(clearRaceCarIds());
  dispatch(setRaceActive(false));
});

const raceSlice = createSlice({
  name: 'race',
  initialState,
  reducers: {
    nextRaceRun: (state) => {
      state.raceRunId += 1;
    },
    setStatus: (state, action) => {
      state.statuses[action.payload.id] = action.payload.status as EngineStatus;
    },
    setPosition: (state, action) => {
      state.positions[action.payload.id] = action.payload.position as number;
    },
    resetPositions: (state) => {
      state.positions = {};
    },
    setEngineData: (state, action) => {
      state.engineData[action.payload.id] = action.payload.data as EngineResponse;
    },
    setRaceCarIds: (state, action) => {
      state.raceCarIds = action.payload as number[];
    },
    clearRaceCarIds: (state) => {
      state.raceCarIds = [];
    },
    setWinner: (state, action) => {
      state.winnerId = action.payload.id as number;
      state.winnerName = action.payload.name as string;
    },
    clearWinner: (state) => {
      state.winnerId = null;
      state.winnerName = '';
    },
    setRaceActive: (state, action) => {
      state.raceActive = action.payload as boolean;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(stopSingleCar.fulfilled, (state, action) => {
      state.statuses[action.payload] = STATUS_STOPPED;
      state.positions[action.payload] = DEFAULT_POSITION;
    });
  },
});

export const {
  nextRaceRun,
  setStatus,
  setPosition,
  resetPositions,
  setEngineData,
  setRaceCarIds,
  clearRaceCarIds,
  setWinner,
  clearWinner,
  setRaceActive,
} = raceSlice.actions;

export default raceSlice.reducer;
