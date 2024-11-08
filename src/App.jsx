import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import PatientsData from './Pages/PatientsData/PatientsData'
import SinglePatientData from './Pages/SinglePatientData/SinglePatientData'
import AddNewPatient from './Pages/AddNewPatient/AddNewPatient'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Home/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='patients'>
            <Route index element={<PatientsData/>}/>
            <Route path=':patientId' element={<SinglePatientData/>}/>
            <Route path='new' element={<AddNewPatient/>}/>
          </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


