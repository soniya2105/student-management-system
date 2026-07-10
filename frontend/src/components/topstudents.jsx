import React from "react";

function TopStudents({ students }) {

  const topStudents = students.slice(0, 3);

  return (
    <div className="card shadow p-4">

      <h3 className="mb-4">Top Students</h3>

      {topStudents.length === 0 ? (
        <p className="text-muted">No Students Available</p>
      ) : (
        topStudents.map((student) => (

          <div
            key={student.id}
            className="d-flex align-items-center mb-4"
          >

            <img
              src={`https://ui-avatars.com/api/?name=${student.name}&background=6f42c1&color=fff`}
              alt="avatar"
              className="rounded-circle me-3"
              width="60"
              height="60"
            />

            <div>

              <h5 className="m-0">
                {student.name}
              </h5>

              <small className="text-muted">
                {student.department}
              </small>

              <br />

              <span className="badge bg-success mt-2">
                Top Performer
              </span>

            </div>

          </div>

        ))
      )}

    </div>
  );
}

export default TopStudents;