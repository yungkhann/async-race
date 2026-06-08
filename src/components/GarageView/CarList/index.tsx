import type { Car } from '../../../types';
import CarItem from '../CarItem';
import './styles.css';

interface CarListProps {
  cars: Car[];
}

function CarList({ cars }: CarListProps) {
  if (!cars.length) {
    return <div className="empty-state card">No cars in the garage yet. Add some!</div>;
  }

  return (
    <div className="car-list">
      {cars.map((car) => (
        <CarItem key={car.id} car={car} />
      ))}
    </div>
  );
}

export default CarList;
