import { useContext } from 'react';

import { AppDispatchContext } from 'state';
import { AppDispatch } from 'state/types';

const useAppDispatch = (): AppDispatch => useContext(AppDispatchContext);

export default useAppDispatch;
