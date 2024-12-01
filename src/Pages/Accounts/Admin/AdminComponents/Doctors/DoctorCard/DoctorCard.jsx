import React, { useEffect } from "react";
import NavBar from "../../../../../../Components/NavBar/NavBar";
import SideBar from "../../SiderBar/SideBar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../../../../utilies/SupaBase"; // Ensure correct import
import "./Doctorcard.scss";

const Doctorcard = ({ doctor }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this doctor?");
    if (confirmDelete) {
      try {
        const { error } = await supabase
          .from("DoctorsData") 
          .delete()
          .eq("id", id);

        if (error) {
          alert("Error deleting doctor: " + error.message);
        } else {
          alert("Doctor deleted successfully!");
          navigate("/admin/doctors"); // Redirect to the doctors list after delete
        }
      } catch (error) {
        console.error("Error deleting doctor:", error);
        alert("An error occurred while deleting the doctor.");
      }
    }
  };

  // useEffect(() => {
  //   fetchDoctors();
  // }, []);

  return (
    <>
      <NavBar  />
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
            <p className="doctor-rating">Degree: {doctor.Degree}</p>
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
