import { useEffect } from 'react';
import { GARAGE_PAGE_LIMIT } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCars } from '../../store/garageSlice';
import { clearWinner } from '../../store/raceSlice';
import { saveRaceResult } from '../../store/winnersSlice';
import { setGaragePage } from '../../store/uiSlice';
import { toSeconds } from '../../utils/formatTime';

export const useGaragePaging = () => {
  const dispatch = useAppDispatch();
  const { cars, total } = useAppSelector((state) => state.garage);
  const garagePage = useAppSelector((state) => state.ui.garagePage);

  useEffect(() => {
    dispatch(fetchCars(garagePage));
  }, [dispatch, garagePage]);

  const canPrev = garagePage > 1;
  const canNext = garagePage * GARAGE_PAGE_LIMIT < total;

  return {
    cars,
    total,
    garagePage,
    canPrev,
    canNext,
    goPrev: () => dispatch(setGaragePage(garagePage - 1)),
    goNext: () => dispatch(setGaragePage(garagePage + 1)),
  };
};

export const useWinnerBanner = () => {
  const dispatch = useAppDispatch();
  const { winnerId, winnerName, raceActive } = useAppSelector((state) => state.race);
  const winnerData = useAppSelector((state) => {
    if (!winnerId) {
      return undefined;
    }
    return state.race.engineData[winnerId];
  });

  useEffect(() => {
    if (!winnerId || raceActive || !winnerData) {
      return;
    }
    const timeMs = winnerData.distance / winnerData.velocity;
    dispatch(saveRaceResult({ id: winnerId, time: toSeconds(timeMs) }));
  }, [dispatch, raceActive, winnerData, winnerId]);

  return {
    winnerId,
    winnerName,
    dismissWinner: () => dispatch(clearWinner()),
  };
};
