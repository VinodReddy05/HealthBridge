import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import Login from './Authentication/Login/Login'
import PatientsData from './Pages/PatientsData/PatientsData'
import SinglePatientData from './Pages/PatientsData/PatientComponent/SinglePatientData/SinglePatientData'
import AddNewPatient from './Pages/AddNewPatient/AddNewPatient'
import PatientEdit from './Pages/PatientsData/PatientComponent/PatientEdit/PatientEdit'
import DoctorsData from './Pages/DoctorsData/DoctorsData/DoctorsData'
import AddDoctor from './Pages/DoctorsData/DoctorsData/AddDoctor'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Signup from './Authentication/Signup/Signup'
import DoctorsHomePage from './Pages/DoctorsData/DoctocDashBoard/DoctorsHomePage/DoctorsHomePage'


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup/>} />

        <Route path="patients" element={<PatientsData />} />
        <Route path="patients/:id" element={<SinglePatientData />} />
        <Route path="patients/new" element={<AddNewPatient />} />
        <Route path="/patients/edit/:id" element={<PatientEdit />} />
        <Route path="/Doctors" element={<DoctorsData/>} />
        <Route path="/Doctors/new" element={<AddDoctor/>} />
        <Route path="/DoctorsDashaboard" element={<DoctorsHomePage/>} />


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


