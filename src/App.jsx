import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";

import NotFoundPage from "./utilies/NotFoundPage/NotFoundPage";
import "./App.css";

// Lazy load components
const Login = lazy(() => import("./Pages/Authentication/Login/Login"));
const PatientsData = lazy(() => import("./Pages/Accounts/Admin/AdminComponents/PatientDetails/PatientsData"));
const SinglePatientData = lazy(() => import("./Pages/Accounts/Patients/PatientsComponents/PatientInfo/SinglePatientData/SinglePatientData"));
const AddNewPatient = lazy(() => import("./Pages/Accounts/Admin/AdminComponents/PatientDetails/AddNewPatient/AddNewPatient"));
const PatientEdit = lazy(() => import("./Pages/Accounts/Admin/AdminComponents/PatientDetails/PatientEdit/PatientEdit"));
const Admin = lazy(() => import("./Pages/Accounts/Admin/Admin"));
const PatientDashboard = lazy(() => import("./Pages/Accounts/Patients/PatientsComponents/PatientDashboard/PatientDashboard"));
const DoctorsDashboard = lazy(() => import("./Pages/Accounts/Doctors/DoctorsComponents/DoctorsDashboard/DoctorsDashboard"));
const DoctorProfile = lazy(() => import("./Pages/Accounts/Doctors/DoctorsComponents/DoctorProfile/DoctorProfile"));
const DoctorsData = lazy(() => import("./Pages/Accounts/Admin/AdminComponents/Doctors/DoctorsData/DoctorsData"));
const AddDoctor = lazy(() => import("./Pages/Accounts/Admin/AdminComponents/Doctors/AddDoctor/AddDoctor"));
const SideBar = lazy(() => import("./Pages/Accounts/Admin/AdminComponents/SiderBar/SideBar"));
const DoctorsSidebar = lazy(() => import("./Pages/Accounts/Doctors/DoctorsComponents/DoctorsSidebar/DoctorsSidebar"));
const PatientSidebar = lazy(() => import("./Pages/Accounts/Patients/PatientsComponents/PatientSidebar/PatientSidebar"));
const MyPatients = lazy(() => import("./Pages/Accounts/Doctors/DoctorsComponents/MyPatients/MyPatients"));
const EditDoctors = lazy(() => import("./Pages/Accounts/Admin/AdminComponents/Doctors/EditDoctors/EditDoctors"));
const Appointments = lazy(() => import("./Pages/Accounts/Patients/PatientsComponents/Appointments/Appointments"));
const AppointmentSchedule = lazy(() => import("./Pages/Accounts/Patients/PatientsComponents/AppointmentSchedule/AppointmentSchedule"));
const MyAppointments = lazy(() => import("./Pages/Accounts/Doctors/DoctorsComponents/Appointments/MyAppointments"));
const Signup = lazy(() => import("./Pages/Authentication/Signup/Signup"));

function App() {
  return (
    <BrowserRouter>
      <RoutesWrapper />
    </BrowserRouter>
  );
}

function RoutesWrapper() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (!userRole && currentPath !== "/login" && currentPath !== "/signup") {
      navigate("/login");
    }
  }, [navigate, userRole]);

  return (
    <div className="app">
      {/* Role-based Sidebar */}
      {userRole === "admin" && <SideBar />}
      {userRole === "doctor" && <DoctorsSidebar />}
      {userRole === "patient" && <PatientSidebar />}

      <Suspense
        fallback={<img src="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif?cid=ecf05e47j974r0ov1tqnlso815ejqlynnjz9uss0kg284o1c&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="loading..." className="loading-image" />}
      >
        <Routes>
          {/* Common Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Routes */}
          {userRole === "admin" && (
            <>
              <Route path="/" element={<Admin />} />
              <Route path="/admin/patients" element={<PatientsData />} />
              <Route path="/patients/new" element={<AddNewPatient />} />
              <Route path="/patients/edit/:id" element={<PatientEdit />} />
              <Route path="/doctors/edit/:id" element={<EditDoctors />} />
              <Route path="/admin/doctors" element={<DoctorsData />} />
              <Route path="/doctors/new" element={<AddDoctor />} />
            </>
          )}

          {/* Doctor Routes */}
          {userRole === "doctor" && (
            <>
              <Route path="/doctor/dashboard" element={<DoctorsDashboard />} />
              <Route path="/doctor/:id" element={<DoctorProfile />} />
              <Route path="/doctor/mypatients" element={<MyPatients />} />
              <Route path="/doctor/appointment" element={<MyAppointments />} />
            </>
          )}

          {/* Patient Routes */}
          {userRole === "patient" && (
            <>
              <Route path="/" element={<PatientDashboard />} />
              <Route path="/patients" element={<PatientsData />} />
              <Route path="/patients/:id" element={<SinglePatientData />} />
              <Route path="/patient/appointment" element={<Appointments />} />
              <Route path="/patient/appointmentschedule" element={<AppointmentSchedule />} />
            </>
          )}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
