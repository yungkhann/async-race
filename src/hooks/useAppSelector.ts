import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const useAppSelector = <T>(selector: (state: RootState) => T) => useSelector(selector);

export default useAppSelector;
