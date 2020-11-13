import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

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
              Home
            </NavLink>
          </li>
          <li className="header__navigation-link">
            <NavLink activeClassName="active" to={Path.SignIn}>
              Sign in
            </NavLink>
          </li>
          <li className="header__navigation-link">
            <NavLink activeClassName="active" to={Path.SignUp}>
              Sign up
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
