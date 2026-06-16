import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

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
    <div style={{ padding: "20px" }}>
      <h1>Student Management System</h1>

      <h2>Add Student</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Roll No"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <button onClick={addStudent}>
        Add Student
      </button>
       <button
          onClick={() => updateStudent(editId)}          
          style={{marginLeft:"10px"}}
      >
        Update Student
      </button>

      <hr />

      <h2>Student List</h2>

      {students.map((student) => (
        <div
          key={student.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            margin: "10px",
          }}
        >
          <h3>Name:{student.name}</h3>
          <p><b>Roll No:</b> {student.roll_no}</p>
          <p><b>Department:</b> {student.department}</p>
          <p><b>Email:</b> {student.email}</p>                                                                         
          <button onClick={()=> deleteStudent(student.id)}>Delete
          </button>
          <br />
          <button onClick={()=> {
            setName(student.name);
            setRollNo(student.roll_no);
            setDepartment(student.department);
            setEmail(student.email);
            setEditId(student.id);
          }} style={{marginLeft:"10px"}}>Edit</button>
         
         

        </div>
      ))}
    </div>
  );
}

export default App;