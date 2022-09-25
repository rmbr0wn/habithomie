import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import { useSelector } from "react-redux";

export default function BarChart ({chartData}) {
  return (
    <Bar
      data={chartData}
      height={400}
      width={600}
      options={{ maintainAspectRatio: false}}
    />
  );
}
