import { useEffect } from 'react';
import { WINNERS_PAGE_LIMIT } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchWinners } from '../../store/winnersSlice';
import { setWinnersPage } from '../../store/uiSlice';
import WinnersTable from './WinnersTable';
import Pagination from './Pagination';
import './styles.css';

function WinnersView() {
  const dispatch = useAppDispatch();
  const { winners, total } = useAppSelector((state) => state.winners);
  const { winnersPage, sortField, sortOrder } = useAppSelector((state) => state.ui);

  const handlePrev = () => dispatch(setWinnersPage(winnersPage - 1));
  const handleNext = () => dispatch(setWinnersPage(winnersPage + 1));

  useEffect(() => {
    dispatch(fetchWinners({ page: winnersPage, sort: sortField, order: sortOrder }));
  }, [dispatch, sortField, sortOrder, winnersPage]);

  const canPrev = winnersPage > 1;
  const canNext = winnersPage * WINNERS_PAGE_LIMIT < total;

  return (
    <section className="winners-view">
      <div className="winners-header">
        <h2 className="section-title">Winners ({total})</h2>
        <div className="label">Page #{winnersPage}</div>
      </div>
      <WinnersTable winners={winners} />
      <Pagination canPrev={canPrev} canNext={canNext} onPrev={handlePrev} onNext={handleNext} />
    </section>
  );
}

export default WinnersView;
