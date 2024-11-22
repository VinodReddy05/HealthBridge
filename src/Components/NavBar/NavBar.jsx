import "./NavBar.scss";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import avatar from "../../assets/vinodPic.jpg";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from "../ThemeContext/ThemeContext";

const NavBar = () => {
  const navigate = useNavigate();

  const doctorData = JSON.parse(localStorage.getItem("doctorData"));
  const patientData = JSON.parse(localStorage.getItem("patientData"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  // const [darkMode, setDarkMode] = useState(
  //   localStorage.getItem("darkMode") === "true"
  // );


  const { darkMode, toggleDarkMode } = useTheme();



  const handleLogout = () => {
    toast.warning("You loged out ");
    localStorage.clear();
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const handleProfile = () => {
    if (doctorData && doctorData.id) {
      navigate(`/doctors/${doctorData.id}`);
      console.log("Navigating to doctor profile with ID:", doctorData.id);
    } else if (patientData && patientData.id) {
      navigate(`/patients/${patientData.id}`);
      console.log("Navigating to patient profile with ID:", patientData.id);
    } else {
      console.log("No user data found in localStorage");
    }
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="search...." />
          <SearchIcon />
        </div>
        <div className="items">
          {/* <div className="item">
            <LanguageIcon className="icon" />
            English
          </div> */}
          <div className="item">
            <Brightness4Icon className="icon"  onClick={toggleDarkMode}/>
          </div>
          <div className="item">
            <NotificationsActiveOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          {/* <div className="item">
            <MenuOutlinedIcon className="icon" />
          </div> */}
          <div className="profile">
            {/* <h4>
              {doctorData
                ? doctorData.name
                : patientData
                ? patientData.name
                : "Admin"}
            </h4> */}
            <div className="item">
              <img
                src={
                  doctorData
                    ? doctorData.image_url
                    : patientData
                    ? patientData.image_url
                    : avatar
                }
                alt="User Avatar"
                className="avatar"
                onClick={toggleDropdown}
              />
              <h4>
                {doctorData
                  ? doctorData.email_id
                  : patientData
                  ? patientData.email_id
                  : "Admin@example.com"}
              </h4>
            </div>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleProfile}>Profile</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
