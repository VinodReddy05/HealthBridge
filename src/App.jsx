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
//           <Route path="/admin" element={<Admin />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/patients" element={<PatientsData />} />
//           <Route path="/patients/new" element={<AddNewPatient />} />
//           <Route path="/patients/edit/:id" element={<PatientEdit />} />

//           {/* Doctors Routes */}
//           <Route path="/doctors" element={<DoctorsData/>}/>
//           <Route path="/doctors/new" element={<AddDoctor/>}/>
//           <Route path="/doctors/:id" element={<DoctorProfile/>} />
//           <Route path="/doctors/dashboard" element={<DoctorsDashboard />} />

//           {/* Patient Dashboard & Patient */}
//           <Route path="/patients/dashboard" element={<PatientDashboard />} />
//           <Route path="/patients/:id" element={<SinglePatientData />} />
         
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;




// import React, { Suspense, lazy } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import "./App.css";

// // Lazy load components
// const Login = lazy(() => import("./Pages/Authentication/Login/Login"));
// const Admin = lazy(() => import("./Pages/Accounts/Admin/Admin"));
// const PatientsData = lazy(() => import("./Pages/Accounts/Admin/AdminComponents/PatientDetails/PatientsData"));
// const SinglePatientData = lazy(() => import("./Pages/Accounts/Patients/PatientsComponents/PatientInfo/SinglePatientData/SinglePatientData"));
// const AddNewPatient = lazy(() => import("./Pages/Accounts/Admin/AdminComponents/PatientDetails/AddNewPatient/AddNewPatient"));
// const PatientEdit = lazy(() => import("./Pages/Accounts/Admin/AdminComponents/PatientDetails/PatientEdit/PatientEdit"));
// const PatientDashboard = lazy(() => import("./Pages/Accounts/Patients/PatientsComponents/PatientDashboard/PatientDashboard"));
// const DoctorsData = lazy(() => import("./Pages/Accounts/Admin/AdminComponents/Doctors/DoctorsData/DoctorsData"));
// const AddDoctor = lazy(() => import("./Pages/Accounts/Admin/AdminComponents/Doctors/AddDoctor/AddDoctor"));
// const DoctorProfile = lazy(() => import("./Pages/Accounts/Doctors/DoctorsComponents/DoctorProfile/DoctorProfile"));
// const DoctorsDashboard = lazy(() => import("./Pages/Accounts/Doctors/DoctorsComponents/DoctorsDashboard/DoctorsDashboard"));

// const App = () => {
//   const PrivateRoute = ({ element: Component }) => {
//     const token = localStorage.getItem("token");
//     return token ? <Component /> : <Navigate to="/login" />;
//   };

//   return (
//     <BrowserRouter>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/login" element={<Login />} />
          
//           {/* Redirect root to login */}
//           <Route path="/" element={<Navigate to="/login" />} />

//           {/* Admin Routes */}
//           <Route path="/admin" element={<PrivateRoute element={Admin} />} />
//           <Route path="/patients" element={<PrivateRoute element={PatientsData} />} />
//           <Route path="/patients/new" element={<PrivateRoute element={AddNewPatient} />} />
//           <Route path="/patients/edit/:id" element={<PrivateRoute element={PatientEdit} />} />

//           {/* Doctors Routes */}
//           <Route path="/doctors" element={<PrivateRoute element={DoctorsData} />} />
//           <Route path="/doctors/new" element={<PrivateRoute element={AddDoctor} />} />
//           <Route path="/doctors/:id" element={<PrivateRoute element={DoctorProfile} />} />
//           <Route path="/doctors/dashboard" element={<PrivateRoute element={DoctorsDashboard} />} />

//           {/* Patient Dashboard */}
//           <Route path="/patients/dashboard" element={<PrivateRoute element={PatientDashboard} />} />
//           <Route path="/patients/:id" element={<PrivateRoute element={SinglePatientData} />} />
//         </Routes>
//       </Suspense>
//     </BrowserRouter>
//   );
// };

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
import MyPatients from "./Pages/Accounts/Doctors/DoctorsComponents/MyPatients/MyPatients";
import EditDoctors from "./Pages/Accounts/Admin/AdminComponents/Doctors/EditDoctors/EditDoctors";
import Appointments from "./Pages/Accounts/Patients/PatientsComponents/Appointments/Appointments";
// import DoctorHome from "./Pages/Accounts/Doctors/DoctorsComponents/DoctorHome/DoctorHome";
// import Doctors from "./Pages/Accounts/Doctors/Doctors";

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
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/patients" element={<PatientsData />} />
            <Route path="/patients/new" element={<AddNewPatient />} />
            <Route path="/patients/edit/:id" element={<PatientEdit />} />
            <Route path="/doctors/edit/:id" element={<EditDoctors/>} />
            <Route path="/admin/doctors" element={<DoctorsData />} />
            <Route path="/doctors/new" element={<AddDoctor />} />
          </>
        )}

        {/* Doctor Routes */}
        {userRole === "doctor" && (
          <>
            <Route path="/doctor/dashboard" element={<DoctorsDashboard/>}/>
            <Route path="/doctor/:doctorId" element={<DoctorProfile />} />
            <Route path="/doctor/mypatients" element={<MyPatients/>} />
           
          </>
        )}

        {/* Patient Routes */}
        {userRole === "patient" && (
        <>
        <Route path="/patients/dashboard" element={<PatientDashboard />} />
        <Route path="/patients" element={<PatientsData />} />
        <Route path="/patients/:id" element={<SinglePatientData />} />
        <Route path="/patient/appointment" element={<Appointments/>} />
        </>
       )}

        {/* 404 Not Found Route */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </>
  );
}

export default App;


