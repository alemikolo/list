import React, { FC } from 'react';
import { Switch } from 'react-router-dom';

import Dashboard from 'modules/dashboard';
import { SignIn, SignUp } from 'modules/auth';
import { Bye } from 'modules/user';
import Home from 'modules/home';
import { Path, PrivateRoute, PublicRoute } from 'router';
// import Footer from './Footer';
import Header from './Header';
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import TopBar from './TopBar';

import './Layout.scss';

export const Layout: FC = () => (
  <div className="layout">
    <Switch>
      <PublicRoute component={Header} noFallback />
    </Switch>
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
  </div>
);

export default Layout;
