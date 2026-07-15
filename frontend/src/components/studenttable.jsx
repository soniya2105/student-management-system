import React from "react";

function StudentTable({
  students,
  search,
  setSearch,
  deleteStudent,
  setName,
  setRollNo,
  setDepartment,
  setEmail,
  setEditId,
}) {

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.roll_no.toLowerCase().includes(search.toLowerCase()) ||
      student.department.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase())
  );
  const exportToExcel = () => {

  const data = students.map((student) => ({
    Name: student.name,
    "Roll No": student.roll_no,
    Department: student.department,
    Email: student.email,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Students"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob(
    [excelBuffer],
    {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    }
  );

  saveAs(file, "Student_List.xlsx");
};

  return (
    <div className="card shadow p-4">

      <h2 className="mb-4">Student List</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search students..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-success" onClick={exportToExcel}>
          Export to Excel
        </button>
      </div>

      {filteredStudents.length === 0 ? (

        <div className="text-center py-5">

          <h3 className="text-danger">
            No Students Found
          </h3>

          <p className="text-muted">
            Try searching with another keyword.
          </p>

        </div>

      ) : (

        filteredStudents.map((student) => (

          <div
            key={student.id}
            className="card shadow-sm p-3 mb-3 student-card"
          >

            <div className="d-flex align-items-center mb-3">

              <img
                src={`https://ui-avatars.com/api/?name=${student.name}&background=6f42c1&color=fff`}
                alt="avatar"
                className="rounded-circle me-3"
                width="50"
                height="50"
              />

              <h4 className="text-primary m-0">
                {student.name}
              </h4>

            </div>

            <p><b>Roll No:</b> {student.roll_no}</p>

            <p><b>Department:</b> {student.department}</p>

            <p><b>Email:</b> {student.email}</p>

            <div className="d-flex gap-2">

              <button
                className="btn btn-danger"
                onClick={() => deleteStudent(student.id)}
              >
                Delete
              </button>

              <button
                className="btn btn-warning"
                onClick={() => {
                  setName(student.name);
                  setRollNo(student.roll_no);
                  setDepartment(student.department);
                  setEmail(student.email);
                  setEditId(student.id);
                }}
              >
                Edit
              </button>
              

            </div>

          </div>

        ))

      )}

    </div>
  );
}

export default StudentTable;