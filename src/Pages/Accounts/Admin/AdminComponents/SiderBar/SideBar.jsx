import "./SideBar.scss";
import { useState, useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessibleIcon from "@mui/icons-material/Accessible";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SideBar = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
    if (isMobile) setIsSidebarOpen(false);  
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("You have logged out" , {
      position: "top-right",  
    });
    setTimeout(() => navigate("/login"), 1500);
  };

  const toggleSidebar = (e) => {
    if (isMobile) {
      setIsSidebarOpen((prev) => !prev); 
      console.log(isSidebarOpen);
    }
  };
  

  return (
    <>
      <div className="hamburger" onClick={(e) => toggleSidebar(e)}>
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
            <li className={selectedItem === 2 ? "green" : ""} onClick={() => handleClick("/admin/patients", 2)}>
              <AccessibleIcon />
              <span>Patients</span>
            </li>
            <li className={selectedItem === 3 ? "green" : ""} onClick={() => handleClick("/admin/doctors", 3)}j>
              <PersonSharpIcon />
              <span >Doctors</span>
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
    </>
  );
};

export default SideBar;
