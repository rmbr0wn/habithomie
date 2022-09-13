import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import NavDisplay from "./NavDisplay.js";
// import store from "../../reducers/store.js";

export default function Navbar () {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("account")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function logOut () {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  }

  function logIn () {
    navigate("/auth");
  }

  // Populate local storage if the user has been authenticated
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      // Expired token, so sign them out
      if (decodedToken.exp * 1000 < new Date().getTime()) {
         logOut();
      }
    }
    setUser(JSON.parse(localStorage.getItem("account")));
  }, [user?.token, location]);

  return (
    <div id="nav-bar-wrapper">
      <NavDisplay
        user={user}
        logOut={logOut}
        logIn={logIn}
      />
    </div>
  );
}
