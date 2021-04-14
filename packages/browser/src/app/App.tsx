import React, { FC, useEffect, useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { setAccessToken } from 'modules/auth/token';
import useFetch from 'hooks/useFetch';
import Layout from './Layout';
import {
  AppDispatchProvider,
  appReducer,
  AppStateProvider,
  initialAppState,
  setIsAuthenticated,
  setLocale
} from 'state';
import messages from 'translations';

interface AT {
  accessToken: string;
}

const locales = new Set(['en', 'pl']);

const App: FC = () => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  useEffect(() => {
    const locale = navigator.language;

    if (locale && locales.has(locale)) {
      // TODO check user preferences ccokies or localstorage or token
      dispatch(setLocale(locale));
    }
  }, []);

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

  const { locale } = state;

  return (
    <AppDispatchProvider value={dispatch}>
      <AppStateProvider value={state}>
        <IntlProvider locale={locale} messages={messages[locale]}>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </IntlProvider>
      </AppStateProvider>
    </AppDispatchProvider>
  );
};

export default App;
