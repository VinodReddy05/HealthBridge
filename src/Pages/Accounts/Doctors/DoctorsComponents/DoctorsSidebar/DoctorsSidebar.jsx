// import "./DoctorsSidebar.scss"
// import { useState } from "react";
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import AccessibleIcon from '@mui/icons-material/Accessible';
// import PersonSharpIcon from '@mui/icons-material/PersonSharp';
// import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
// import Person3Icon from '@mui/icons-material/Person3';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import { useNavigate } from "react-router-dom";
// import LogoutIcon from '@mui/icons-material/Logout';

// const DoctorsSidebar = ({doctorsId}) => {
//   const navigate = useNavigate();

//   const [selectedItem, setSelectedItem] = useState(null);

//   // Handle different route navigation
//   const handleClick = (route) => {
//     // alert("you have clicked the button")
//     navigate(route);  // Navigates to the specified route
//   };


//   const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

//   // Handle item click
//   const handleColor = (index) => {
//     setSelectedItem(index);
//   };

//   const currentDoctors = JSON.parse(localStorage.getItem('doctorData'))

//   const handleLogout = () => {
//     console.log("User logged out");
//     localStorage.clear();
//     navigate("/login");
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
//           <li  className={selectedItem === 1 ? 'green' : 'null'}  >
//             <DashboardIcon />
//             <span onClick={()=>{handleColor(1); handleClick('/doctor/dashboard')}}

             
//             >Dashboard</span> {/* Navigate to Home */}
//           </li>

//           <p className="title">my Details</p>
//           <li>
//             <AccessibleIcon />
//             <span onClick={() => handleClick(`/doctors/${currentDoctors.id}`)}>my details</span> {/* Navigate to Patients */}
//           </li>

//           <li>
//             <ChecklistRtlIcon />
//             <span onClick={() => handleClick('/appointments')}>Appointments</span>
//           </li>
//         </ul>
//       </div>

      
//       <div className="bottom">
       
//         <button className="logout" onClick={handleLogout}>
//         <LogoutIcon className="logouticon"/>
//           logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DoctorsSidebar;



import "./DoctorsSidebar.scss";
import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessibleIcon from "@mui/icons-material/Accessible";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const DoctorsSidebar = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const currentDoctor = JSON.parse(localStorage.getItem("doctorData"));

  const handleClick = (route, index) => {
    setSelectedItem(index);
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
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
            <span onClick={() => handleClick("/doctor/dashboard", 1)}>
              Dashboard
            </span>
          </li>
          <p className="title">My Details</p>
          <li className={selectedItem === 2 ? "green" : ""}>
            <AccessibleIcon />
            <span
              onClick={() =>
                handleClick(`/doctor/details?id=${currentDoctor?.id}`, 2)
              }
            >
              My Details
            </span>
          </li>
          <li className={selectedItem === 3 ? "green" : ""}>
            <ChecklistRtlIcon />
            <span onClick={() => handleClick("/doctor/appointments", 3)}>
              Appointments
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
    </div>
  );
};

export default DoctorsSidebar;
