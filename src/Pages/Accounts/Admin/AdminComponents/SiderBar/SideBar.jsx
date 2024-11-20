import "./SideBar.scss";
import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessibleIcon from "@mui/icons-material/Accessible";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SideBar = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showGif, setShowGif] = useState(false);
  const [blur, setBlur] = useState(false);
  const [gifMessage, setGifMessage] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleClick = (route, index) => {
    setSelectedItem(index);
    navigate(route);
    setLoading(true);
    setBlur(true);
  };

  const handleLogout = () => {
    setGifMessage("You have logged out!");
    setShowGif(true)
    localStorage.clear();
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="sidebar">
      {loading || blur ? <div className="blur-background"></div> : null}
      {showGif && (
        <div className="gif-container">
          <img
            src="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif?cid=ecf05e47l2mubft6j3ziu9t1qbgvfkfngodcfrx0efthlwlz&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="Loading..."
          />
          <p>{gifMessage}</p>
        </div>
      )}
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
            <span onClick={() => handleClick("/admin/patients", 2)}>
              Patients
            </span>
          </li>
          <li className={selectedItem === 3 ? "green" : ""}>
            <PersonSharpIcon />
            <span onClick={() => handleClick("/admin/doctors", 3)}>
              Doctors
            </span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <button className={`logout ${showGif ? "hidden" : ""}   `}onClick={handleLogout}>
          <LogoutIcon className="logouticon" />
          Logout
        </button>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default SideBar;
