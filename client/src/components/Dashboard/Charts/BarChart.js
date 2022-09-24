import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import { useSelector } from "react-redux";

export default function BarChart ({chartData}) {
  return (
    <Bar
      data={chartData}
      height={200}
      width={200}
    />
  );
}

// Labels would probably be the activity types (though could be many things) -- I think this is X
  // --> activitiesData.map((activity) => activity.name)

// Datasets.label would be # hours or something -- I think this is Y --> "Hours spent"
  // This would probably need to be dynamic in the future --> hours spent PER week, PER day, etc.

// Datasets.data would be the value ~ timeData.map((time) => formattedInHourDecimalForm(time.value))


// options not not required
