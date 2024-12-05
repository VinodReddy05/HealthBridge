import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../../../../utilies/SupaBase";
import "./SinglePatientData.scss";
import NavBar from "../../../../../../Components/NavBar/NavBar";
import PatientSidebar from "../../PatientSidebar/PatientSidebar";
import printJS from "print-js";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const SinglePatientData = () => {
  const { id } = useParams();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [address, setAddress] = useState("");
  const [prescription, setPrescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [profileImage, setProfileImage] = useState(null); // For NavBar image
  const [visited, setVisited] = useState(false); // New state for visited flag

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
          setProfileImage(data.image_url);
          setAddress(data.address || "");
          setPrescription(data.prescription || "");
          setVisited(data.visited || false); // Set visited flag
        }
      } catch (error) {
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result); // Update the preview image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveDetails = async () => {
    try {
      const patientId = patient?.id;
      const updates = {
        address: address, // Address from state
        image_url: previewImage, // Image URL from preview
      };

      const { error } = await supabase
        .from("patientsdata") // Your database table
        .update(updates)
        .eq("id", patientId);

      if (error) {
        throw error; // Trigger error handling
      }

      alert("Details saved successfully!");
      setIsEditing(false); // Close edit mode
    } catch (err) {
      console.error("Failed to save details:", err.message);
      alert("Error saving details. Please try again.");
    }
  };

  const handleGeneratePrescription = () => {
    if (!visited) {
      // If the patient has not visited the doctor, show an alert
      alert("You haven't visited the doctor yet. Please visit the doctor to generate your prescription.");
      return; // Prevent further execution of the function
    }
  
    const content = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;">
      <h1 style="text-align: center; color: #2c3e50;">HealthBridge Prescription</h1>
     
      <div style="text-align: center; margin-bottom: 20px;">
        <img
          src="${previewImage || ""}"
          alt="Patient Profile"
          style="display: block; margin: 10px auto; width: 100px; height: 100px; border-radius: 50%;"
        />
        <h3 style="margin: 10px 0;">Patient Details</h3>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Name:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${
            patient?.name || "N/A"
          }</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Consultation Number:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${
            patient?.consultation_number || "N/A"
          }</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Gender:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${
            patient?.Gender || "N/A"
          }</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Disease:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${
            patient?.disease || "N/A"
          }</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Doctor:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${
            patient?.doctor_name || "N/A"
          }</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Address:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${
            address || "N/A"
          }</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; color: red;"><strong>Joining Date:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px; color: red;">${
            patient?.joining_date || "N/A"
          }</td>
        </tr>
      </table>
  
      <h3 style="color: #2c3e50;">Prescription:</h3>
      <p style="border: 1px solid #ddd; padding: 10px; background: #f9f9f9;">${
        prescription || "No prescription available"
      }</p>
  
      <h3 style="color: #2c3e50;">Advice:</h3>
      <ul style="border: 1px solid #ddd; padding: 10px; background: #f9f9f9;">
        <li>Take bed rest</li>
        <li>Do not eat outside food</li>
        <li>Eat easy-to-digest food like boiled rice with daal</li>
      </ul>
  
      <h3 style="color: #2c3e50;">Follow-Up:</h3>
      <p style="border: 1px solid #ddd; padding: 10px; background: #f9f9f9;">04-09-2023</p>
    </div>
  `;
  
    printJS({
      printable: content,
      type: "raw-html",
      style: `
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    h1 {
      color: #2c3e50;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    td {
      border: 1px solid #ddd;
      padding: 8px;
    }
    ul {
      margin: 10px 0;
      padding: 0;
      list-style: none;
    }
    ul li {
      margin: 5px 0;
    }
    p, ul, table {
      font-size: 14px;
      line-height: 1.5;
    }
  `,
    });
  };
  

  if (loading)
    return (
      <div className="loading-container">
        <img
          src="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif"
          alt="Loading..."
          className="loading-gif"
        />
      </div>
    );

  if (error) return <div style={{ color: "red" }}>{error}</div>;

  const GenderIcon = patient?.Gender === "Male" ? MaleIcon : FemaleIcon;

  return (
    <>
      <NavBar profileImage={profileImage} />
      {/* <PatientSidebar patientId={id} /> */}
      <div className="single-patient-container">
        <div className="patient-card">
          <div className="profile-header">
            {previewImage && (
              <img src={previewImage} alt="Patient" className="profile-image" />
            )}
            <div className="profile-details">
              <div className="top-details">
                <h2>{patient?.name || "Patient Name"}</h2>
                <p className="highlighted-cn">
                  CN: <span>{patient?.consultation_number}</span>
                </p>
              </div>
              <div className="other-details">
                <p className="op">OP: {patient?.joining_date}</p>
                <span>
                  <b>Gender: </b>
                  {patient?.Gender}
                  {GenderIcon && <GenderIcon />}
                </span>
                <p>
                  <b>Disease:</b> {patient?.disease}
                </p>
                <p>
                  <b>Doctor: </b>
                  {patient?.doctor_name}
                </p>
                <p>
                  <b>Address: </b>
                  {patient?.address}
                </p>
              </div>
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
                <label>Gender:</label>
                <select
                  value={patient?.Gender || ""}
                  onChange={(e) =>
                    setPatient({ ...patient, Gender: e.target.value })
                  }
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
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

          {/* Conditional rendering for prescriptions, advice, and follow-up */}
          {visited && (
            <>
              <table className="prescription-table">
                <thead>
                  <tr>
                    <th>Medicine Name</th>
                    <th>Dosage</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>TAB. ABCIXIMAB</td>
                    <td>1 Morning</td>
                    <td>8 Days</td>
                  </tr>
                  <tr>
                    <td>TAB. VOMILAST</td>
                    <td>1 Morning, 1 Night</td>
                    <td>8 Days</td>
                  </tr>
                  {/* More prescription rows can be dynamically added */}
                </tbody>
              </table>

              {/* Advice Section */}
              <div className="advice-section">
                <h3>Advice:</h3>
                <ul>
                  <li>Take bed rest</li>
                  <li>Do not eat outside food</li>
                  <li>Eat easy-to-digest food like boiled rice with daal</li>
                </ul>
              </div>

              {/* Follow-up Section */}
              <div className="follow-up">
                <p>Follow Up: 04-09-2023</p>
              </div>
            </>
          )}

          {/* Add My Prescription Button */}
          <button
            onClick={handleGeneratePrescription}
            className="prescription-button"
          >
            My Prescription
          </button>
        </div>
      </div>
    </>
  );
};

export default SinglePatientData;
