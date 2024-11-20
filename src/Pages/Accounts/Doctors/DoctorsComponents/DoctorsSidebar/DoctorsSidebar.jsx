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
  const currentDoctor = JSON.parse(localStorage.getItem("doctorData")) || {};   
  
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
                handleClick(`/doctor/${currentDoctor.id}`, 2)   
              }
            >
              My Details
            </span>
          </li>
          <li className={selectedItem === 3 ? "green" : ""}>
            <AccessibleIcon />
            <span
              onClick={() =>
                handleClick("/doctor/mypatients", 3)   
              }
            >
              My Patients
            </span>
          </li>
          <li className={selectedItem === 4 ? "green" : ""}>
            <ChecklistRtlIcon />
            <span onClick={() => handleClick("/doctor/appointments", 4)}>
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
