import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

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
