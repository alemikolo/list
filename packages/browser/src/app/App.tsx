import React, { FC, useMemo, useReducer } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Dashboard from 'modules/dashboard';
import SignIn from 'modules/auth/SignIn';
import SignUp from 'modules/auth/SignUp';
import Bye from 'modules/user/Bye';
import Home from 'modules/home';
import { setAccessToken } from 'modules/auth/token';
import useFetch from 'shared/hooks/useFetch';
import Path from './routes/enums';
import Layout, { LeftBar, RightBar, TopBar } from './components/Layout';
import { PrivateRoute, PublicRoute } from './routes';
import appReducer from './context/reducer';
import { initialState, Provider } from './context/AppContext';
import { setIsAuthenticated } from 'app/context/actions';

interface AT {
  accessToken: string;
}

const App: FC = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const contextValue = useMemo(() => {
    return { dispatch, state };
  }, [state, dispatch]);

  const { data, pending, error } = useFetch<AT | null>(
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

  if (pending) {
    return <div>loading...</div>;
  }

  if (error) {
    console.error('useFetch', error);
  }

  return (
    <Provider value={contextValue}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <PublicRoute component={Home} exact path={Path.Home} />
            <PublicRoute component={SignIn} exact path={Path.SignIn} />
            <PublicRoute component={SignUp} exact path={Path.SignUp} />
            <PublicRoute component={() => <div>404</div>} noFallback />
          </Switch>
          <Switch>
            <PrivateRoute component={TopBar} noFallback />
          </Switch>
          <Switch>
            <PrivateRoute component={LeftBar} noFallback />
          </Switch>
          <Switch>
            <PrivateRoute component={Bye} exact path={Path.Organizations} />
            <PrivateRoute component={Dashboard} exact path={Path.Dashboard} />
            <PrivateRoute component={() => <div>404</div>} noFallback />
          </Switch>
          <Switch>
            <PrivateRoute component={RightBar} noFallback />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
