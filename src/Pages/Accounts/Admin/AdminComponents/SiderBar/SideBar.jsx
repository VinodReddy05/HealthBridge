// import "./SideBar.scss";
// import { useState } from "react";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import AccessibleIcon from "@mui/icons-material/Accessible";
// import PersonSharpIcon from "@mui/icons-material/PersonSharp";
// import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
// import Person3Icon from "@mui/icons-material/Person3";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import { useNavigate } from "react-router-dom";
// import LogoutIcon from "@mui/icons-material/Logout";

// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const SideBar = () => {
//   const navigate = useNavigate();

//   const [selectedItem, setSelectedItem] = useState(null);

//   const handleClick = (route, index) => {
//     setSelectedItem(index);
//     navigate(route); 
//   };

//   // const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

//   const handleLogout = () => {
//     console.log("User logged out");
//     toast.warning("you loged out");
//     localStorage.clear();
//     setTimeout(() => {
//       navigate("/login");
//     }, 1500);
//   };

//   return (
//     <div className="sidebar">
//       <div className="top">
//         <span className="logo">HealthBridge</span>
//       </div>
//       <hr />
//       <div className="center">
//         <ul>
//           <p className="title">Main</p>
//           <li className={selectedItem === 1 ? "green" : ""}>
//             <DashboardIcon />
//             <span
//               onClick={() => handleClick("/", 1)} // Pass route and index
//             >
//               Dashboard
//             </span>
//           </li>

//           <li className={selectedItem === 2 ? "green" : ""}>
//             <AccessibleIcon />
//             <span onClick={() => handleClick("/patients", 2)}>Patients</span>
//           </li>

//           <li className={selectedItem === 3 ? "green" : ""}>
//             <PersonSharpIcon />
//             <span onClick={() => handleClick("/doctors", 3)}>Doctors</span>
//           </li>
//           <li>
//             <Person3Icon />
//             <span onClick={() => handleClick("/nurses")}>Nurse</span>
//           </li>

//           <p className="title">Check List</p>
//           <li>
//             <ChecklistRtlIcon />
//             <span onClick={() => handleClick("/appointments")}>
//               Appointments
//             </span>
//           </li>
//           <li>
//             <AccessTimeIcon />
//             <span onClick={() => handleClick("/appointment-schedule")}>
//               Appointment Schedule
//             </span>
//           </li>
//         </ul>
//       </div>

//       <div className="bottom">
//         <button className="logout" onClick={handleLogout}>
//           <LogoutIcon className="logouticon" />
//           logout
//         </button>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default SideBar;


import "./SideBar.scss";
import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessibleIcon from "@mui/icons-material/Accessible";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SideBar = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (route, index) => {
    setSelectedItem(index);
    navigate(route);
  };

  const handleLogout = () => {
    toast.warning("You have logged out!");
    localStorage.clear();
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">HealthBridge</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Main</p>
          <li className={selectedItem === 1 ? "green" : ""}>
            <DashboardIcon />
            <span onClick={() => handleClick("/", 1)}>Dashboard</span>
          </li>
          <li className={selectedItem === 2 ? "green" : ""}>
            <AccessibleIcon />
            <span onClick={() => handleClick("/admin/patients", 2)}>
              Patients
            </span>
          </li>
          <li className={selectedItem === 3 ? "green" : ""}>
            <PersonSharpIcon />
            <span onClick={() => handleClick("/admin/doctors", 3)}>
              Doctors
            </span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <button className="logout" onClick={handleLogout}>
          <LogoutIcon className="logouticon" />
          Logout
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SideBar;
