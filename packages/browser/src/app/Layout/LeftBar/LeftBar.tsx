import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Path } from 'router';
import './LeftBar.scss';

const LeftBar: FC = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleBar = () => {
    setExpanded(!expanded);
  };

  return (
    <nav className={`left-bar ${expanded ? 'left-bar--expanded' : ''}`}>
      <NavLink to={Path.Dashboard}>
        <FormattedMessage id="home" />
      </NavLink>
      <NavLink to={Path.Organizations}>
        <FormattedMessage id="organizations" />
      </NavLink>
      <button onClick={toggleBar}>{'>>'}</button>
    </nav>
  );
};

export default LeftBar;
