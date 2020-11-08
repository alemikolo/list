import { useContext } from 'react';

import { AppContext } from 'app/context/AppContext';

const useAppContext = () => useContext(AppContext);

export default useAppContext;
