import "./patientSidebar.scss";
import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessibleIcon from "@mui/icons-material/Accessible";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import Person3Icon from "@mui/icons-material/Person3";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

const PatientSidebar = () => {
  // console.log(patientId && )

  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);

  // Handle different route navigation
  const handleClick = (route) => {
    navigate(route);
  };

  const handleColor = (index) => {
    setSelectedItem(index);
  };


const currentPatients = JSON.parse(localStorage.getItem('patientData'))
console.log(currentPatients.id);

const handleLogout = () => {
  console.log("User logged out");
  localStorage.clear();
  navigate("/login");
};
  return (
    <nav className="sidebar">
      <div className="top">
        <span className="logo">HealthBridge</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Main</p>
          <li className={selectedItem === 1 ? "green" : ""}>
            <DashboardIcon />
            <span
              onClick={() => {
                handleColor(1);
                handleClick("/patients/dashboard");
              }}
            >
              Dashboard
            </span>
          </li>

          <p className="title">My Details</p>
          <li className={selectedItem === 2 ? "green" : ""}>
            <AccessibleIcon />
            <span
              onClick={() => {
                handleColor(2);
                handleClick(`/patients/${currentPatients.id}`);
              }}
            >
              My Details
            </span>
          </li>

          <p className="title">Staff</p>
          <li className={selectedItem === 3 ? "green" : ""}>
            <Person3Icon />
            <span onClick={() => {
              handleColor(3);
              handleClick("/nurses");
            }}>
              Nurses
            </span>
          </li>

          <p className="title">Check List</p>
          <li className={selectedItem === 4 ? "green" : ""}>
            <ChecklistRtlIcon />
            <span
              onClick={() => {
                handleColor(4);
                handleClick("/appointments");
              }}
            >
              Appointments
            </span>
          </li>
          <li className={selectedItem === 5 ? "green" : ""}>
            <AccessTimeIcon />
            <span
              onClick={() => {
                handleColor(5);
                // handleClick("/appointment-schedule");
                <Link to={`/patients/${patientId}`}>
                Patient Details
              </Link>
              }}
            >
              Appointment Schedule
            </span>
          </li>
        </ul>
      </div>

      <div className="bottom">
       
       <button className="logout" onClick={handleLogout}>
       <LogoutIcon className="logouticon"/>
         logout
       </button>
     </div>
    </nav>
  );
};

export default PatientSidebar;
