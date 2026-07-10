import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Charts({ students }) {

  const departments = {};

  students.forEach((student) => {
    departments[student.department] =
      (departments[student.department] || 0) + 1;
  });

  const pieData = {
    labels: Object.keys(departments),
    datasets: [
      {
        label: "Students",
        data: Object.values(departments),
        backgroundColor: [
          "#6f42c1",
          "#198754",
          "#0d6efd",
          "#ffc107",
          "#dc3545",
        ],
      },
    ],
  };

  const barData = {
    labels: Object.keys(departments),
    datasets: [
      {
        label: "Students",
        data: Object.values(departments),
        backgroundColor: "#6f42c1",
      },
    ],
  };

  return (
    <div className="container mt-4">

      <div className="row">

        <div className="col-md-6">

          <div className="card shadow p-4">

            <h4 className="text-center mb-3">
              Department Distribution
            </h4>

            <Pie data={pieData} />

          </div>

        </div>

        <div className="col-md-6">

          <div className="card shadow p-4">

            <h4 className="text-center mb-3">
              Students Per Department
            </h4>

            <Bar data={barData} />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Charts;