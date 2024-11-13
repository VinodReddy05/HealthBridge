import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './Pages/Authentication/Login/Login'
import PatientsData from './Pages/Accounts/Patients/PatientsData'
import SinglePatientData from './Pages/Accounts/Patients/PatientsComponents/PatientInfo/SinglePatientData/SinglePatientData'
import AddNewPatient from './Pages/Accounts/Patients/PatientsComponents/PatientInfo/AddNewPatient/AddNewPatient'
import PatientEdit from './Pages/Accounts/Patients/PatientsComponents/PatientInfo/PatientEdit/PatientEdit'
import DoctorsData from './Pages/Accounts/Doctors/DoctorsDashboard/DoctorsData/DoctorsData'
import AddDoctor from './Pages/Accounts/Doctors/DoctorsDashboard/DoctorsData/AddDoctor'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Signup from './Pages/Authentication/Signup/Signup'
import Admin from './Pages/Accounts/Admin/Admin'


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Admin/>} />
        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<Signup/>} />

        <Route path="patients" element={<PatientsData />} />
        <Route path="patients/:id" element={<SinglePatientData />} />
        <Route path="patients/new" element={<AddNewPatient />} />
        <Route path="/patients/edit/:id" element={<PatientEdit />} />
        <Route path="/Doctors" element={<DoctorsData/>} />
        <Route path="/Doctors/new" element={<AddDoctor/>} />


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


