import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Stopwatch from "./Stopwatch/Stopwatch.js";
import BarChart from "./Charts/BarChart.js";
import { getActivities } from "../../actions/activities.js";
import { getTimeEntries } from "../../actions/times.js";
import { convertSecondsToDecimalHours } from "../Helpers/TimeConversions.js"

export default function HomePage () {
  const storedUser = useSelector((state) => state.authReducer);
  const storedActivities = useSelector((state) => state.activitiesReducer);
  const storedTimes = useSelector((state) => state.timesReducer);
  const [chartData, setChartData] = useState();
  const [viewingChart, setViewingChart] = useState(false);
  const dispatch = useDispatch();

  // Send db fetch only if activities not already in redux store
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

  // Populate chart data, and update as they add new entries from stopwatch
  useEffect(() => {
    if (storedActivities.activitiesData && storedTimes.timesData) {
      let entryData = createChartEntries(storedActivities.activitiesData, combineTimeValues(storedTimes.timesData));
      setChartData(formatEntriesForChart(entryData));
    }
  }, [storedActivities, storedTimes])


  /*TODO: need to combine the values of all time_values corresponding to a particular activity_id

  */

  // You take all times corresponding to a particular activity_id & put them into a map (mapping id to time value)
  function combineTimeValues (times) {
    let timeMap = new Map();

    for (let i = 0; i < times.length; i++) {
      timeMap.set(times[i].activity_id, timeMap.get(times[i].activity_id) + times[i].time_value || 1 )
    }

    return timeMap;
  }

  // You turn activities & time into a single set of data that is then used in the chart
  // You get called on the activities store, BUT also used the combineTimeValues --> could maybe put combineTimeValues in here
  function createChartEntries (activities, times) {
    let chartData = [];

    for (const activity in activities) {
      const entry = {
        activityName: activities[activity].activity_name,
        timeValue: times.get(activities[activity].activity_id)
       };

       chartData.push(entry);
    }

    return chartData;
  }

  // You simply pass the chart data in the proper format
  function formatEntriesForChart (entryData) {
    let formattedData = {
      labels: entryData.map((entry) => entry.activityName),
      datasets: [
        {
          label: "Hours spent",                             // TODO: make this dynamic for future
          data: entryData.map((entry) => convertSecondsToDecimalHours(entry.timeValue)),       // TODO: change to proper decimal hour format
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    }
    return formattedData;
  }

  function toggleChartViewing () {
    setViewingChart(!viewingChart);
  }

  return (
    <div className="dashboard-page-container-wrapper">
    { storedUser?.authData ?
      <div>
        <h1> The dashboard! </h1>
        <button onClick={toggleChartViewing}> View Chart </button>
        <Stopwatch />
        { viewingChart ?
          <div>
            <BarChart chartData={chartData} />
          </div>
          :
          null
        }
      </div>

      :
      <div>
        <h1> You need to login to use the dashboard page. </h1>
      </div>
    }
    </div>
  );
}
