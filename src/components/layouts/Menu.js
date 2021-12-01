import React from 'react';
import key from 'uniqid';
import PropTypes from 'prop-types';
import image from '../../assets/images/logo.png';
import { navigationRoutes } from '../../routes/Private';
import NavItem from '../items/NavItem';

export default function Menu({ path }) {
  return (
    <nav>
      <div className="d-none d-lg-block py-lg-5">
        <img src={image} className="logoImage" alt="App logo" />
      </div>
      <div className="row">
        {navigationRoutes()
          .map(nav => (
            <NavItem nav={nav} path={path} key={key()} />
          ))}
      </div>
    </nav>
  );
}

Menu.propTypes = {
  path: PropTypes.string.isRequired,
};
