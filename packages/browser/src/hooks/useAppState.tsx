import { useContext } from 'react';

import { AppStateContext } from 'state';
import { AppState } from 'state/types';

const useAppState = (): AppState => useContext(AppStateContext);

export default useAppState;
