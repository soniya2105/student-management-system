import React from "react";
import { FaUserGraduate } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";

function StatsCards({ students }) {

  const departmentCount = new Set(
    students.map((student) => student.department)
  ).size;

  return (
    <div className="container mt-4">
      <div className="row">

        <div className="col-md-4">
          <div className="card shadow text-center p-3 stats-card">
            <h5>
              <FaUserGraduate className="me-2" />
              Total Students
            </h5>
            <h2>{students.length}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center p-3 stats-card">
            <h5>
              <MdSchool className="me-2" />
              Departments
            </h5>
            <h2>{departmentCount}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center p-3 stats-card">
            <h5>
              <FaChartLine className="me-2" />
              Attendance
            </h5>
            <h2>95%</h2>
          </div>
        </div>

      </div>
    </div>
  );
}

export default StatsCards;