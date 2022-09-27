import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./navdisplay.css";

const NavDisplay = (props) => (
  <nav id="nav-bar">
    <div className="nav-container">
      <ul className="nav-link-list">
        <li className="nav-logo-li">
          <img src={props.siteLogo} alt="0" className="nav-logo"/>
        </li>
        <li className="nav-route-li">
          <Link to='/' className="nav-link nav-text-link">Home</Link>
        </li>
        <li className="nav-route-li">
          <Link to='/entries' className="nav-link nav-text-link">Manage Entries</Link>
        </li>
        { props.user ? (
          <li className="nav-button-li">
            <div className="nav-button-container">
              <div className="login-button-container">
                <button onClick={props.logOut} className="form-button nav-link login-logout-nav"> Logout</button>
              </div>
            </div>
          </li>
        ) : (
          <li className="nav-button-li">
            <div className="nav-button-container login-button-container">
              <button onClick={props.logIn} className="form-button nav-link login-logout-nav"> Login/Signup </button>
            </div>
          </li>
        )
        }
      </ul>
    </div>
  </nav>
);

NavDisplay.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func,
  logIn: PropTypes.func
}

export default NavDisplay;
