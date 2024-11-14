import React from 'react';
import NavBar from '../../../../../../Components/NavBar/NavBar';
import DoctorsSidebar from '../../../../Doctors/DoctorsComponents/DoctorsSidebar/DoctorsSidebar';


const DoctorCard = ({ doctor }) => {
   return (
      <>
     <NavBar/>
     <DoctorsSidebar/>
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
               <tr>
                  <th>Image</th>
                  <td>
                     {doctor.image_url && (
                        <img
                           src={doctor.image_url} // Display only the uploaded image
                           alt="Doctor"
                           className="doctor-image"
                        />
                     )}
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
      </>
   
   );
};

export default DoctorCard;
