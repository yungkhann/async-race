import {
  API_BASE,
  HTTP_DELETE,
  HTTP_POST,
  HTTP_PUT,
  JSON_HEADERS,
  PATH_WINNERS,
  QUERY_LIMIT,
  QUERY_ORDER,
  QUERY_PAGE,
  QUERY_SORT,
  TOTAL_COUNT_HEADER,
  WINNERS_PAGE_LIMIT,
} from '../constants';
import type { SortField, SortOrder, Winner } from '../types';

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

export const getWinners = (
  page: number,
  limit = WINNERS_PAGE_LIMIT,
  sort?: SortField,
  order?: SortOrder,
) => {
  const url = buildUrl(PATH_WINNERS, {
    [QUERY_PAGE]: page,
    [QUERY_LIMIT]: limit,
    [QUERY_SORT]: sort,
    [QUERY_ORDER]: order,
  });
  return getList<Winner>(url);
};

export const getWinner = (id: number) => getJson<Winner>(buildUrl(`${PATH_WINNERS}/${id}`));

export const createWinner = (data: Winner) =>
  getJson<Winner>(buildUrl(PATH_WINNERS), {
    method: HTTP_POST,
    headers: JSON_HEADERS,
    body: JSON.stringify(data),
  });

export const updateWinner = (id: number, data: Omit<Winner, 'id'>) =>
  getJson<Winner>(buildUrl(`${PATH_WINNERS}/${id}`), {
    method: HTTP_PUT,
    headers: JSON_HEADERS,
    body: JSON.stringify(data),
  });

export const deleteWinner = (id: number) =>
  sendEmpty(buildUrl(`${PATH_WINNERS}/${id}`), { method: HTTP_DELETE });
