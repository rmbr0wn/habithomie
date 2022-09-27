import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ActivityManager from "./Activities/ActivityManager.js";
import TimeManager from "./Times/TimeManager.js";
import "./entriespage.css";

export default function EntriesPage () {
  const storedUser = useSelector((state) => state.authReducer);
  let navigate = useNavigate();

  useEffect(() => {
    if (!storedUser.authData) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [storedUser]);

  return (
    <div id="entries-page-container-wrapper">
    { storedUser?.authData ?
      <div className="entries-page-container">
        <div className="entries-header-container">
          <h1> Manage your entries and activities here. </h1>
        </div>
        <div id="time-activity-managers-container">
          <TimeManager />
          <ActivityManager />
        </div>
      </div>
      :
      <div className="entries-page-container">
        <h1> You must login to use this page. </h1>
      </div>
    }
    </div>
  );
}
