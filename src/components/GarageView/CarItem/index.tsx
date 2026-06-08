import type { Car } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { removeCar } from '../../../store/garageSlice';
import { selectCar, setEditFields } from '../../../store/uiSlice';
import CarTrack from '../CarTrack';
import './styles.css';

interface CarItemProps {
  car: Car;
}

function CarItem({ car }: CarItemProps) {
  const dispatch = useAppDispatch();
  const raceActive = useAppSelector((state) => state.race.raceActive);
  const selectedId = useAppSelector((state) => state.ui.selectedCarId);

  const handleSelect = () => {
    dispatch(selectCar(car.id));
    dispatch(setEditFields({ name: car.name, color: car.color }));
  };

  const handleDelete = () => {
    dispatch(removeCar(car.id));
  };

  return (
    <div className={selectedId === car.id ? 'car-item selected' : 'car-item'}>
      <div className="car-actions">
        <button
          className="ui-button ui-button--secondary ui-button--compact"
          type="button"
          disabled={raceActive}
          onClick={handleSelect}
        >
          Select
        </button>
        <button
          className="ui-button ui-button--danger ui-button--compact"
          type="button"
          disabled={raceActive}
          onClick={handleDelete}
        >
          Delete
        </button>
        <span className="car-name">{car.name}</span>
      </div>
      <CarTrack car={car} />
    </div>
  );
}

export default CarItem;
