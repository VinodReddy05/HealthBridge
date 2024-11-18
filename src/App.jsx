// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./Pages/Authentication/Login/Login";
// import PatientsData from "./Pages/Accounts/Admin/AdminComponents/PatientDetails/PatientsData";
// import SinglePatientData from "./Pages/Accounts/Patients/PatientsComponents/PatientInfo/SinglePatientData/SinglePatientData";
// import AddNewPatient from "./Pages/Accounts/Admin/AdminComponents/PatientDetails/AddNewPatient/AddNewPatient";
// import PatientEdit from "./Pages/Accounts/Admin/AdminComponents/PatientDetails/PatientEdit/PatientEdit";
// // import AddDoctor from "./Pages/Accounts/Admin/AdminComponents/Doctors/AddDoctor/AddDoctor";
// import Admin from "./Pages/Accounts/Admin/Admin";
// import "./App.css";

// import PatientDashboard from "./Pages/Accounts/Patients/PatientsComponents/PatientDashboard/PatientDashboard";
// import DoctorsDashboard from "./Pages/Accounts/Doctors/DoctorsComponents/DoctorsDashboard/DoctorsDashboard";
// import DoctorProfile from "./Pages/Accounts/Doctors/DoctorsComponents/DoctorProfile/DoctorProfile";
// import DoctorsData from "./Pages/Accounts/Admin/AdminComponents/Doctors/DoctorsData/DoctorsData";
// import AddDoctor from "./Pages/Accounts/Admin/AdminComponents/Doctors/AddDoctor/AddDoctor";

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Admin />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/patients" element={<PatientsData />} />
//           <Route path="/patients/new" element={<AddNewPatient />} />
//           <Route path="/patients/edit/:id" element={<PatientEdit />} />

//           {/* Doctors Routes */}
//           <Route path="/doctors" element={<DoctorsData/>}/>
//           <Route path="/doctors/new" element={<AddDoctor/>}/>
//           <Route path="/doctors/:id" element={<DoctorProfile/>} />
//           <Route path="/doctor/dashboard" element={<DoctorsDashboard />} />

//           {/* Patient Dashboard & Patient */}
//           <Route path="/patients/dashboard" element={<PatientDashboard />} />
//           <Route path="/patients/:id" element={<SinglePatientData />} />
         
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react"; // Import useEffect hook for handling side effects
import Login from "./Pages/Authentication/Login/Login";
import PatientsData from "./Pages/Accounts/Admin/AdminComponents/PatientDetails/PatientsData";
import SinglePatientData from "./Pages/Accounts/Patients/PatientsComponents/PatientInfo/SinglePatientData/SinglePatientData";
import AddNewPatient from "./Pages/Accounts/Admin/AdminComponents/PatientDetails/AddNewPatient/AddNewPatient";
import PatientEdit from "./Pages/Accounts/Admin/AdminComponents/PatientDetails/PatientEdit/PatientEdit";
import Admin from "./Pages/Accounts/Admin/Admin";
import PatientDashboard from "./Pages/Accounts/Patients/PatientsComponents/PatientDashboard/PatientDashboard";
import DoctorsDashboard from "./Pages/Accounts/Doctors/DoctorsComponents/DoctorsDashboard/DoctorsDashboard";
import DoctorProfile from "./Pages/Accounts/Doctors/DoctorsComponents/DoctorProfile/DoctorProfile";
import DoctorsData from "./Pages/Accounts/Admin/AdminComponents/Doctors/DoctorsData/DoctorsData";
import AddDoctor from "./Pages/Accounts/Admin/AdminComponents/Doctors/AddDoctor/AddDoctor";
import SideBar from "./Pages/Accounts/Admin/AdminComponents/SiderBar/SideBar";
import DoctorsSidebar from "./Pages/Accounts/Doctors/DoctorsComponents/DoctorsSidebar/DoctorsSidebar";
import NotFoundPage from "./utilies/NotFoundPage/NotFoundPage";
import "./App.css";
import PatientSidebar from "./Pages/Accounts/Patients/PatientsComponents/PatientSidebar/PatientSidebar";

function App() {
  return (
    <BrowserRouter>
      <RoutesWrapper />
    </BrowserRouter>
  );
}

function RoutesWrapper() {
  const navigate = useNavigate();  // Now useNavigate inside the Router context
  const userRole = localStorage.getItem("userRole"); // 'admin' or 'doctor'

  // Check if the user is logged in and redirect if necessary
  useEffect(() => {
    if (!userRole) {
      navigate('/login');
    }
  }, [navigate, userRole]);  // Depend on navigate and userRole to handle changes

  return (
    <>
      {/* Role-based Sidebar */}
      {userRole === "admin" && <SideBar />}
      {userRole === "doctor" && <DoctorsSidebar />}
      {userRole === 'patient' && <PatientSidebar/>}

      <Routes>
        {/* Common Routes */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        {userRole === "admin" && (
          <>
            <Route path="/" element={<Admin />} />
            <Route path="/admin/patients" element={<PatientsData />} />
            <Route path="/patients/new" element={<AddNewPatient />} />
            <Route path="/patients/edit/:id" element={<PatientEdit />} />
            <Route path="/admin/doctors" element={<DoctorsData />} />
            <Route path="/doctors/new" element={<AddDoctor />} />
          </>
        )}

        {/* Doctor Routes */}
        {userRole === "doctor" && (
          <>
            <Route path="/doctor/dashboard" element={<DoctorsDashboard />} />
            <Route path="/doctor/details" element={<DoctorProfile />} />
           
          </>
        )}

        {/* Patient Routes */}
        {userRole === "patient" && (
        <>
        <Route path="/patients/dashboard" element={<PatientDashboard />} />
        <Route path="/patients" element={<PatientsData />} />
        <Route path="/patients/:id" element={<SinglePatientData />} />
        </>
       )}

        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
