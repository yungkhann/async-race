export interface Car {
  id: number;
  name: string;
  color: string;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface WinnerWithCar extends Winner {
  car: Car;
}

export interface EngineResponse {
  velocity: number;
  distance: number;
}

export type SortField = 'wins' | 'time';
export type SortOrder = 'ASC' | 'DESC';
export type ViewType = 'garage' | 'winners';
export type EngineStatus = 'idle' | 'starting' | 'driving' | 'broken' | 'stopped';
