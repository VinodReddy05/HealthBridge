// import "./SideBar.scss";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Dashboard as DashboardIcon,
//   Accessible as AccessibleIcon,
//   PersonSharp as PersonSharpIcon,
//   ChecklistRtl as ChecklistRtlIcon,
//   AccessTime as AccessTimeIcon,
//   Logout as LogoutIcon,
// } from "@mui/icons-material";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const SideBar = ({ role, userData }) => {
//   const navigate = useNavigate();
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const handleNavigation = (route, index) => {
//     setSelectedItem(index);
//     navigate(route);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     toast.success("Successfully logged out");
//     setTimeout(() => {
//       navigate("/login");
//     }, 1500);
//   };

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   const menuItems = {
//     admin: [
//       { label: "Dashboard", icon: <DashboardIcon />, route: "/admin", index: 1 },
//       { label: "Patients", icon: <AccessibleIcon />, route: "/admin/patients", index: 2 },
//       { label: "Doctors", icon: <PersonSharpIcon />, route: "/admin/doctors", index: 3 },
//     ],
//     doctor: [
//       { label: "Dashboard", icon: <DashboardIcon />, route: "/doctor/dashboard", index: 1 },
//       { label: "My Details", icon: <AccessibleIcon />, route: `/doctor/${userData?.id}`, index: 2 },
//       { label: "My Patients", icon: <AccessibleIcon />, route: "/doctor/mypatients", index: 3 },
//       { label: "Appointments", icon: <ChecklistRtlIcon />, route: "/doctor/appointment", index: 4 },
//     ],
//     patient: [
//       { label: "Dashboard", icon: <DashboardIcon />, route: "/patients/dashboard", index: 1 },
//       { label: "My Details", icon: <AccessibleIcon />, route: `/patients/${userData?.id}`, index: 2 },
//       { label: "Find My Doctors", icon: <ChecklistRtlIcon />, route: "/patient/appointment", index: 3 },
//       { label: "Appointments", icon: <AccessTimeIcon />, route: "/patient/appointmentschedule", index: 4 },
//     ],
//   };

//   const items = menuItems[role] || [];

//   return (
//     <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
//       <div className="top">
//         <span className="hamburger" onClick={toggleSidebar}>☰</span>
//         {!isCollapsed && <span className="logo">HealthBridge</span>}
//       </div>
//       <div className="center">
//         <ul>
//           {items.map(({ label, icon, route, index }) => (
//             <li
//               key={index}
//               className={selectedItem === index ? "active" : ""}
//               onClick={() => handleNavigation(route, index)}
//             >
//               {icon}
//               <span>{label}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="bottom" onClick={handleLogout}>
//         <button className="logout22">
//           <LogoutIcon className="logouticon" />
//           {!isCollapsed && "Logout"}
//         </button>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };


// export default SideBar;
