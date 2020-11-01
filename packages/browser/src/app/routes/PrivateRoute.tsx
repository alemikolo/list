import React, { FC } from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps
} from 'react-router-dom';

import Path from './enums';

interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  isAuthenticated,
  render,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props: RouteComponentProps) => {
      if (!isAuthenticated) {
        return (
          <Redirect
            to={{ pathname: Path.SignIn, state: { from: props.location } }}
          />
        );
      }

      if (Component) {
        return <Component {...props} />;
      }

      if (render) {
        return render(props);
      }
    }}
  />
);

export default PrivateRoute;
