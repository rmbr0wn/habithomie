import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ActivityManager from "./Activities/ActivityManager.js";
import TimeManager from "./Times/TimeManager.js";

export default function EntriesPage () {
  const storedUser = useSelector((state) => state.authReducer);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (!storedUser.authData) {
      navigate('/');
    }
  }, [storedUser]);

  return (
    <div id="entries-page-container-wrapper">
    { storedUser?.authData ?
      <div className="entries-page-container">
        <h1> Authenticated routes work, this is the Entries Page. </h1>
        <TimeManager />
        <ActivityManager />
      </div>
      :
      <div className="entries-page-container">
        <h1> You must login to use this page. </h1>
      </div>
    }
    </div>
  );
}
