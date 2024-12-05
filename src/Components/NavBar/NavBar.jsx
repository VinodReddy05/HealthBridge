import "./NavBar.scss";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import avatar from "../../assets/vinodPic.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from "../ThemeContext/ThemeContext";

const NavBar = ({ profileImage }) => {
  const navigate = useNavigate();
  const doctorData = JSON.parse(localStorage.getItem("doctorData"));
  const patientData = JSON.parse(localStorage.getItem("patientData"));
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { darkMode, toggleDarkMode } = useTheme();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    toast.warning("You logged out");
    localStorage.clear();
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const handleProfile = () => {
    if (doctorData && doctorData.id) {
      navigate(`/doctors/${doctorData.id}`);
    } else if (patientData && patientData.id) {
      navigate(`/patients/${patientData.id}`);
    } else {
      console.log("No user data found in localStorage");
    }
  };

  return (
    <div className={`navbar ${darkMode ? "dark-mode" : ""}`}>
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchIcon className="icon" />
        </div>

        <div className="items">
          <div className="item item-bright">
            <Brightness4Icon className="icon" onClick={toggleDarkMode} />
          </div>

          <div className="profile">
            <div className="item" onClick={toggleDropdown}>
              <img
                src={
                  profileImage ||
                  (doctorData && doctorData.image_url) ||
                  (patientData && patientData.image_url) ||
                  avatar
                }
                alt="User Avatar"
                className="avatar"
              />
              <h4>
                {doctorData?.name ||
                  patientData?.name ||
                  "Admin"}
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
