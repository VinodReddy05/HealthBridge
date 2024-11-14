import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Authentication/Login/Login";
import PatientsData from "./Pages/Accounts/Admin/AdminComponents/PatientDetails/PatientsData";
import SinglePatientData from "./Pages/Accounts/Patients/PatientsComponents/PatientInfo/SinglePatientData/SinglePatientData";
import AddNewPatient from "./Pages/Accounts/Admin/AdminComponents/PatientDetails/AddNewPatient/AddNewPatient";
import PatientEdit from "./Pages/Accounts/Admin/AdminComponents/PatientDetails/PatientEdit/PatientEdit";
import DoctorsData from "./Pages/Accounts/Admin/AdminComponents/Doctors/DoctorsData/DoctorsData";
import AddDoctor from "./Pages/Accounts/Admin/AdminComponents/Doctors/DoctorsData/AddDoctor";
import Signup from "./Pages/Authentication/Signup/Signup";
import Admin from "./Pages/Accounts/Admin/Admin";
import "./App.css";
import Patient from "./Pages/Accounts/Patients/Patient";
import PatientDashboard from "./Pages/Accounts/Patients/PatientsComponents/PatientDashboard/PatientDashboard";
import DoctorsDashboard from "./Pages/Accounts/Doctors/DoctorsComponents/DoctorsDashboard/DoctorsDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/patients" element={<PatientsData />} />
          <Route path="/patients/new" element={<AddNewPatient />} />
          <Route path="/patients/edit/:id" element={<PatientEdit />} />

          {/* Doctors Routes */}
          <Route path="/doctors" element={<DoctorsData />} />
          <Route path="/doctors/new" element={<AddDoctor />} />
          <Route path="/doctors/dashboard" element={<DoctorsDashboard />} />

          {/* Patient Dashboard & Patient */}
          <Route path="/patients/dashboard" element={<PatientDashboard />} />
          <Route path="/patients/:id" element={<SinglePatientData />} />
         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
