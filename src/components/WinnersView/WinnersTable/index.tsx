import {
  SORT_ORDER_ASC,
  SORT_ORDER_DESC,
  SORT_TIME,
  SORT_WINS,
  WINNERS_PAGE_LIMIT,
} from '../../../constants';
import type { WinnerWithCar } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setSortField, setSortOrder } from '../../../store/uiSlice';
import { getCarImage } from '../../../utils/carImage';
import { formatTime } from '../../../utils/formatTime';
import './styles.css';

interface WinnersTableProps {
  winners: WinnerWithCar[];
}

const useSortControl = () => {
  const dispatch = useAppDispatch();
  const { sortField, sortOrder, winnersPage } = useAppSelector((state) => state.ui);
  const baseIndex = (winnersPage - 1) * WINNERS_PAGE_LIMIT;

  const toggleSort = (field: 'wins' | 'time') => {
    if (field === sortField) {
      const next = sortOrder === SORT_ORDER_ASC ? SORT_ORDER_DESC : SORT_ORDER_ASC;
      dispatch(setSortOrder(next));
      return;
    }
    dispatch(setSortField(field));
    dispatch(setSortOrder(SORT_ORDER_ASC));
  };

  const indicator = (field: 'wins' | 'time') => {
    if (field !== sortField) {
      return '';
    }
    return sortOrder === SORT_ORDER_ASC ? '^' : 'v';
  };

  return { baseIndex, toggleSort, indicator };
};

function HeaderRow({
  toggleSort,
  indicator,
}: {
  toggleSort: (field: 'wins' | 'time') => void;
  indicator: (field: 'wins' | 'time') => string;
}) {
  const handleWins = () => toggleSort(SORT_WINS);
  const handleTime = () => toggleSort(SORT_TIME);

  return (
    <div className="row header">
      <div>No.</div>
      <div>Car</div>
      <div>Name</div>
      <button type="button" className="ui-button ui-button--ghost sort" onClick={handleWins}>
        Wins {indicator(SORT_WINS)}
      </button>
      <button type="button" className="ui-button ui-button--ghost sort" onClick={handleTime}>
        Best Time {indicator(SORT_TIME)}
      </button>
    </div>
  );
}

function WinnerRow({ winner, index }: { winner: WinnerWithCar; index: number }) {
  return (
    <div className="row">
      <div>{index}</div>
      <div>
        <img className="winner-car-image" src={getCarImage(winner.car)} alt="" aria-hidden="true" />
      </div>
      <div>{winner.car.name}</div>
      <div>{winner.wins}</div>
      <div>{formatTime(winner.time)}</div>
    </div>
  );
}

function WinnersTable({ winners }: WinnersTableProps) {
  const { baseIndex, toggleSort, indicator } = useSortControl();

  if (!winners.length) {
    return <div className="empty-state card">No winners yet.</div>;
  }

  return (
    <div className="table card">
      <HeaderRow toggleSort={toggleSort} indicator={indicator} />
      {winners.map((winner, index) => (
        <WinnerRow key={winner.id} winner={winner} index={baseIndex + index + 1} />
      ))}
    </div>
  );
}

export default WinnersTable;
