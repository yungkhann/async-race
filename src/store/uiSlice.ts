import { createSlice } from '@reduxjs/toolkit';
import {
  DEFAULT_COLOR,
  DEFAULT_NAME,
  DEFAULT_PAGE,
  SORT_ORDER_ASC,
  SORT_WINS,
  VIEW_GARAGE,
} from '../constants/index';
import type { SortField, SortOrder, ViewType } from '../types';

export interface UiState {
  view: ViewType;
  garagePage: number;
  winnersPage: number;
  sortField: SortField;
  sortOrder: SortOrder;
  selectedCarId: number | null;
  editName: string;
  editColor: string;
  createName: string;
  createColor: string;
}

const initialState: UiState = {
  view: VIEW_GARAGE,
  garagePage: DEFAULT_PAGE,
  winnersPage: DEFAULT_PAGE,
  sortField: SORT_WINS,
  sortOrder: SORT_ORDER_ASC,
  selectedCarId: null,
  editName: DEFAULT_NAME,
  editColor: DEFAULT_COLOR,
  createName: DEFAULT_NAME,
  createColor: DEFAULT_COLOR,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setView: (state, action) => {
      state.view = action.payload as ViewType;
    },
    setGaragePage: (state, action) => {
      state.garagePage = action.payload as number;
    },
    setWinnersPage: (state, action) => {
      state.winnersPage = action.payload as number;
    },
    setSortField: (state, action) => {
      state.sortField = action.payload as SortField;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload as SortOrder;
    },
    selectCar: (state, action) => {
      state.selectedCarId = action.payload as number | null;
    },
    setEditFields: (state, action) => {
      state.editName = action.payload.name as string;
      state.editColor = action.payload.color as string;
    },
    setCreateFields: (state, action) => {
      state.createName = action.payload.name as string;
      state.createColor = action.payload.color as string;
    },
  },
});

export const {
  setView,
  setGaragePage,
  setWinnersPage,
  setSortField,
  setSortOrder,
  selectCar,
  setEditFields,
  setCreateFields,
} = uiSlice.actions;

export default uiSlice.reducer;
