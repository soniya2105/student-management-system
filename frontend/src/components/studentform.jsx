import React from "react";

function StudentForm({
  name,
  setName,
  rollNo,
  setRollNo,
  department,
  setDepartment,
  email,
  setEmail,
  addStudent,
  updateStudent,
  editId,
}) {
  return (
    <div className="card shadow p-4">

      <h3 className="text-center mb-4">
        Student Form
      </h3>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Roll No"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
      />

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />

      <input
        type="email"
        className="form-control mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="d-flex gap-2">

        <button
          className="btn btn-success w-50"
          onClick={addStudent}
        >
          Add Student
        </button>

        <button
          className="btn btn-primary w-50"
          onClick={() => updateStudent(editId)}
        >
          Update Student
        </button>

      </div>

    </div>
  );
}

export default StudentForm;