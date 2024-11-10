import React from 'react'
import "./DoctorsData.scss"

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctorcard">
      <table className="doctor-table">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{doctor.name}</td>
          </tr>
          <tr>
            <th>Designation</th>
            <td>{doctor.Designation}</td>
          </tr>
          <tr>
            <th>Info</th>
            <td>{doctor.info}</td>
          </tr>
          <tr>
            <th>Rating</th>
            <td className="rating">{doctor.rating}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DoctorCard;
