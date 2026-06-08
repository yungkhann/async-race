import type { ChangeEvent } from 'react';
import { DEFAULT_COLOR, DEFAULT_NAME, MAX_NAME_LENGTH } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addCar, editCar, fetchCars } from '../../../store/garageSlice';
import { selectCar, setCreateFields, setEditFields } from '../../../store/uiSlice';
import './styles.css';

const sanitizeName = (value: string) => value.trim().slice(0, MAX_NAME_LENGTH);

const isValidName = (value: string) => value.trim().length > 0;

function CreateRow() {
  const dispatch = useAppDispatch();
  const { createName, createColor, garagePage } = useAppSelector((state) => state.ui);
  const raceActive = useAppSelector((state) => state.race.raceActive);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCreateFields({ name: event.target.value, color: createColor }));
  };

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCreateFields({ name: createName, color: event.target.value }));
  };

  const handleCreate = async () => {
    const name = sanitizeName(createName);
    if (!isValidName(name)) {
      return;
    }
    await dispatch(addCar({ name, color: createColor }));
    dispatch(setCreateFields({ name: DEFAULT_NAME, color: DEFAULT_COLOR }));
    dispatch(fetchCars(garagePage));
  };

  const handleCreateClick = () => {
    handleCreate();
  };

  return (
    <div className="form-row">
      <input
        type="text"
        value={createName}
        placeholder="Car name"
        disabled={raceActive}
        onChange={handleNameChange}
      />
      <input type="color" value={createColor} disabled={raceActive} onChange={handleColorChange} />
      <button
        className="ui-button ui-button--success"
        type="button"
        disabled={raceActive}
        onClick={handleCreateClick}
      >
        Create
      </button>
    </div>
  );
}

function EditRow() {
  const dispatch = useAppDispatch();
  const { editName, editColor, selectedCarId, garagePage } = useAppSelector((state) => state.ui);
  const raceActive = useAppSelector((state) => state.race.raceActive);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEditFields({ name: event.target.value, color: editColor }));
  };

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEditFields({ name: editName, color: event.target.value }));
  };

  const handleUpdate = async () => {
    if (!selectedCarId) {
      return;
    }
    const name = sanitizeName(editName);
    if (!isValidName(name)) {
      return;
    }
    await dispatch(editCar({ id: selectedCarId, data: { name, color: editColor } }));
    dispatch(selectCar(null));
    dispatch(setEditFields({ name: DEFAULT_NAME, color: DEFAULT_COLOR }));
    dispatch(fetchCars(garagePage));
  };

  const handleUpdateClick = () => {
    handleUpdate();
  };

  return (
    <div className="form-row">
      <input
        type="text"
        value={editName}
        placeholder="Select a car to edit"
        disabled={raceActive}
        onChange={handleNameChange}
      />
      <input type="color" value={editColor} disabled={raceActive} onChange={handleColorChange} />
      <button
        className="ui-button ui-button--primary"
        type="button"
        onClick={handleUpdateClick}
        disabled={!selectedCarId || raceActive}
      >
        Update
      </button>
    </div>
  );
}

function CarForm() {
  return (
    <div className="car-form card">
      <CreateRow />
      <EditRow />
    </div>
  );
}

export default CarForm;
