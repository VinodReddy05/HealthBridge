import React from 'react'
import NavBar from '../../../../../Components/NavBar/NavBar'
import DoctorsSidebar from '../DoctorsSidebar/DoctorsSidebar'
import './DoctorsDashboard.scss'
import { useParams } from 'react-router-dom'

const DoctorsDashboard = () => {
 
  const {doctorsId} = useParams()

  return (
    <div>
        <NavBar/>
        <DoctorsSidebar doctors={doctorsId}/>

        <div className="doctordashboard">
            <h1>doctos</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum doloribus omnis incidunt veniam nam non ab quam voluptates unde quos saepe quae, voluptatem libero soluta! Provident accusamus quam nihil praesentium!</p>
        </div>
    </div>
  )
}

export default DoctorsDashboard