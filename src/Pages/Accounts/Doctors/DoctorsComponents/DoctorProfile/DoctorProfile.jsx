import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../../../utilies/SupaBase";
import "./DoctorProfile.scss";
import NavBar from "../../../../../Components/NavBar/NavBar";
import DoctorSidebar from "../DoctorsSidebar/DoctorsSidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from '@mui/icons-material/Edit';

const DoctorProfile = () => {
  const { id } = useParams();
  console.log(id);

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [address, setAddress] = useState("");
  const [degree, setDegree] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [activeProject, setActiveProject] = useState(0);
  const [sectionData, setSectionData] = useState(null);

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data, error } = await supabase
          .from("DoctorsData")
          .select()
          .eq("id", id)
          .single();

        if (error) throw new Error("Error fetching doctor data");

        setDoctor(data);
        setPreviewImage(data.image_url);
        setProfileImage(data.image_url);
        setAddress(data.address || "");
        setDegree(data.Degree || "");
        
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file selected.");
      return;
    }
  
    const fileName = `doctor_${id}_${file.name.replace(/\s+/g, "_")}`;
  
    try {
      const { error: uploadError } = await supabase.storage
        .from("Doctors-profile-pic")
        .upload(fileName, file, { upsert: true });  
  
      if (uploadError) {
        throw uploadError;  
      }
  
      const { data: urlData, error: urlError } = supabase.storage
        .from("Doctors-profile-pic")
        .getPublicUrl(fileName);
  
      if (urlError) {
        throw urlError; 
      }
  
      const newImageUrl = urlData.publicUrl;
  
      const { error: updateError } = await supabase
        .from("DoctorsData")
        .update({ image_url: newImageUrl })
        .eq("id", id);
  
      if (updateError) {
        throw updateError; 
      }
  
       
      setPreviewImage(newImageUrl);
      setProfileImage(newImageUrl); 
  
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error handling image change:", error.message);
      toast.error(`Failed to update profile picture: ${error.message}`);
    }
  };
  

  const handleSaveDetails = async () => {
 
    const hasChanges =
      address !== doctor?.address ||
      degree !== doctor?.Degree ||
      previewImage !== doctor?.image_url;  
  
    if (!hasChanges) {
      toast.info("No changes detected.");
      return;
    }
  
    setLoading(true);  
  
    try {
      const { data, error: updateError } = await supabase
        .from("DoctorsData")
        .update({
          address,
          Degree: degree,  
          image_url: previewImage,  
        })
        .eq("id", id);
  
      if (updateError) {
        throw updateError;  
      }
  
      setDoctor((prevDoctor) => ({
        ...prevDoctor,
        address,
        Degree: degree,
        image_url: previewImage,
      }));
      toast.success("Details updated successfully!");
      setIsEditing(false); 
    } catch (error) {
      console.error("Error updating details:", error.message);
      toast.error(`Failed to update details: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  
  const fetchSectionData = async (sectionIndex) => {
    let sectionField;
    if (sectionIndex === 0) sectionField = "info";
    if (sectionIndex === 1) sectionField = "DoctorAwards";
    if (sectionIndex === 2) sectionField = "Research";

    try {
      const { data, error } = await supabase
        .from("DoctorsData")
        .select(sectionField)
        .eq("id", id)
        .single();

      if (error) throw error;
      setSectionData(data[sectionField]);
    } catch (err) {
      console.error("Error fetching section data:", err.message);
      setSectionData(null);
    }
  };

  const toggleProjectDetail = (index) => {
    setActiveProject(index);
    fetchSectionData(index);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <>
      <NavBar profileImage={profileImage} />
      <DoctorSidebar id={id} />
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
          <button onClick={() => setIsEditing(true)}><EditIcon/></button>
        </div>

        <div className="info">
          <div className="info-buttons">
            {["Overview", "Doctors Awards", "Research"].map(
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

          <div className="info-content">
            {sectionData ? (
              Array.isArray(sectionData) ? (
                <ul>
                  {sectionData.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <div>{sectionData}</div>
              )
            ) : (
              <p>Select a section to view details.</p>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>

      {isEditing && (
  <div className={`popform ${isEditing ? 'show' : ''}`}>
    <div className="popform-content">
      <div className="popform-header">
        <h3>Edit Doctor Details</h3>
        <button onClick={() => setIsEditing(false)}>Close</button>
      </div>
      <div className="popform-body">
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
      </div>
      <div className="popform-footer">
        <button onClick={handleSaveDetails}>Save</button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default DoctorProfile;
