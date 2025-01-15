import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../shared/types/store/RootState';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;