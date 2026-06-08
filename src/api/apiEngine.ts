import {
  API_BASE,
  ENGINE_DRIVE,
  ENGINE_STARTED,
  ENGINE_STOPPED,
  HTTP_PATCH,
  PATH_ENGINE,
  QUERY_ID,
  QUERY_STATUS,
} from '../constants';
import type { EngineResponse } from '../types';

const buildUrl = (status: string, id: number) => {
  const url = new URL(`${API_BASE}${PATH_ENGINE}`);
  url.searchParams.set(QUERY_ID, String(id));
  url.searchParams.set(QUERY_STATUS, status);
  return url.toString();
};

const getJson = async <T>(url: string) => {
  const response = await fetch(url, { method: HTTP_PATCH });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return (await response.json()) as T;
};

export const startEngine = (id: number) => getJson<EngineResponse>(buildUrl(ENGINE_STARTED, id));

export const stopEngine = async (id: number) => {
  await getJson<EngineResponse>(buildUrl(ENGINE_STOPPED, id));
};

export const driveEngine = async (id: number) => {
  const response = await fetch(buildUrl(ENGINE_DRIVE, id), { method: HTTP_PATCH });
  if (response.status === 500) {
    return false;
  }
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return true;
};
