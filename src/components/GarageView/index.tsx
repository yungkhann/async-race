import { useGaragePaging, useWinnerBanner } from './hooks';
import CarForm from './CarForm';
import RaceControls from './RaceControls';
import CarList from './CarList';
import WinnerBanner from './WinnerBanner';
import { useAppSelector } from '../../hooks';
import './styles.css';

function GarageView() {
  const { cars, total, garagePage, canPrev, canNext, goPrev, goNext } = useGaragePaging();
  const { winnerId, winnerName, dismissWinner } = useWinnerBanner();
  const raceActive = useAppSelector((state) => state.race.raceActive);

  return (
    <section className="garage-view">
      <CarForm />
      <RaceControls />
      <div className="garage-header">
        <h2 className="section-title">Garage ({total})</h2>
        <div className="label">Page #{garagePage}</div>
      </div>
      <CarList cars={cars} />
      <div className="pagination">
        <button
          className="ui-button ui-button--secondary"
          type="button"
          disabled={!canPrev || raceActive}
          onClick={goPrev}
        >
          Prev
        </button>
        <button
          className="ui-button ui-button--secondary"
          type="button"
          disabled={!canNext || raceActive}
          onClick={goNext}
        >
          Next
        </button>
      </div>
      {winnerId && <WinnerBanner name={winnerName} onClose={dismissWinner} />}
    </section>
  );
}

export default GarageView;
