import React, { FC, useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { setAccessToken } from 'modules/auth/token';
import useFetch from 'hooks/useFetch';
import Layout from './Layout';
import {
  AppDispatchProvider,
  appReducer,
  AppStateProvider,
  initialAppState,
  setIsAuthenticated
} from 'state';

interface AT {
  accessToken: string;
}

const App: FC = () => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  const { data, loading, error } = useFetch<AT | null>(
    '/api/auth/refresh-token'
  );

  if (data) {
    const { accessToken } = data;
    const { isAuthenticated } = state;

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
    <AppDispatchProvider value={dispatch}>
      <AppStateProvider value={state}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </AppStateProvider>
    </AppDispatchProvider>
  );
};

export default App;
