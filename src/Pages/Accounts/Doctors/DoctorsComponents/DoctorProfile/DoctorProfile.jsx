import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../../../utilies/SupaBase";
import "./DoctorProfile.scss";
import NavBar from "../../../../../Components/NavBar/NavBar";
import DoctorSidebar from "../DoctorsSidebar/DoctorsSidebar";
import { motion } from "framer-motion";
// import SchoolIcon from '@mui/icons-material/School';
// import AddLocationIcon from '@mui/icons-material/AddLocation';
// import EmailIcon from '@mui/icons-material/Email';
// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const DoctorProfile = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [address, setAddress] = useState("");
  const [degree, setDegree] = useState("");
  const [email, setEmail] = useState("");
  const [activeProject, setActiveProject] = useState(0); // Default to the first section
  const [isEditing, setIsEditing] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState([]); // Ensure doctorInfo is an array

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data, error } = await supabase
          .from("DoctorsData")
          .select()
          .eq("id", doctorId)
          .single();

        if (error) throw new Error("Error fetching doctor data");

        console.log("Fetched doctor data:", data);
        console.log("Doctor info:", data.info);

        setDoctor(data);
        setPreviewImage(data.image_url);
        setAddress(data.address || "");
        setDegree(data.phone_number || "");
        setEmail(data.email || "");

        // Convert `info` to an array if it's a string
        setDoctorInfo(
          Array.isArray(data.info) ? data.info : [{ info: data.info }]
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  // const toggleProjectDetail = (index) => {
  //   setActiveProject(index);
  // };
  const toggleProjectDetail = (index, active) => {
    setActiveProject(activeProject === index ? active : index);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <>
      <NavBar />
      <DoctorSidebar doctorId={doctorId} />
      <div className="single-doctor-data">
        <div className="profile-header">
          {previewImage && <img src={previewImage} alt="Doctor" />}
          <div className="profile-details">
            <h2>{doctor?.name || "Doctor Name"}</h2>
            <p>{doctor?.Designation || "Specialization"}</p>
            <p>{doctor?.Degree || "Degree"}</p>
            <p>{doctor?.address || "Address"}</p>
            <p>{doctor?.Language || "Language"}</p>
          </div>
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
        {isEditing ? (
          <div className="edit-section">
            <div className="editable-field">
              <label>Address:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="editable-field">
              <label>Degree:</label>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
              />
            </div>
            <div className="editable-field">
              <label>Profile Picture:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="actions">
              <button onClick={handleSaveDetails}>Save Details</button>
            </div>
          </div>
        ) : (
          <div className="info">
            {/* Section Buttons */}
            <div className="info-buttons">
              {["Overview"].map(
                (section, index) => (
                  <button
                    key={index}
                    className={activeProject === index ? "active1" : ""}
                    onClick={() => toggleProjectDetail(index)}
                  >
                    {section}
                  </button>
                )
              )}
            </div>

            {/* Section Content */}
            <div className="info-content">
              {Array.isArray(doctorInfo) ? (
                doctorInfo.length > 0 ? (
                  <motion.div
                    key={activeProject}
                    className="project-detail"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p>
                      {doctorInfo[activeProject]?.info || "No Info Available"}
                   </p>
                  </motion.div>
                ) : (
                  <p>No information available.</p>
                )
              ) : (
                <motion.div
                  key="info"
                  className="project-detail"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1>{doctorInfo || "No Info Available"}</h1>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DoctorProfile;
