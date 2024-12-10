// import "./NavBar.scss";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import avatar from "../../assets/vinodPic.jpg";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useTheme } from "../ThemeContext/ThemeContext";

// const NavBar = ({ profileImage, onSearch }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();
//   const doctorData = JSON.parse(localStorage.getItem("doctorData"));
//   const patientData = JSON.parse(localStorage.getItem("patientData"));
//   const { darkMode, toggleDarkMode } = useTheme();

//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

//   const handleLogout = () => {
//     toast.warning("You logged out");
//     localStorage.clear();
//     setTimeout(() => {
//       navigate("/login");
//     }, 1500);
//   };

//   const handleProfile = () => {
//     if (doctorData && doctorData.id) {
//       navigate(`/doctors/${doctorData.id}`);
//     } else if (patientData && patientData.id) {
//       navigate(`/patients/${patientData.id}`);
//     } else {
//       console.log("No user data found in localStorage");
//     }
//   };

//   // Handle search input change and notify parent
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//     onSearch(e.target.value); // Pass the query to the parent component
//   };

//   return (
//     <div className={`navbar ${darkMode ? "dark-mode" : ""}`}>
//       <div className="wrapper">
//         <div className="items">
//         <div className="icons">
//   <div className="icon-wrapper">
//     <FacebookIcon style={{ color: "blue" }} />
//   </div>
//   <div className="icon-wrapper">
//     <InstagramIcon style={{ color: "orangered" }} />
//   </div>
//   <div className="icon-wrapper">
//     <YouTubeIcon style={{ color: "red" }} />
//   </div>
//   <div className="icon-wrapper">
//     <TwitterIcon style={{ color: "blue" }} />
//   </div>
// </div>
//           <div className="item item-bright">
//             <Brightness4Icon className="icon" onClick={toggleDarkMode} />
//           </div>

//           <div className="profile">
//             <div className="item" onClick={toggleDropdown}>
//               <img
//                 src={
//                   profileImage ||
//                   (doctorData && doctorData.image_url) ||
//                   (patientData && patientData.image_url) ||
//                   avatar
//                 }
//                 alt="User Avatar"
//                 className="avatar"
//               />
//               <h4>{doctorData?.name || patientData?.name || "Admin"}</h4>
//             </div>

//             {dropdownOpen && (
//               <div className="dropdown-menu">
//                 <button onClick={handleProfile}>Profile</button>
//                 <button onClick={handleLogout}>Logout</button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NavBar;


import "./NavBar.scss";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import avatar from "../../assets/vinodPic.jpg";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from "../ThemeContext/ThemeContext";

const NavBar = ({ profileImage, onSearch }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const doctorData = JSON.parse(localStorage.getItem("doctorData"));
  const patientData = JSON.parse(localStorage.getItem("patientData"));
  const { darkMode, toggleDarkMode } = useTheme();

  const [welcomeText, setWelcomeText] = useState("");

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

  useEffect(() => {
    const fullText = "Welcome to Healthbridge";
    let index = 0;
  
    const interval = setInterval(() => {
      setWelcomeText((prev) => prev + fullText[index]);
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 150); // Adjust the speed if needed
  
    return () => clearInterval(interval);
  }, []);


  return (
    <div className={`navbar ${darkMode ? "dark-mode" : ""}`}>
      <div className="wrapper">
        <div className="items">
          {doctorData ? (
            <div className="icons">
              <div className="icon-wrapper">
                <FacebookIcon style={{ color: "blue" }} />
              </div>
              <div className="icon-wrapper">
                <InstagramIcon style={{ color: "orangered" }} />
              </div>
              <div className="icon-wrapper">
                <YouTubeIcon style={{ color: "red" }} />
              </div>
              <div className="icon-wrapper">
                <TwitterIcon style={{ color: "blue" }} />
              </div>
            </div>
          ) : (
            <div className="welcome-message">
              <h2>Welcome  to  Healthbridge</h2>
            </div>
          )}

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
              <h4>{doctorData?.name || patientData?.name || "Admin"}</h4>
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
