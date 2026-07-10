import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import Navbar from "./components/navbar";
import StatsCards from "./components/statscards";
import StudentForm from "./components/studentform";
import StudentTable from "./components/studenttable";
import TopStudents from "./components/topstudents";
import Charts from "./components/charts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import {ClipLoader} from "react-spinners";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function App() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch students
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/students/"
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
    finally {
      setLoading(false);
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

      toast.success("Student Added Successfully!");

      setName("");
      setRollNo("");
      setDepartment("");
      setEmail("");

      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this student!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) {
      return;
    }
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/students/${id}/`
      );

      toast.success("Student Deleted Successfully!");

      fetchStudents();
    } catch (error) {
      toast.error("Error deleting student. Please try again.");
      console.error("Deleting error:", error);
    }
  };

  // Update student
  const updateStudent = async (id) => {
    console.log("Updating student with ID:", id);

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/students/update/${id}/`,
        {
          name: name,
          roll_no: rollNo,
          department: department,
          email: email,
        }
      );

      toast.success("Student Updated Successfully!");

      setName("");
      setRollNo("");
      setDepartment("");
      setEmail("");
      setEditId(null);

      fetchStudents();
    } catch (error) {
      console.log(error);

      if (error.response) {
        console.error(
          "Error updating student:",
          error.response.data
        );
      } else {
        console.log(error.message);
      }
    }
  };
  if (loading) {
    return(
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
      >
        <ClipLoader
         color="#6f42c1"
         size={70} />
      </div>
    );
  }
  
  return (
  <>
    <Navbar />

    {/* Statistics Cards */}
    <StatsCards students={students} />

    <div className="container mt-4">
      <div className="row">

        {/* Student Form */}
        <div className="col-lg-3 col-md-4 mb-4">
          <StudentForm
            name={name}
            setName={setName}
            rollNo={rollNo}
            setRollNo={setRollNo}
            department={department}
            setDepartment={setDepartment}
            email={email}
            setEmail={setEmail}
            addStudent={addStudent}
            updateStudent={updateStudent}
            editId={editId}
          />
        </div>

        {/* Student List */}
        <div className="col-lg-6 col-md-8 mb-4">
          <StudentTable
            students={students}
            search={search}
            setSearch={setSearch}
            deleteStudent={deleteStudent}
            setName={setName}
            setRollNo={setRollNo}
            setDepartment={setDepartment}
            setEmail={setEmail}
            setEditId={setEditId}
          />
        </div>

        {/* Top Students */}
        <div className="col-lg-3 col-md-12 mb-4">
          <TopStudents students={students} />
        </div>

      </div>
    </div>

    {/* Charts */}
    <Charts students={students} />
    <ToastContainer  
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
  />
  </>
);
}

export default App;