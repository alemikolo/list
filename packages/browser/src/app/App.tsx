import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from '../modules/dashboard';
import Layout from './components/Layout';
import SignIn from '../modules/auth/SignIn';
import SignUp from '../modules/auth/SignUp';
import Bye from '../modules/user/Bye';
import Path from '../routes/enums';
import { setAccessToken } from '../modules/auth/token';
import { refreshToken } from '../modules/auth/utils';

const App: FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshToken()
      .then(async x => {
        const { accessToken } = await x.json();
        setAccessToken(accessToken);
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log('no refresh token');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route component={SignIn} exact path={Path.SignIn} />
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
