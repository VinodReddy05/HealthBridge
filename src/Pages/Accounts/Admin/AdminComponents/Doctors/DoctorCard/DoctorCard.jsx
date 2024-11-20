import React from "react";
import NavBar from "../../../../../../Components/NavBar/NavBar";
import SideBar from "../../SiderBar/SideBar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import "./Doctorcard.scss";

const Doctorcard = ({ doctor }) => {
  const handleDelete = (id) => {
    console.log(`Deleting doctor with id: ${id}`);
  };

  return (
    <>
      <NavBar />
      <SideBar />
      <div className="doctorcard-container">
        <div className="doctorcard">
          <img
            src={doctor.image_url}
            alt={doctor.name}
            className="doctor-image"
          />
          <div className="doctor-details">
            <h3 className="doctor-name">{doctor.name}</h3>
            <p className="doctor-info">{doctor.info}</p>
            <p className="doctor-designation">{doctor.designation}</p>
            <p className="doctor-rating">Rating: {doctor.rating}</p>
            <div className="doctor-actions">
              <Link to={`/doctors/edit/${doctor.id}`}>
                <EditIcon className="action-icon edit-icon" />
              </Link>
              <DeleteIcon
                className="action-icon delete-icon"
                onClick={() => handleDelete(doctor.id)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctorcard;
