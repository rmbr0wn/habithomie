import React, { useState, useEffect } from "react";

import BarChart from "./BarChart.js";
import { convertSecondsToDecimalHours } from "../../Helpers/TimeConversions.js"    

export default function ChartManager (props) {
  const [chartData, setChartData] = useState({});
  const [viewingChart, setViewingChart] = useState(false);

  useEffect(() => {
    populateChart();
  }, [props.activities, props.times])

  function combineTimeValues (times) {
    let timeMap = new Map();

    for (let i = 0; i < times.length; i++) {
      timeMap.set(times[i].activity_id, timeMap.get(times[i].activity_id) + times[i].time_value || 1 )
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
          label: "Hours spent",                             // TODO: make this dynamic for future
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
    <div>
      <button onClick={toggleChartViewing}> {viewingChart ? "Cancel Chart Viewing" : "View Chart"} </button>
      { viewingChart ?
        <div>
          <BarChart chartData={chartData} />
        </div>
        :
        null
      }
    </div>
  );
}
