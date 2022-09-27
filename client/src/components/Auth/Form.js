import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import PropTypes from "prop-types";
import "./form.css";

const Form = (props) => (
  <div className="auth-form-container">
    <h1 className="auth-form-header"> {props.isSignedUp ? "Sign In" : "Sign Up"} </h1>
    {
      props.successMessage && <h3 className="form-success-message">{props.successMessage}</h3>
    }
    <form onSubmit={props.handleSubmit} className="auth-form">
      {props.isSignedUp ?
        <div className="form-container-sign-in">
          <div className="form-field-container">
            <div className="auth-form-field">
              <input type="email"
                required
                name="loginEmail"
                onChange={props.handleChange}
                placeholder="E-mail"
                id="loginEmail"
                className="auth-form-input"
              />
            </div>
            <div className="auth-form-field">
              <input type="password"
                required
                name="loginPassword"
                onChange={props.handleChange}
                placeholder="Password"
                id="loginPassword"
                className="auth-form-input"
              />
              </div>
            </div>
            {
              props.errors.response.length > 0 && <h3 className="form-error-message">{props.errors.response}</h3>
            }
            <div className="form-button-container">
              <button type="submit" id="loginButton" className="auth-form-button"> Log In </button>
            </div>
            <div className="form-button-container">
              <button type="button" onClick={props.switchFormType} className="auth-form-button"> Create New Account </button>
            </div>
            <div id="google-login-container">
              <GoogleLogin
              onSuccess={props.googleSuccess}
              onError={props.googleFailure}
              id="google-login-button"/>
            </div>
        </div>
        :
        <div className="form-container-sign-up">
          <div className="auth-form-field">
            <input type="email"
              required
              name="signupEmail"
              onChange={props.handleChange}
              placeholder="New e-mail"
              className="auth-form-input"
            />
          </div>
          <div className="auth-form-field">
            <input type="password"
              required
              name="signupPassword"
              onChange={props.handleChange}
              placeholder="New password"
              id="signupPassword"
              ref={props.signupPasswordRef}
              className="auth-form-input"
            />
          </div>
          <div className="auth-form-field">
            <input type="password"
              required
              name="confirmPassword"
              onChange={props.handleChange}
              placeholder="Confirm password"
              id="signupConfirmPassword"
              className="auth-form-input"
            />
          </div>
          {
            (props.errors.response.length > 0 && <h3 className="form-error-message">{props.errors.response}</h3>) ||
            (
              (props.errors.confirmPassword && <h3 className="form-error-message">{props.errors.confirmPassword}</h3>) ||
              (props.errors.signupPassword && <h3 className="form-error-message">{props.errors.signupPassword}</h3>) ||
              (props.errors.signupEmail && <h3 className="form-error-message">{props.errors.signupEmail}</h3>)
            )
          }
          <div className="form-button-container">
            <button type="submit" name="submitQuery" className="auth-form-button"> Submit </button>
          </div>
          <div className="form-button-container">
            <hr className="horizontal-rounded-divider"/>
            <p className="existing-account-text">Already have an account?  </p>
            <button type="button" onClick={props.switchFormType} className="auth-form-button"> Sign in </button>
          </div>
        </div>
      }
    </form>
  </div>
);

Form.propTypes = {
  isSignedUp: PropTypes.bool,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
  successMessage: PropTypes.string,
  googleSuccess: PropTypes.func,
  googleFailure: PropTypes.func,
  switchFormType: PropTypes.func,
  signupPasswordRef: PropTypes.object
};

export default Form;
