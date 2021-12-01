/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import QueryString from 'query-string';
import key from 'uniqid';
import { Link } from 'react-router-dom';
import image from '../../assets/images/logo.png';
import Inputfield from '../commons/input';
import { signUp } from '../../redux/actions/User';

const SignUp = ({
  signUp,
  user: {
    signupResponce,
  },
  location,
  history,
}) => {
  const progressBar = useRef();
  const fullnameInput = useRef();
  const usernameInput = useRef();
  const handleSignUp = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const fullname = data.get('name');
    const username = data.get('username');
    signUp({ fullname, username });
    progressBar.current.classList.remove('hidden');
  };
  const handleSignupSuccess = user => {
    cookie.save('ft-current-user', user);
    const redirect = location.state ? location.state.redirect
      : QueryString.parse(location.search).redirect;
    history.push(redirect || '/');
  };

  useEffect(() => {
    cookie.remove('ft-current-user');
  }, []);
  useEffect(() => {
    switch (signupResponce.status) {
      case 'success': {
        handleSignupSuccess(JSON.stringify(signupResponce.data.user));
        break;
      }
      case 'pending': {
        progressBar.current.classList.remove('hidden');
        fullnameInput.current.classList.remove('errorresponse');
        usernameInput.current.classList.remove('errorresponse');
        break;
      }
      case 'fail': {
        progressBar.current.classList.add('hidden');
        fullnameInput.current.classList.add('errorresponse');
        usernameInput.current.classList.add('errorresponse');
        break;
      }
      default:
    }
  }, [signupResponce]);
  return (
    <div className="row login-container ">
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
              <h5 className="center-align mar-top mar-bottom">Sign Up</h5>
            </div>
            <div id="formContainer" className="goRight">
              <form
                id="login-form"
                className="form"
                onSubmit={handleSignUp}
              >
                <Inputfield
                  refValue={fullnameInput}
                  label="Fullname"
                  type="text"
                  id="name"
                  placeholder="Full name"
                  name="name"
                  appendIcon={<i className="ti-text" />}
                />
                <Inputfield
                  refValue={usernameInput}
                  label="Username"
                  type="text"
                  id="username"
                  placeholder="username"
                  name="username"
                  appendIcon={<i className="icon-user" />}
                />
                {signupResponce.data.error && (
                  <div className="error-container d-flex align-items-center mt-3">
                    <span className="error" id="error">
                      {Object.keys(signupResponce.data.error).map(objKey => (
                        <div key={key()} className="d-flex flex-column">
                          <span className="text-capitalize mr-2">
                            {objKey}
                            :
                          </span>
                          <div>
                            {
                      signupResponce.data.error[objKey].map(value => (
                        <small key={key()}>
                          {value}
                          ,
                        </small>
                      ))
                    }
                          </div>
                        </div>
                      ))}
                    </span>
                  </div>
                )}
                <br />
                <small className="forget-password">
                  <span className="pr-3">
                    Already have an account?
                    <Link className="mx-2" to="/login">Login</Link>
                  </span>
                </small>
                <div className="form-control btn_container mt-4">
                  <input
                    type="submit"
                    className="btn btn-login"
                    value="Sign up"
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

SignUp.propTypes = {
  user: PropTypes.shape({
    signupResponce: PropTypes.shape({
      data: PropTypes.shape({
        user: PropTypes.shape({}),
        error: PropTypes.shape({}),
      }),
      status: PropTypes.string,
    }),
  }).isRequired,
  signUp: PropTypes.func.isRequired,
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

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps, { signUp })(SignUp);
