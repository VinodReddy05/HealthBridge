import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import Login from './Authentication/Login/Login'
import PatientsData from './Pages/PatientsData/PatientsData'
import SinglePatientData from './Pages/SinglePatientData/SinglePatientData'
import AddNewPatient from './Pages/AddNewPatient/AddNewPatient'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="patients" element={<PatientsData />} />
        <Route path="patients/:id" element={<SinglePatientData />} />
        <Route path="patients/new" element={<AddNewPatient />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


