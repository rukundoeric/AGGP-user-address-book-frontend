/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import QueryString from 'query-string';
import image from '../../assets/images/logo.png';
import Inputfield from '../commons/input';
import { logIn } from '../../redux/actions/Auth';

const Login = ({
  logIn, auth, location, history,
}) => {
  const progressBar = useRef();
  const usernameInput = useRef();
  const dispatch = useDispatch();

  const handleLogin = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get('username');
    logIn({ username });
  };
  const handleLoginSuccess = user => {
    cookie.save('ft-current-user', user);
    dispatch({ type: 'AUTH_RESET' });
    const redirect = location.state ? location.state.redirect
      : QueryString.parse(location.search).redirect;
    history.push(redirect || '/');
  };

  useEffect(() => {
    switch (auth.status) {
      case 'success': {
        handleLoginSuccess(JSON.stringify(auth.data.user));
        break;
      }
      case 'pending': {
        progressBar.current.classList.remove('hidden');
        usernameInput.current.classList.remove('errorresponse');
        break;
      }
      case 'fail': {
        progressBar.current.classList.add('hidden');
        usernameInput.current.classList.add('errorresponse');
        break;
      }
      default:
    }
  }, [auth]);

  return (
    <div className="row login-container">
      <div className="container-fluid">
        <div className="valign-wrapper screenHeight d-flex align-items-center justify-content-center">
          <div className="col-md-8 card   setMaxWidth  inner-container ">
            <div ref={progressBar} className="hidden">
              <div className="progress">
                <div className="indeterminate"> </div>
              </div>
            </div>
            <div className="clearfix mar-all pad-all"> </div>
            <img src={image} className="logoImage" alt="App logo" />
            <div className="mar-all pad-all d-flex align-items-center justify-content-center">
              <h5 className="center-align mar-top mar-bottom">Sign In</h5>
            </div>
            <div id="formContainer" className="goRight">
              <form
                id="login-form"
                className="form"
                onSubmit={handleLogin}
              >
                <Inputfield
                  refValue={usernameInput}
                  label="Username"
                  type="text"
                  id="username"
                  placeholder="Username"
                  name="username"
                  appendIcon={<i className="icon-user" />}
                />
                {auth.data.error ? (
                  <div className="error-container d-flex align-items-center mt-3">
                    <span className="error" id="error">
                      {auth.data.error.message}
                    </span>
                  </div>
                ) : (
                  <div />
                )}
                <br />
                <small className="forget-password">
                  <span className="pr-3">
                    Don&apos;t have an account?
                    <Link className="mx-2" to="/sign-up">Signup</Link>
                  </span>
                </small>
                <div className="form-control btn_container mt-4">
                  <input
                    type="submit"
                    className="btn btn-login"
                    value="Login"
                  />
                </div>
              </form>
            </div>
            <div className="clearfix mar-all pad-all"> </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  auth: PropTypes.shape({
    data: PropTypes.shape({
      user: PropTypes.shape({}),
      error: PropTypes.shape({
        message: PropTypes.string,
      }),
    }),
    status: PropTypes.string.isRequired,
  }).isRequired,
  logIn: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      redirect: PropTypes.string,
    }),
    search: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps, { logIn })(Login);
