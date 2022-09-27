import React, { useState, useEffect } from "react";
import BarChart from "./BarChart.js";
import { convertSecondsToDecimalHours } from "../../Helpers/TimeConversions.js"
import "./chartmanager.css";

export default function ChartManager (props) {
  const [chartData, setChartData] = useState({});
  const [viewingChart, setViewingChart] = useState(false);

  useEffect(() => {
    if (props.activities && props.times) {
      populateChart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.activities, props.times])

  function combineTimeValues (times) {
    let timeMap = new Map();

    for (let i = 0; i < times.length; i++) {
      timeMap.set(times[i].activity_id, timeMap.get(times[i].activity_id) + times[i].time_value || times[i].time_value );
    }
    return timeMap;
  }

  function createChartEntries (activities, combinedTimes) {
    let chartData = [];

    for (const activity in activities) {
      const entry = {
        activityName: activities[activity].activity_name,
        timeValue: combinedTimes.get(activities[activity].activity_id)
       };

       chartData.push(entry);
    }
    return chartData;
  }

  function formatEntriesForChart (entryData) {
    let formattedData = {
      labels: entryData.map((entry) => entry.activityName),
      datasets: [
        {
          label: "Hours spent",      // TODO: make this dynamic in the future
          data: entryData.map((entry) => convertSecondsToDecimalHours(entry.timeValue)),
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    }
    return formattedData;
  }

  async function populateChart () {
    let combinedTimes = combineTimeValues(props.times);
    let chartEntries = createChartEntries(props.activities, combinedTimes);
    await setChartData(formatEntriesForChart(chartEntries));
  }

  function toggleChartViewing () {
    setViewingChart(!viewingChart);
  }

  return (
    <div id="chart-manager-wrapper">
      <div id="chart-view-button-container">
        <button onClick={toggleChartViewing}> {viewingChart ? "Cancel Chart Viewing" : "View Chart"} </button>
      </div>
      { viewingChart ?
        <div id="chart-view-container">
          <div id="chart-header-container">
            <h2> Hours spent per activity type </h2>
          </div>
          <BarChart chartData={chartData} />
        </div>
        :
        null
      }
    </div>
  );
}
