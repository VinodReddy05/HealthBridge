import React from 'react'

import Charts from './DoctorsComponents/DoctorsDashboard/charts/Charts'
import Widget from './DoctorsComponents/DoctorsDashboard/widgets/Widget'
import './Doctors.scss'
import NavBar from '../../../Components/NavBar/NavBar'
import Footer from '../../../Components/Footer/Footer'
const Doctors = ({doctorsId}) => {
  return (
    <div>
      <NavBar/>
      <DoctorsSidebar doctors={doctorsId}/>
      <Widget/>
     
    </div>
  )
}

export default Doctors