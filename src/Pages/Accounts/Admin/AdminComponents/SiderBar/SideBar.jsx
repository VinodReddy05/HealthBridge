import "./SideBar.scss";
import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessibleIcon from "@mui/icons-material/Accessible";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import Person3Icon from "@mui/icons-material/Person3";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState(null);

  // Handle different route navigation
  const handleClick = (route) => {
    // alert("you have clicked the button")
    navigate(route); // Navigates to the specified route
  };

  const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

  // Handle item click
  const handleColor = (index) => {
    setSelectedItem(index);
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
          <li className={selectedItem === 1 ? "green" : "null"}>
            <DashboardIcon />
            <span
              onClick={() => {
                handleColor(1);
                handleClick("/");
              }}
            >
              Dashboard
            </span>{" "}
            {/* Navigate to Home */}
          </li>

          <p className="title">Patient Details</p>
          <li>
            <AccessibleIcon />
            <span onClick={() => handleClick("/patients")}>Patients</span>{" "}
            {/* Navigate to Patients */}
          </li>

          <p className="title">Staff</p>
          <li>
            <PersonSharpIcon />
            <span onClick={() => handleClick("/doctors")}>Doctors</span>{" "}
            {/* Navigate to a doctor's specific page, replace `1` with actual dynamic ID */}
          </li>
          <li>
            <Person3Icon />
            <span onClick={() => handleClick("/nurses")}>Nurse</span>
          </li>

          <p className="title">Check List</p>
          <li>
            <ChecklistRtlIcon />
            <span onClick={() => handleClick("/appointments")}>
              Appointments
            </span>
          </li>
          <li>
            <AccessTimeIcon />
            <span onClick={() => handleClick("/appointment-schedule")}>
              Appointment Schedule
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
