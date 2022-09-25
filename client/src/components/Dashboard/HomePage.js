import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Stopwatch from "./Stopwatch/Stopwatch.js";
import ChartManager from "./Charts/ChartManager.js";
import { getActivities } from "../../actions/activities.js";
import { getTimeEntries } from "../../actions/times.js";

export default function HomePage () {
  const storedUser = useSelector((state) => state.authReducer);
  const storedActivities = useSelector((state) => state.activitiesReducer);
  const storedTimes = useSelector((state) => state.timesReducer);

  const [viewingChart, setViewingChart] = useState(false);
  const dispatch = useDispatch();

  // Send db fetch only if activities & timesData not already in redux store
  useEffect(() => {
    if (storedUser.authData && !storedActivities.activitiesData) {
      let userId = storedUser.authData.result.id;
      let fetchActivities = dispatch(getActivities(userId));
    }

    if (storedUser.authData && !storedTimes.timesData) {
      let userId = storedUser.authData.result.id;
      let fetchTimes = dispatch(getTimeEntries(userId));
    }
  }, []);

  return (
    <div className="dashboard-page-container-wrapper">
    { storedUser?.authData ?
      <div>
        <h1> The dashboard! </h1>
        <Stopwatch />
        <ChartManager activities={storedActivities.activitiesData} times={storedTimes.timesData} />
      </div>
      :
      <div>
        <h1> You need to login to use the dashboard page. </h1>
      </div>
    }
    </div>
  );
}
