import React from 'react';
import { Switch, Route } from 'react-router-dom';
import key from 'uniqid';
import PropTypes from 'prop-types';
import { modelRoutes } from '../../routes/Private';
import Header from '../layouts/Header';
import Menu from '../layouts/Menu';

const Home = props => {
  const {
    match: { path },
    history: { goBack },
  } = props;

  return (
    <div className="home_container d-flex flex-column flex-lg-row-reverse">
      <div className="d-flex flex-grow-1 flex-column">
        <div><Header path={path} goBack={goBack} /></div>
        <div className="fragments-content flex-grow-1">
          <Switch>
            {modelRoutes(props).map(({ path, Component }) => (
              <Route
                exact
                path={path}
                key={key()}
                component={Component}
              />
            ))}
          </Switch>
        </div>
      </div>
      <div className="menu_bar">
        <Menu path={path} />
      </div>
    </div>
  );
};

Home.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

export default Home;
