// import "./SideBar.scss";
// import { useState } from "react";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import AccessibleIcon from "@mui/icons-material/Accessible";
// import PersonSharpIcon from "@mui/icons-material/PersonSharp";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const SideBar = ({ setShowGif, setGifMessage }) => {
//   const navigate = useNavigate();
//   const [selectedItem, setSelectedItem] = useState(null);

//   const handleClick = (route, index) => {
//     setSelectedItem(index);
//     navigate(route);
//   };

//   const handleLogout = () => {
    

//     localStorage.clear();

//     toast.success("You logout")
//     setTimeout(() => {
//       navigate("/login");
//     }, 1500);
//   };

//   return (
//     <div className="sidebar">
//       <div className="top">
//         <span className="logo">HealthBridge</span>
//       </div>
//       <div className="center">
//         <ul>
//           <p className="title">Main</p>
//           <li className={selectedItem === 1 ? "green" : ""}>
//             <DashboardIcon />
//             <span onClick={() => handleClick("/admin", 1)}>Dashboard</span>
//           </li>
//           <li className={selectedItem === 2 ? "green" : ""}>
//             <AccessibleIcon />
//             <span onClick={() => handleClick("/admin/patients", 2)}>
//               Patients
//             </span>
//           </li>
//           <li className={selectedItem === 3 ? "green" : ""}>
//             <PersonSharpIcon />
//             <span onClick={() => handleClick("/admin/doctors", 3)}>
//               Doctors
//             </span>
//           </li>
//         </ul>
//       </div>
//       <div className="bottom">
//         <button className="logout" onClick={handleLogout}>
//           <LogoutIcon className="logouticon" />
//           Logout
//         </button>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default SideBar;


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
    if (isMobile) setIsSidebarOpen(false); // Close sidebar on mobile after navigation
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("You have logged out");
    setTimeout(() => navigate("/login"), 1500);
  };

  const toggleSidebar = (e) => {
    if (isMobile) {
      // Safely check the className
      // const className = e.target.className?.toString() || "";
      // if (!className.includes("hamburger")) return; // Ensure the click is on the intended element
  
      setIsSidebarOpen((prev) => !prev); // Toggle visibility only for mobile
      console.log(isSidebarOpen);
    }
  };
  

  return (
    <>
      {/* Hamburger menu */}
      <div className="hamburger" onClick={(e) => toggleSidebar(e)}>
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
              <span onClick={() => handleClick("/admin", 1)}>Dashboard</span>
            </li>
            <li className={selectedItem === 2 ? "green" : ""}>
              <AccessibleIcon />
              <span onClick={() => handleClick("/admin/patients", 2)}>Patients</span>
            </li>
            <li className={selectedItem === 3 ? "green" : ""}>
              <PersonSharpIcon />
              <span onClick={() => handleClick("/admin/doctors", 3)}>Doctors</span>
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
