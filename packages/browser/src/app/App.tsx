import React, { FC, useMemo, useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { setAccessToken } from 'modules/auth/token';
import useFetch from 'hooks/useFetch';
import Layout from './Layout';
import {
  appReducer,
  AppStateProvider,
  initialState,
  setIsAuthenticated
} from 'state';

interface AT {
  accessToken: string;
}

const App: FC = () => {
  //TODO set separate dispatch context
  const [state, dispatch] = useReducer(appReducer, initialState);

  const contextValue = useMemo(() => {
    return { dispatch, state };
  }, [state, dispatch]);

  const { data, loading, error } = useFetch<AT | null>(
    '/api/auth/refresh-token'
  );

  const { isAuthenticated } = state;

  if (data) {
    const { accessToken } = data;

    setAccessToken(accessToken);

    if (!isAuthenticated) {
      dispatch(setIsAuthenticated(true));
    }
  }

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    console.error('useFetch', error);
  }

  return (
    <AppStateProvider value={contextValue}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AppStateProvider>
  );
};

export default App;
