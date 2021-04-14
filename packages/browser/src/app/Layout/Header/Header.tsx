import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Path } from 'router';
import './Header.scss';

const Header: FC = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <h1>Handle It</h1>
      </div>
      <nav className="header__navigation">
        <ul className="header__navigation-links">
          <li className="header__navigation-link">
            <NavLink activeClassName="active" to={Path.Home}>
              <FormattedMessage id="home" />
            </NavLink>
          </li>
          <li className="header__navigation-link">
            <NavLink activeClassName="active" to={Path.SignIn}>
              <FormattedMessage id="sign-in" />
            </NavLink>
          </li>
          <li className="header__navigation-link">
            <NavLink activeClassName="active" to={Path.SignUp}>
              <FormattedMessage id="sign-up" />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
