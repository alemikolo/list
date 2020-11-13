import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Path } from 'router';
import './LeftBar.scss';

const LeftBar: FC = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleBar = () => {
    setExpanded(!expanded);
  };

  return (
    <nav className={`left-bar ${expanded ? 'left-bar--expanded' : ''}`}>
      <NavLink to={Path.Dashboard}>Home</NavLink>
      <NavLink to={Path.Organizations}>Bye</NavLink>
      <button onClick={toggleBar}>{'>>'}</button>
    </nav>
  );
};

export default LeftBar;
