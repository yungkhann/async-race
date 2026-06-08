import { VIEW_GARAGE, VIEW_WINNERS } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setView } from '../../store/uiSlice';
import './styles.css';

function Nav() {
  const dispatch = useAppDispatch();
  const view = useAppSelector((state) => state.ui.view);
  const raceActive = useAppSelector((state) => state.race.raceActive);

  const handleGarage = () => dispatch(setView(VIEW_GARAGE));
  const handleWinners = () => dispatch(setView(VIEW_WINNERS));

  return (
    <nav className="nav">
      <button
        className={view === VIEW_GARAGE ? 'ui-button nav-btn active' : 'ui-button nav-btn'}
        disabled={raceActive}
        onClick={handleGarage}
        type="button"
      >
        Garage
      </button>
      <button
        className={view === VIEW_WINNERS ? 'ui-button nav-btn active' : 'ui-button nav-btn'}
        disabled={raceActive}
        onClick={handleWinners}
        type="button"
      >
        Winners
      </button>
    </nav>
  );
}

export default Nav;
