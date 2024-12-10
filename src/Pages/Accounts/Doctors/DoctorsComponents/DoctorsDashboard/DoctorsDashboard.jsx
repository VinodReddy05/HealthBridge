import React from 'react'
import NavBar from '../../../../../Components/NavBar/NavBar'
import DoctorsSidebar from '../DoctorsSidebar/DoctorsSidebar'
import './DoctorsDashboard.scss'
import { useParams } from 'react-router-dom'
import Widget from './widgets/Widget'
import Charts from '../DoctorsDashboard/charts/Charts'
import DoctorProfile from '../DoctorProfile/DoctorProfile'
import { PieChart } from '@mui/icons-material'
import Footer from '../../../../../Components/Footer/Footer'


const DoctorsDashboard = () => {
 

 
  const {doctorsId} = useParams()

  return (
    <div className="container">
    <NavBar/>
    <div className="main-content">
        <div className='doctordashboard'>
        </div> 
        <div className="homeinfo"> 
            <Widget/> 
            <Charts/>
        </div>
       
        
       
    </div>
     <Footer/>
</div>
  )
}

export default DoctorsDashboard