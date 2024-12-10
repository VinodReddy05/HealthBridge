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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);  
  const currentPatient = JSON.parse(localStorage.getItem("patientData")) || {};

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (route, index) => {
    setSelectedItem(index);
    if (isMobile) setIsSidebarOpen(false);  

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
      setIsSidebarOpen((prev) => !prev);  
    }
  };

  return (
    <>
      <div className="hamburger" onClick={toggleSidebar}>
        {isSidebarOpen ? <CloseIcon style={{ fontSize: "25px" }} /> : <MenuIcon style={{ fontSize: "35px" }} />}
      </div>

      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="top">
          <span className="logo">HealthBridge</span>
        </div>
        <div className="center">
          <ul>
          
            <li className={selectedItem === 1 ? "green" : ""} onClick={() => handleClick("/", 1)}>
              <DashboardIcon />
              <span >Dashboard</span>
            </li>
            
            <li className={selectedItem === 2 ? "green" : ""} onClick={() => handleClick(`/patients/${currentPatient.id}`, 2)}>
              <AccessibleIcon />
              <span >My Details</span>
            </li>
           
            <li className={selectedItem === 3 ? "green" : ""} onClick={() => handleClick("/patient/appointment", 3)}>
              <ChecklistRtlIcon />
              <span  >Find My Doctors</span>
            </li>
            <li className={selectedItem === 4 ? "green" : ""} onClick={() => handleClick("/patient/appointmentschedule", 4)}>
              <AccessTimeIcon />
              <span >Appointments</span>
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
