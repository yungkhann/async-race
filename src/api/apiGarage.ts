import {
  API_BASE,
  GARAGE_PAGE_LIMIT,
  HTTP_DELETE,
  HTTP_POST,
  HTTP_PUT,
  JSON_HEADERS,
  PATH_GARAGE,
  QUERY_LIMIT,
  QUERY_PAGE,
  TOTAL_COUNT_HEADER,
} from '../constants';
import type { Car } from '../types';

const buildUrl = (path: string, params?: Record<string, string | number>) => {
  const url = new URL(`${API_BASE}${path}`);
  Object.entries(params || {}).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });
  return url.toString();
};

const getList = async <T>(url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  const items = (await response.json()) as T[];
  const total = Number(response.headers.get(TOTAL_COUNT_HEADER) || 0);
  return { items, total };
};

const getJson = async <T>(url: string, init?: RequestInit) => {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return (await response.json()) as T;
};

const sendEmpty = async (url: string, init?: RequestInit) => {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
};

export const getCars = (page: number, limit = GARAGE_PAGE_LIMIT) => {
  const url = buildUrl(PATH_GARAGE, { [QUERY_PAGE]: page, [QUERY_LIMIT]: limit });
  return getList<Car>(url);
};

export const getCar = (id: number) => getJson<Car>(buildUrl(`${PATH_GARAGE}/${id}`));

export const createCar = (data: Omit<Car, 'id'>) =>
  getJson<Car>(buildUrl(PATH_GARAGE), {
    method: HTTP_POST,
    headers: JSON_HEADERS,
    body: JSON.stringify(data),
  });

export const updateCar = (id: number, data: Omit<Car, 'id'>) =>
  getJson<Car>(buildUrl(`${PATH_GARAGE}/${id}`), {
    method: HTTP_PUT,
    headers: JSON_HEADERS,
    body: JSON.stringify(data),
  });

export const deleteCar = (id: number) =>
  sendEmpty(buildUrl(`${PATH_GARAGE}/${id}`), { method: HTTP_DELETE });
