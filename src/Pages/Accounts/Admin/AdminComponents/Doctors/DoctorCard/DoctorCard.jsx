import React from "react";
import NavBar from "../../../../../../Components/NavBar/NavBar";
import DoctorsSidebar from "../../../../Doctors/DoctorsComponents/DoctorsSidebar/DoctorsSidebar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import './Doctorcard.scss'

const Doctorcard = ({ doctor }) => {
  const handleDelete = (id) => {
    // Add your delete logic here
    console.log(`Deleting doctor with id: ${id}`);
  };

  return (
    <>
      <NavBar />
      <DoctorsSidebar />
      <div className="doctorcard">
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Info</th>
              <th>Designation</th>
              <th>Rating</th>
              <th>Image</th>
              <th></th> 
              <th></th> 
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{doctor.name}</td>
              <td>{doctor.info}</td>
              <td>{doctor.designation}</td>
              <td>{doctor.rating}</td>
              <td>
                <img
                  src={doctor.image_url}
                  alt={doctor.name}
                  className="doctor-image"
                />
              </td>
              <td className="icon">
                <Link to={`/doctors/edit/${doctor.id}`}>
                  <EditIcon />
                </Link>
              </td>
              <td className="icon" onClick={() => handleDelete(doctor.id)}>
                <DeleteIcon />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Doctorcard;
