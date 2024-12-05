// import "./patientSidebar.scss";
// import { useState } from "react";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import AccessibleIcon from "@mui/icons-material/Accessible";
// import PersonSharpIcon from "@mui/icons-material/PersonSharp";
// import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
// import MenuIcon from "@mui/icons-material/Menu";
// import Person3Icon from "@mui/icons-material/Person3";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import { useNavigate } from "react-router-dom";
// import LogoutIcon from '@mui/icons-material/Logout';
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const PatientSidebar = () => {
//   const navigate = useNavigate();
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [isCollapsed, setIsCollapsed] = useState(false); // State to track sidebar collapse

//   const handleClick = (route) => {
//     navigate(route);
//   };

//   const handleColor = (index) => {
//     setSelectedItem(index);
//   };

//   const currentPatients = JSON.parse(localStorage.getItem('patientData'));
//   console.log(currentPatients?.name);

//   const handleLogout = () => {
//     console.log("User logged out");
//     localStorage.clear();
//     toast.success("Successfully logged out!!!");
//     setTimeout(() => {
//       navigate("/login");
//     }, 1500);
//   };

//   // Toggle sidebar collapse
//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
//       <div className="top">
//         <MenuIcon className="hamburger" onClick={toggleSidebar} />
//         {!isCollapsed && <span className="logo">HealthBridge</span>}
//       </div>
//       <div className="center">
//         <ul>
//           <p className="title">{!isCollapsed && "Main"}</p>
//           <li className={selectedItem === 1 ? "#4daaf5 vinod" : ""}   onClick={() => {
//                   handleColor(1);
//                   handleClick("/patients/dashboard");
//                 }}>
//             <DashboardIcon />
//             {!isCollapsed && (
//               <span><button> Dashboard</button></span>
//             )}
//           </li>

//           <p className="title">{!isCollapsed && "My Details"}</p>
//           <li className={selectedItem === 2 ? "#4daaf5" : ""}   
//                   onClick={() => {
//                   handleColor(2);
//                   handleClick(`/patients/${currentPatients.id}`);
//                 }}>
//             <AccessibleIcon />
//             {!isCollapsed && (
//               <span><button> My Details</button> </span>
//             )}
//           </li>

//           <p className="title">{!isCollapsed && "Check List"}</p>
//           <li className={selectedItem === 4 ? "#4daaf5" : ""}   onClick={() => {
//                   handleColor(4);
//                   handleClick("/patient/appointment");
//                 }}>
//             <ChecklistRtlIcon />
//             {!isCollapsed && (
//               <span><button>Find My Doctors</button></span>
//             )}
//           </li>
//           <li className={selectedItem === 5 ? "4daaf5" : ""} onClick={() => {
//                   handleColor(5);
//                   handleClick("/patient/appointmentschedule");
//                 }}>
//             <AccessTimeIcon />
//             {!isCollapsed && (
//               <span><button>Appointments</button></span>
//             )}
//           </li>
//         </ul>
//       </div>

//       <div className="bottom2" onClick={handleLogout}>
//         <button className="logout" >
//           <LogoutIcon className="logouticon" />
//           {!isCollapsed && "Logout"}
//         </button>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default PatientSidebar;



import "./PatientSidebar.scss";
import { useState, useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessibleIcon from "@mui/icons-material/Accessible";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientSidebar = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Check if mobile on load
  const currentPatient = JSON.parse(localStorage.getItem("patientData")) || {};

  // Monitor window resize to update isMobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (route, index) => {
    setSelectedItem(index);
    if (isMobile) setIsSidebarOpen(false); // Close sidebar only on mobile

    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Successfully logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen((prev) => !prev); // Toggle sidebar visibility only for mobile
    }
  };

  return (
    <>
      {/* Hamburger menu */}
      <div className="hamburger" onClick={toggleSidebar}>
        {isSidebarOpen ? <CloseIcon style={{ fontSize: "25px" }} /> : <MenuIcon style={{ fontSize: "35px" }} />}
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="top">
          <span className="logo">HealthBridge</span>
        </div>
        <div className="center">
          <ul>
            <p className="title">Main</p>
            <li className={selectedItem === 1 ? "green" : ""}>
              <DashboardIcon />
              <span onClick={() => handleClick("/patients/dashboard", 1)}>Dashboard</span>
            </li>
            <p className="title">My Details</p>
            <li className={selectedItem === 2 ? "green" : ""}>
              <AccessibleIcon />
              <span onClick={() => handleClick(`/patients/${currentPatient.id}`, 2)}>My Details</span>
            </li>
            <p className="title">Check List</p>
            <li className={selectedItem === 3 ? "green" : ""}>
              <ChecklistRtlIcon />
              <span onClick={() => handleClick("/patient/appointment", 3)}>Find My Doctors</span>
            </li>
            <li className={selectedItem === 4 ? "green" : ""}>
              <AccessTimeIcon />
              <span onClick={() => handleClick("/patient/appointmentschedule", 4)}>Appointments</span>
            </li>
          </ul>
        </div>
        <div className="bottom1">
          <button className="logout" onClick={handleLogout}>
            <LogoutIcon className="logouticon" />
            Logout
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default PatientSidebar;
