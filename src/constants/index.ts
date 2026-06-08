export const API_BASE = 'http://127.0.0.1:3000';
export const GARAGE_PAGE_LIMIT = 7;
export const WINNERS_PAGE_LIMIT = 10;
export const TRACK_WIDTH_PX = 800;

export const RANDOM_CAR_BRANDS = [
  'Tesla',
  'Ford',
  'BMW',
  'Audi',
  'Toyota',
  'Honda',
  'Ferrari',
  'Lamborghini',
  'Porsche',
  'Chevrolet',
  'McLaren',
  'Mercedes-Benz',
  'Nissan',
  'Alfa Romeo',
  'Aston Martin',
];

export const RANDOM_CAR_MODELS = [
  'Model S Plaid',
  'Mustang Dark Horse',
  'M4 Competition',
  'RS e-tron GT',
  'GR Supra',
  'Civic Type R',
  '296 GTB',
  'Huracan Evo',
  '911 Carrera GTS',
  'Corvette Stingray',
  'Artura',
  'AMG GT',
  'GT-R Nismo',
  'Giulia Quadrifoglio',
  'DB12',
];

export const RANDOM_CARS_COUNT = 100;
export const MAX_NAME_LENGTH = 50;
export const DEFAULT_PAGE = 1;
export const DEFAULT_NAME = '';
export const DEFAULT_COLOR = '#000000';

export const DEFAULT_POSITION = 0;
export const TRACK_END_PERCENT = 90;
export const MS_IN_SECOND = 1000;

export const VIEW_GARAGE = 'garage';
export const VIEW_WINNERS = 'winners';

export const SORT_WINS = 'wins';
export const SORT_TIME = 'time';
export const SORT_ORDER_ASC = 'ASC';
export const SORT_ORDER_DESC = 'DESC';

export const STATUS_IDLE = 'idle';
export const STATUS_STARTING = 'starting';
export const STATUS_DRIVING = 'driving';
export const STATUS_BROKEN = 'broken';
export const STATUS_STOPPED = 'stopped';

export const HTTP_POST = 'POST';
export const HTTP_PUT = 'PUT';
export const HTTP_DELETE = 'DELETE';
export const HTTP_PATCH = 'PATCH';

export const JSON_HEADERS = { 'Content-Type': 'application/json' } as const;

export const ENGINE_STARTED = 'started';
export const ENGINE_DRIVE = 'drive';
export const ENGINE_STOPPED = 'stopped';

export const PATH_GARAGE = '/garage';
export const PATH_WINNERS = '/winners';
export const PATH_ENGINE = '/engine';

export const QUERY_PAGE = '_page';
export const QUERY_LIMIT = '_limit';
export const QUERY_SORT = '_sort';
export const QUERY_ORDER = '_order';
export const QUERY_ID = 'id';
export const QUERY_STATUS = 'status';

export const TOTAL_COUNT_HEADER = 'X-Total-Count';
