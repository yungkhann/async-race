import { RANDOM_CAR_BRANDS, RANDOM_CAR_MODELS } from '../constants';
import type { Car } from '../types';

const pick = (items: string[]) => items[Math.floor(Math.random() * items.length)];

const randomColor = () => {
  const max = 0xffffff;
  const hex = Math.floor(Math.random() * max)
    .toString(16)
    .padStart(6, '0');
  return `#${hex}`;
};

export const createRandomCar = (): Omit<Car, 'id'> => ({
  name: `${pick(RANDOM_CAR_BRANDS)} ${pick(RANDOM_CAR_MODELS)}`,
  color: randomColor(),
});
