import React from 'react'
import "./DoctorsData.scss"
import PatientInfo from '../PatientInfo/PatientInfo'

const DoctorCard = ({doctor}) => {

  return (
    <div className="doctorcard">
      <div className='doctor-Card'>
      <h3>{doctor.name}</h3>
      <p>{doctor.Designation}</p>
        {doctor.info}
      <div className="rating">
        {doctor.rating}
      </div>
    </div>

    {/* <div className="table">
      <PatientInfo/>
    </div> */}
    </div>
  )
}

export default DoctorCard
