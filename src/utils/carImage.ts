import type { Car } from '../types';

const CAR_IMAGES = [
  'sedan_vintage.png',
  'sports_race.png',
  'sports_yellow.png',
  'sedan.png',
  'sports_green.png',
  'sports_red.png',
  'sedan_blue.png',
  'sports_convertible.png',
];

export const getCarImage = (car: Pick<Car, 'id'>) => {
  const index = Math.abs(car.id) % CAR_IMAGES.length;
  return `/Cars/${CAR_IMAGES[index]}`;
};
