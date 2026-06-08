import { useEffect, useRef } from 'react';
import {
  DEFAULT_POSITION,
  STATUS_BROKEN,
  STATUS_DRIVING,
  STATUS_IDLE,
  STATUS_STARTING,
  STATUS_STOPPED,
  TRACK_END_PERCENT,
} from '../../../constants';
import type { Car, EngineResponse, EngineStatus } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setPosition, setStatus, startSingleCar, stopSingleCar } from '../../../store/raceSlice';
import { getCarImage } from '../../../utils/carImage';
import './styles.css';

interface CarTrackProps {
  car: Car;
}

const useCarAnimation = (id: number, status: EngineStatus, engineData?: EngineResponse) => {
  const dispatch = useAppDispatch();
  const statusRef = useRef(status);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    if (status !== STATUS_DRIVING || !engineData) {
      return undefined;
    }
    const duration = engineData.distance / engineData.velocity;
    const start = performance.now();
    let frameId = 0;
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      if ([STATUS_BROKEN, STATUS_STOPPED].includes(statusRef.current)) {
        return;
      }
      dispatch(setPosition({ id, position: TRACK_END_PERCENT * progress }));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        dispatch(setStatus({ id, status: STATUS_STOPPED }));
      }
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [dispatch, engineData, id, status]);
};

function CarControls({
  disableStart,
  disableStop,
  onStart,
  onStop,
}: {
  disableStart: boolean;
  disableStop: boolean;
  onStart: () => void;
  onStop: () => void;
}) {
  return (
    <div className="car-controls">
      <button
        className="ui-button ui-button--success ui-button--compact"
        type="button"
        disabled={disableStart}
        onClick={onStart}
      >
        Start
      </button>
      <button
        className="ui-button ui-button--danger ui-button--compact"
        type="button"
        disabled={disableStop}
        onClick={onStop}
      >
        Stop
      </button>
    </div>
  );
}

function CarTrack({ car }: CarTrackProps) {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.race.statuses[car.id] || STATUS_IDLE);
  const position = useAppSelector((state) => state.race.positions[car.id] ?? DEFAULT_POSITION);
  const engineData = useAppSelector((state) => state.race.engineData[car.id]);

  useCarAnimation(car.id, status, engineData);

  const handleStart = () => {
    dispatch(startSingleCar(car));
  };

  const handleStop = () => {
    dispatch(stopSingleCar(car.id));
  };

  return (
    <div className="car-track">
      <CarControls
        disableStart={[STATUS_STARTING, STATUS_DRIVING].includes(status)}
        disableStop={[STATUS_IDLE, STATUS_STOPPED].includes(status)}
        onStart={handleStart}
        onStop={handleStop}
      />
      <div className="track">
        <div className="car" style={{ left: `${position}%` }}>
          <img className="car-image" src={getCarImage(car)} alt="" aria-hidden="true" />
        </div>
        <div className="finish">Finish</div>
      </div>
    </div>
  );
}

export default CarTrack;
