import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from '../modules/dashboard';
import Layout from './components/Layout';
import SignIn from '../modules/user/SignIn';
import SignUp from '../modules/user/SignUp';
import Path from '../routes/enums';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route component={SignIn} exact path={Path.SignIn} />
          <Route component={SignUp} exact path={Path.SignUp} />
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
