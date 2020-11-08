import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Path } from 'router';

const LeftBar: FC = () => {
  return (
    <nav className="layout__navigation">
      <NavLink to={Path.Dashboard}>Home</NavLink>
      <NavLink to={Path.SignIn}>Sign in</NavLink>
      <NavLink to={Path.SignUp}>Sign up</NavLink>
      <NavLink to={Path.Organizations}>Bye</NavLink>
    </nav>
  );
};

export default LeftBar;
