import "./DoctorsSidebar.scss";
import { useState, useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessibleIcon from "@mui/icons-material/Accessible";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoctorsSidebar = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Check if mobile on load
  const currentDoctor = JSON.parse(localStorage.getItem("doctorData")) || {};

  // Monitor window resize to update isMobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 766);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (route, index) => {
    setSelectedItem(index);
    if (isMobile) 
      setIsSidebarOpen(false); // Close sidebar only on mobile
    
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
        {isSidebarOpen ? <CloseIcon  style={{ fontSize: '25px' }}/> : <MenuIcon  style={{ fontSize: '35px' }} />}
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="top">
          <span className="logo">HealthBridge</span>
        </div>
        <div className="center">
          <ul>
            <li className={selectedItem === 1 ? "green" : ""} onClick={() => handleClick("/doctor/dashboard", 1)}>
              <DashboardIcon />
              <span >
                Dashboard
              </span>
            </li>
            <p className="title">My Details</p>
            <li className={selectedItem === 2 ? "green" : ""} onClick={() => handleClick(`/doctor/${currentDoctor.id}`, 2)}>
              <AccessibleIcon />
              <span >
                My Details
              </span>
            </li>
            <li className={selectedItem === 3 ? "green" : ""} onClick={() => handleClick("/doctor/mypatients", 3)}>
              <AccessibleIcon />
              <span >
                My Patients
              </span>
            </li>
            <li className={selectedItem === 4 ? "green" : ""} onClick={() => handleClick("/doctor/appointment", 4)}>
              <ChecklistRtlIcon />
              <span >
                Appointments
              </span>
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

export default DoctorsSidebar;
