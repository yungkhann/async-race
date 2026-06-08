import { MS_IN_SECOND } from '../constants';

export const formatTime = (seconds: number) => {
  const value = Math.max(seconds, 0);
  return `${value.toFixed(2)}s`;
};

export const toSeconds = (durationMs: number) => durationMs / MS_IN_SECOND;
