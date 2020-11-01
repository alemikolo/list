import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from 'modules/dashboard';
import SignIn from 'modules/auth/SignIn';
import SignUp from 'modules/auth/SignUp';
import Bye from 'modules/user/Bye';
import { setAccessToken } from 'modules/auth/token';
import useFetch from 'shared/hooks/useFetch';
import Path from './routes/enums';
import Layout from './components/Layout';
import PrivateRoute from './routes/PrivateRoute';

interface AT {
  accessToken: string;
}
const App: FC = () => {
  const { data, pending, error } = useFetch<AT>(
    'http://localhost:5000/api/auth/refresh-token'
  );

  if (data) {
    const { accessToken } = data;
    setAccessToken(accessToken);
  }

  if (pending) {
    return <div>loading...</div>;
  }

  if (error) {
    console.error(error);
  }

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <PrivateRoute
            component={SignIn}
            exact
            isAuthenticated
            path={Path.SignIn}
          />
          <Route component={SignUp} exact path={Path.SignUp} />
          <Route component={Bye} exact path={Path.Organizations} />
          <Route
            component={Dashboard}
            exact
            path={[Path.Dashboard, Path.Home]}
          />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
