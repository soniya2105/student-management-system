import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/navbar";
import {FaUserGraduate } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import { FaChartLine } from "react-icons/fa"; 

function App() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // Fetch students
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/students/"
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Add student
  const addStudent = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/students/",
        {
          name: name,
          roll_no: rollNo,
          department: department,
          email: email,
        }
      );

      alert("Student Added Successfully!");

      setName("");
      setRollNo("");
      setDepartment("");
      setEmail("");

      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };
  //delete student
  const deleteStudent=async(id)=>{
    try{
      await axios.delete(
        `http://127.0.0.1:8000/api/students/${id}/`
      );
      alert("Student Deleetd Succesfully!");
      fetchStudents();
    }
    catch(error){
      console.error("deleting error:",error);
    }
  } ; 
  //update student
  const updateStudent=async(id)=>{
    console.log("Updating student with ID:", id);
    try{
      await axios.put(
        `http://127.0.0.1:8000/api/students/update/${id}/`,
        {
          name:name,
          roll_no: rollNo,
          department: department,
          email: email,
        }
      );
      alert("Student Updated Successfully!");
      setName("");
      setRollNo("");
      setDepartment("");
      setEmail("");
      setEditId(null);
      fetchStudents();
    }
    catch(error){
      console.log(error);
      if (error.response){
        console.error("Error updating student:", error.response.data);
      }
      else {
        console.log(error.message)
      }
      
    }
  };
  return (
    <>
    <Navbar />
    {/* Statistics Section */}
    <div className="container mt-4">
      <div className="row">

        <div className="col-md-4">
          <div className="card shadow p-3 text-center stats-card">
            <h5>
              <FaUserGraduate className="me-2" />
              Total Students
            </h5>
            <h2>{students.length}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-3 text-center stats-card">
            <h5>
              <MdSchool className="me-2" />
              Departments
            </h5>
            <h2>{new Set(students.map(student => student.department)).size}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-3 text-center stats-card">
            <h5>
              <FaChartLine className="me-2" />
              Attendance
            </h5>
            <h2>95%</h2>
          </div>
        </div>

      </div>
    </div>
    
      <div className="container mt-4">
  <div className="row">

    {/* Left Side Form */}
    <div className="col-md-4">
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
    </div>

    {/* Right Side Student List */}
    <div className="col-md-8">
      <div className="card shadow p-4">

        <h2 className="mb-4">
          Student List
        </h2>
        <input type="text" 
          className="form-control mb-3"
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {students
        .filter((student) => 
          student.name.toLowerCase().includes(search.toLowerCase()) ||
          student.roll_no.toLowerCase().includes(search.toLowerCase()) ||
          student.department.toLowerCase().includes(search.toLowerCase()) ||
          student.email.toLowerCase().includes(search.toLowerCase())
        )
        .map((student) => (
          <div
            key={student.id}
            className="card shadow-sm p-3 mb-3 student-card"
          >
          <div className="d-flex align-items-center mb-3">
             <img src={`https://ui-avatars.com/api/?name=${student.name}&background=6f42c1&color=fff`}
                         alt="avatar"
                    className="rounded-circle me-3"
                    width="50"
                    height="50"
                     />

               <h4 className="text-primary m-0">
                  {student.name}
               </h4>

          </div>
            <p>
              <b>Roll No:</b> {student.roll_no}
            </p>

            <p>
              <b>Department:</b> {student.department}
            </p>

            <p>
              <b>Email:</b> {student.email}
            </p>

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
        ))}

      </div>
    </div>

  </div>
</div>
    </>
  );
}

export default App;