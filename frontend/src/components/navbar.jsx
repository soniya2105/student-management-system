 import React from "react";
 import { FaBell,FaCog,FaUserCircle} from "react-icons/fa";
 function Navbar(){
    return(
        <nav className="navbar navbar-expamd-lg navbar-dark navbar-custom shadow">
            <div className="container">
                <a className="navbar-brand fw-bold" href="#"> STUDENT MANAGEMENT SYSTEM
                </a>  
                <div  className="d-flex align-items-center gap-5 ms-auto">
                    <FaBell className="text-white mx-3" size={20}/> 
                    <FaCog className="text-white mx-3"  size={20}/>
                    <FaUserCircle className="text-white mx-3" size={20}/>
                </div>
             </div>
          
      </nav>
    );
 }
 export default Navbar;