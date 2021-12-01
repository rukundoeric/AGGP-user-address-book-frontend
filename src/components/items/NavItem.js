import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function NavItem({ nav: { icon, name, path: url }, path }) {
  return (
    <Link
      to={url}
      className={`${url === path ? 'active' : ''} nav-item col-6 col-lg-12 d-flex align-items-center justify-content-center justify-content-lg-start`}
    >
      <div
        className="d-flex d-lg-block mx-lg-4 flex-column flex-lg-row align-items-center justify-content-around"
      >
        <i className={`${icon}`} />
        <small className="mt-1 mx-lg-2">{name}</small>
      </div>
    </Link>
  );
}

NavItem.propTypes = {
  nav: PropTypes.shape({
    icon: PropTypes.string,
    name: PropTypes.string,
    path: PropTypes.string,
  }).isRequired,
  path: PropTypes.string.isRequired,
};
