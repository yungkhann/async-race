import { useAppDispatch, useAppSelector } from '../../../hooks';
import { generateRandomCars } from '../../../store/garageSlice';
import { resetRace, startRace } from '../../../store/raceSlice';
import './styles.css';

function RaceControls() {
  const dispatch = useAppDispatch();
  const raceActive = useAppSelector((state) => state.race.raceActive);
  const raceCarIds = useAppSelector((state) => state.race.raceCarIds);
  const garageTotal = useAppSelector((state) => state.garage.total);
  const canReset = raceActive || raceCarIds.length > 0;

  const handleRace = () => {
    dispatch(startRace());
  };

  const handleReset = () => {
    dispatch(resetRace());
  };

  const handleGenerate = () => {
    dispatch(generateRandomCars());
  };

  return (
    <div className="race-controls card">
      <button
        className="ui-button ui-button--primary"
        type="button"
        disabled={raceActive || garageTotal === 0}
        onClick={handleRace}
      >
        Race
      </button>
      <button
        className="ui-button ui-button--secondary"
        type="button"
        disabled={!canReset}
        onClick={handleReset}
      >
        Reset
      </button>
      <button
        className="ui-button ui-button--success"
        type="button"
        disabled={raceActive}
        onClick={handleGenerate}
      >
        Generate Cars
      </button>
    </div>
  );
}

export default RaceControls;
