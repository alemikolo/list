import React, { FC } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Dashboard from 'modules/dashboard';
import SignIn from 'modules/auth/SignIn';
import SignUp from 'modules/auth/SignUp';
import Bye from 'modules/user/Bye';
import Home from 'modules/home';
import { setAccessToken } from 'modules/auth/token';
import useFetch from 'shared/hooks/useFetch';
import Path from './routes/enums';
import Layout from './components/Layout';
import { PrivateRoute, PublicRoute } from './routes';

interface AT {
  accessToken: string;
}
const App: FC = () => {
  const { data, pending, error } = useFetch<AT>('/api/auth/refresh-token');

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
          <PublicRoute component={SignIn} exact path={Path.SignIn} />
          <PublicRoute component={SignUp} exact path={Path.SignUp} />
          <PublicRoute component={Home} exact path={Path.Home} />
          <PrivateRoute component={Bye} exact path={Path.Organizations} />
          <PrivateRoute component={Dashboard} exact path={Path.Dashboard} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
