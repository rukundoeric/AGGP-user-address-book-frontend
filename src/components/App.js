import React from 'react';
// Import Icons
import '../assets/css/icons/font-awesome/css/fontawesome-all.css';
import '../assets/css/icons/simple-line-icons/css/simple-line-icons.css';
import '../assets/css/icons/weather-icons/css/weather-icons.min.css';
import '../assets/css/icons/themify-icons/themify-icons.css';
// Import styles
import '../assets/css/style.css';
import 'react-toastify/dist/ReactToastify.css';
// import 'react-circular-progressbar/dist/styles.css';

import {
  Route,
  BrowserRouter,
  Switch,
} from 'react-router-dom';
import key from 'uniqid';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import publicRoutes from '../routes/Public';
import { modelRoutes } from '../routes/Private';

const App = props => (
  <BrowserRouter>
    <ToastContainer />
    <Switch>
      {publicRoutes.map(prop => (
        <Route
          exact
          path={prop.path}
          key={key()}
          component={prop.component}
        />
      ))}
      {modelRoutes(props).map(prop => (
        <Route exact path={prop.path} key={key()} component={Home} />
      ))}
    </Switch>
  </BrowserRouter>
);

export default App;