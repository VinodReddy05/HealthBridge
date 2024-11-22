import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../../../../utilies/SupaBase";
import "./SinglePatientData.scss";
import NavBar from "../../../../../../Components/NavBar/NavBar";
import PatientSidebar from "../../PatientSidebar/PatientSidebar";

const SinglePatientData = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patientId = Number(id);
        if (isNaN(patientId)) {
          setError("Invalid patient ID");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("patientsdata")
          .select()
          .eq("id", patientId)
          .single();

        if (error) {
          setError("Could not fetch patient data");
        } else {
          setPatient(data);
          setPreviewImage(data.image_url);
          setAddress(data.address || "");
          setPhoneNumber(data.phone_number || "");
          setEmail(data.email_id || "");
        }
      } catch (error) {
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = `patient_${id}_${file.name.replace(/\s+/g, "_")}`;
      const { data, error: uploadError } = await supabase.storage
        .from("Doctors-profile-pic")
        .upload(fileName, file);

      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from("Doctors-profile-pic")
          .getPublicUrl(fileName);
        setPreviewImage(urlData.publicUrl);
      }
    }
  };

  const handleSaveDetails = async () => {
    const patientId = Number(id);
    try {
      const { error: updateError } = await supabase
        .from("patientsdata")
        .update({
          address,
          phone_number: phoneNumber,
          email_id: email,
          image_url: previewImage,
        })
        .eq("id", patientId);

      if (!updateError) {
        setIsEditing(false);
        alert("Details updated successfully!");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <>
      <NavBar />
      <PatientSidebar patientId={id} />
      <div className="single-patient-container">
        <div className="patient-card">
          <div className="profile-header">
            {previewImage && <img src={previewImage} alt="Patient" />}
            <div className="profile-details">
              <h2>{patient?.name || "Patient Name"}</h2>
              <p>Consultation Number: {patient?.consultation_number}</p>
              <p>Check-in Date: {patient?.joining_date}</p>
              <p>Gender: {patient?.Gender}</p>
              <p>Disease: {patient?.disease}</p>
              <p>Doctor: {patient?.doctor_name}</p>
            </div>
          </div>
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit"}
          </button>
          {isEditing && (
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
                <label>Phone Number:</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="editable-field">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
          )}
        </div>
      </div>
    </>
  );
};

export default SinglePatientData;
