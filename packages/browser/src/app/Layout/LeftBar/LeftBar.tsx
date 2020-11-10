import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Path } from 'router';
import './LeftBar.scss';

const LeftBar: FC = () => {
  return (
    <nav className="left-bar">
      <NavLink to={Path.Dashboard}>Home</NavLink>
      <NavLink to={Path.Organizations}>Bye</NavLink>
    </nav>
  );
};

export default LeftBar;
