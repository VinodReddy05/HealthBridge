import "./patientSidebar.scss";
import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessibleIcon from "@mui/icons-material/Accessible";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import MenuIcon from "@mui/icons-material/Menu";
import Person3Icon from "@mui/icons-material/Person3";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientSidebar = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false); // State to track sidebar collapse

  const handleClick = (route) => {
    navigate(route);
  };

  const handleColor = (index) => {
    setSelectedItem(index);
  };

  const currentPatients = JSON.parse(localStorage.getItem('patientData'));
  console.log(currentPatients?.name);

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.clear();
    toast.success("Successfully logged out!!!");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="top">
        <MenuIcon className="hamburger" onClick={toggleSidebar} />
        {!isCollapsed && <span className="logo">HealthBridge</span>}
      </div>
      <div className="center">
        <ul>
          <p className="title">{!isCollapsed && "Main"}</p>
          <li className={selectedItem === 1 ? "#4daaf5 vinod" : ""}   onClick={() => {
                  handleColor(1);
                  handleClick("/patients/dashboard");
                }}>
            <DashboardIcon />
            {!isCollapsed && (
              <span><button> Dashboard</button></span>
            )}
          </li>

          <p className="title">{!isCollapsed && "My Details"}</p>
          <li className={selectedItem === 2 ? "#4daaf5" : ""}   
                  onClick={() => {
                  handleColor(2);
                  handleClick(`/patients/${currentPatients.id}`);
                }}>
            <AccessibleIcon />
            {!isCollapsed && (
              <span><button> My Details</button> </span>
            )}
          </li>

          {/* <p className="title">{!isCollapsed && "Staff"}</p>
          <li className={selectedItem === 3 ? "green" : ""}>
            <Person3Icon />
            {!isCollapsed && (
              <span
                onClick={() => {
                  handleColor(3);
                  handleClick("/patient/Myprescriptions");
                }}
              >
                <button>My perscriptions</button>
              </span>
            )}
          </li> */}

          <p className="title">{!isCollapsed && "Check List"}</p>
          <li className={selectedItem === 4 ? "#4daaf5" : ""}   onClick={() => {
                  handleColor(4);
                  handleClick("/patient/appointment");
                }}>
            <ChecklistRtlIcon />
            {!isCollapsed && (
              <span><button>Find My Doctors</button></span>
            )}
          </li>
          <li className={selectedItem === 5 ? "4daaf5" : ""} onClick={() => {
                  handleColor(5);
                  handleClick("/patient/appointmentschedule");
                }}>
            <AccessTimeIcon />
            {!isCollapsed && (
              <span><button>Appointments</button></span>
            )}
          </li>
        </ul>
      </div>

      <div className="bottom2" onClick={handleLogout}>
        <button className="logout" >
          <LogoutIcon className="logouticon" />
          {!isCollapsed && "Logout"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PatientSidebar;
