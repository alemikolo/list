import { useContext } from 'react';

import { AppContext } from 'state';

const useAppState = () => useContext(AppContext);

export default useAppState;
